/**
 * Servidor estático local para revisar el sitio ya exportado:
 *
 *   npm run build && npm run preview
 *
 * Sirve `out/` tal como lo haría un hosting estático, con soporte de rangos
 * para que los videos se puedan adelantar sin descargarlos completos.
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../out/", import.meta.url));
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
};

async function resolve(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const safe = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const target = join(ROOT, safe);

  if (!target.startsWith(ROOT.replace(new RegExp(`\\${sep}$`), "") + sep) && target !== ROOT) {
    return null;
  }

  const candidates = extname(target)
    ? [target]
    : [`${target.replace(/[/\\]$/, "")}.html`, join(target, "index.html")];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return { file: candidate, size: info.size };
    } catch {
      continue;
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  const found = await resolve(new URL(request.url, "http://localhost").pathname);

  if (!found) {
    const notFound = await resolve("/404.html");
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    if (notFound) return createReadStream(notFound.file).pipe(response);
    return response.end("404");
  }

  const type = TYPES[extname(found.file).toLowerCase()] ?? "application/octet-stream";
  const range = request.headers.range;

  if (range && type.startsWith("video/")) {
    const [rawStart, rawEnd] = range.replace(/bytes=/, "").split("-");
    const start = Number(rawStart) || 0;
    const end = rawEnd ? Number(rawEnd) : found.size - 1;

    response.writeHead(206, {
      "content-type": type,
      "content-range": `bytes ${start}-${end}/${found.size}`,
      "accept-ranges": "bytes",
      "content-length": end - start + 1,
    });
    return createReadStream(found.file, { start, end }).pipe(response);
  }

  response.writeHead(200, {
    "content-type": type,
    "content-length": found.size,
    "accept-ranges": "bytes",
  });
  createReadStream(found.file).pipe(response);
});

server.listen(PORT, () => {
  console.log(`Sitio servido desde out/  ->  http://localhost:${PORT}`);
});
