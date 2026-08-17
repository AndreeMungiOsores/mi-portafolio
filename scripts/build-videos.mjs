/**
 * Convierte los videos publicitarios originales en assets listos para web.
 *
 *   npm run videos                  -> usa la carpeta por defecto
 *   npm run videos -- "D:/otra/ruta"
 *
 * Por cada archivo genera:
 *   public/videos/<slug>.mp4   H.264 optimizado para streaming progresivo
 *   public/videos/<slug>.jpg   poster extraído del primer segundo
 *
 * y reescribe app/servicios/videos/manifest.json con las dimensiones reales.
 * El texto de cada pieza NO se toca aquí: vive en reels.ts.
 */
import { spawn } from "node:child_process";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SOURCE_DIR = process.argv[2] ?? "C:/Users/Andree/Desktop/marketing/videos";
const OUT_DIR = join(ROOT, "public/videos");
const MANIFEST = join(ROOT, "app/servicios/videos/manifest.json");

/** Alto objetivo para verticales y ancho objetivo para horizontales. */
const VERTICAL_HEIGHT = 1280;
const HORIZONTAL_WIDTH = 1280;
const CRF = 26;
const CONCURRENCY = 3;

const WINGET_BIN = join(
  process.env.LOCALAPPDATA ?? "",
  "Microsoft/WinGet/Links",
);
const bin = (name) => {
  const local = join(WINGET_BIN, `${name}.exe`);
  return existsSync(local) ? local : name;
};

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true });
    let stderr = "";
    let stdout = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolve(stdout.trim())
        : reject(new Error(`${command} salió con código ${code}\n${stderr.slice(-1500)}`)),
    );
  });
}

async function probe(file) {
  const raw = await run(bin("ffprobe"), [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height:format=duration",
    "-of", "json",
    file,
  ]);
  const data = JSON.parse(raw);
  const stream = data.streams?.[0] ?? {};
  return {
    width: Number(stream.width),
    height: Number(stream.height),
    duration: Number(data.format?.duration ?? 0),
  };
}

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\(\d+\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Los nombres puramente numéricos (0108, 0723…) son fechas de publicación. */
function labelFor(slug) {
  return /^\d{4}$/.test(slug) ? `reel-${slug}` : slug;
}

async function encode(source, slug, orientation) {
  const scale =
    orientation === "vertical"
      ? `scale=-2:${VERTICAL_HEIGHT}`
      : `scale=${HORIZONTAL_WIDTH}:-2`;

  await run(bin("ffmpeg"), [
    "-y", "-loglevel", "error",
    "-i", source,
    "-vf", `${scale}:flags=lanczos`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", String(CRF),
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    "-ac", "2",
    join(OUT_DIR, `${slug}.mp4`),
  ]);

  await run(bin("ffmpeg"), [
    "-y", "-loglevel", "error",
    "-ss", "1",
    "-i", source,
    "-frames:v", "1",
    "-vf", `${scale}:flags=lanczos`,
    "-q:v", "4",
    join(OUT_DIR, `${slug}.jpg`),
  ]);
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    throw new Error(`No encuentro la carpeta de origen: ${SOURCE_DIR}`);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const sources = (await readdir(SOURCE_DIR))
    .filter((file) => /\.(mp4|mov|m4v|webm)$/i.test(file))
    .sort();

  if (sources.length === 0) throw new Error(`No hay videos en ${SOURCE_DIR}`);
  console.log(`Procesando ${sources.length} videos de ${SOURCE_DIR}\n`);

  const entries = await mapLimit(sources, CONCURRENCY, async (file) => {
    const source = join(SOURCE_DIR, file);
    const slug = labelFor(slugify(parse(file).name));
    const info = await probe(source);
    const orientation = info.height >= info.width ? "vertical" : "horizontal";

    await encode(source, slug, orientation);

    const [original, encoded] = await Promise.all([
      stat(source),
      stat(join(OUT_DIR, `${slug}.mp4`)),
    ]);
    const out = await probe(join(OUT_DIR, `${slug}.mp4`));

    console.log(
      `  ${file.padEnd(32)} -> ${slug}.mp4  ` +
        `${(original.size / 1048576).toFixed(1)}MB → ${(encoded.size / 1048576).toFixed(1)}MB  ` +
        `${out.width}x${out.height}`,
    );

    return {
      slug,
      source: file,
      src: `/videos/${slug}.mp4`,
      poster: `/videos/${slug}.jpg`,
      width: out.width,
      height: out.height,
      orientation,
      duration: Math.round(info.duration),
      bytes: encoded.size,
    };
  });

  // Verticales primero (es el formato principal), luego por slug.
  entries.sort((a, b) =>
    a.orientation === b.orientation
      ? a.slug.localeCompare(b.slug)
      : a.orientation === "vertical"
        ? -1
        : 1,
  );

  await writeFile(MANIFEST, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

  const before = sources.length;
  const totalOut = entries.reduce((sum, entry) => sum + entry.bytes, 0);
  console.log(
    `\n${before} videos listos en public/videos (${(totalOut / 1048576).toFixed(1)}MB en total).`,
  );
  console.log(`Manifiesto: ${MANIFEST}`);

  const copy = await readFile(join(ROOT, "app/servicios/videos/reels.ts"), "utf8");
  const missing = entries.filter((entry) => !copy.includes(`"${entry.slug}"`));
  if (missing.length > 0) {
    console.log(
      `\nFaltan textos en reels.ts para: ${missing.map((entry) => entry.slug).join(", ")}`,
    );
  }
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
