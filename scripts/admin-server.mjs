/**
 * Panel de administración LOCAL para editar el contenido del portafolio
 * (títulos, descripciones, stack, orden e imágenes de cada proyecto).
 *
 *   npm run admin
 *
 * Corre solo en tu máquina (127.0.0.1), nunca lo expongas a internet:
 * no tiene login, cualquiera que le entre podría reescribir tus datos.
 *
 * Lee y escribe directamente:
 *   - data/projects.json     (textos, orden, stack)
 *   - public/projects/*.webp (imágenes, convertidas con ffmpeg igual que
 *                             el resto del sitio)
 *
 * No toca nada dentro de app/, así que el build estático (`npm run build`,
 * output:"export") sigue funcionando exactamente igual.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DATA_FILE = join(ROOT, "data/projects.json");
const PROJECTS_DIR = join(ROOT, "public/projects");
const ADMIN_UI = join(ROOT, "scripts/admin/index.html");
const PORT = Number(process.env.ADMIN_PORT ?? 4500);

const WINGET_BIN = join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Links");
const ffmpegBin = () => {
  const local = join(WINGET_BIN, "ffmpeg.exe");
  return existsSync(local) ? local : "ffmpeg";
};

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 25 * 1024 * 1024) {
        reject(new Error("Payload demasiado grande (máx 25MB)"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegBin(), args, { windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (d) => (stderr += d));
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg salió con código ${code}\n${stderr.slice(-1000)}`)),
    );
  });
}

async function handleGetData(res) {
  const raw = await readFile(DATA_FILE, "utf8");
  respondJson(res, 200, JSON.parse(raw));
}

async function handleSaveData(req, res) {
  const body = await readBody(req);
  let projects;
  try {
    projects = JSON.parse(body.toString("utf8"));
  } catch {
    return respondJson(res, 400, { error: "JSON inválido" });
  }
  if (!Array.isArray(projects)) {
    return respondJson(res, 400, { error: "Se esperaba un arreglo de proyectos" });
  }
  await writeFile(DATA_FILE, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
  respondJson(res, 200, { ok: true });
}

async function handleUpload(req, res) {
  const body = await readBody(req);
  let payload;
  try {
    payload = JSON.parse(body.toString("utf8"));
  } catch {
    return respondJson(res, 400, { error: "JSON inválido" });
  }

  const { dataUrl, filename } = payload ?? {};
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
    return respondJson(res, 400, { error: "dataUrl inválido" });
  }

  const match = /^data:image\/[a-zA-Z0-9.+-]+;base64,(.*)$/.exec(dataUrl);
  if (!match) return respondJson(res, 400, { error: "No se pudo leer la imagen" });

  const buffer = Buffer.from(match[1], "base64");
  const baseName = slugify((filename ?? "imagen").replace(extname(filename ?? ""), "")) || "imagen";
  const unique = randomBytes(3).toString("hex");
  const slug = `${baseName}-${unique}`;

  await mkdir(PROJECTS_DIR, { recursive: true });
  const tmpPath = join(PROJECTS_DIR, `.tmp-${slug}${extname(filename ?? "") || ".png"}`);
  const outPath = join(PROJECTS_DIR, `${slug}.webp`);

  await writeFile(tmpPath, buffer);
  try {
    await runFfmpeg([
      "-y", "-loglevel", "error",
      "-i", tmpPath,
      "-vf", "format=rgba",
      "-c:v", "libwebp",
      "-quality", "82",
      "-compression_level", "6",
      outPath,
    ]);
  } finally {
    await import("node:fs/promises").then((fs) => fs.unlink(tmpPath).catch(() => {}));
  }

  respondJson(res, 200, { path: `/projects/${slug}.webp` });
}

function respondJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

const STATIC_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function serveStaticPublicFile(pathname, res) {
  const safe = pathname.replace(/\.\.+/g, "");
  const target = join(ROOT, "public", safe);
  if (!target.startsWith(join(ROOT, "public"))) {
    res.writeHead(403);
    return res.end("forbidden");
  }
  try {
    const data = await readFile(target);
    const type = STATIC_TYPES[extname(target).toLowerCase()] ?? "application/octet-stream";
    res.writeHead(200, { "content-type": type });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "GET" && url.pathname === "/") {
      const html = await readFile(ADMIN_UI, "utf8");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      return res.end(html);
    }

    if (req.method === "GET" && url.pathname === "/api/data") {
      return await handleGetData(res);
    }

    if (req.method === "POST" && url.pathname === "/api/data") {
      return await handleSaveData(req, res);
    }

    if (req.method === "POST" && url.pathname === "/api/upload") {
      return await handleUpload(req, res);
    }

    if (req.method === "GET" && url.pathname.startsWith("/projects/")) {
      return await serveStaticPublicFile(url.pathname, res);
    }

    res.writeHead(404);
    res.end("not found");
  } catch (error) {
    console.error(error);
    respondJson(res, 500, { error: error.message ?? "Error interno" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\nPanel de administración local:  http://localhost:${PORT}\n`);
  console.log("Solo corre en tu máquina — no lo expongas a internet.\n");
});
