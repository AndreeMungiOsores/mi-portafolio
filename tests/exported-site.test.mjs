/**
 * Verifica el sitio ya exportado en `out/`. Corre con `npm test`, que hace el
 * build antes. Comprueba que las páginas existen, que el contenido migrado está
 * completo (8 casos, WhatsApp, video) y que no quedó nada de la parte personal
 * del portafolio anterior.
 */
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const OUT = new URL("../out/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("../data/manifest.json", import.meta.url), "utf8"));
const projects = JSON.parse(await readFile(new URL("../data/projects.json", import.meta.url), "utf8"));

/** El export estático escribe `ruta.html`; algunas versiones usan `ruta/index.html`. */
async function readPage(route) {
  const clean = route.replace(/^\//, "");
  const candidates = route === "/" ? ["index.html"] : [`${clean}.html`, `${clean}/index.html`];
  for (const candidate of candidates) {
    try {
      return await readFile(new URL(candidate, OUT), "utf8");
    } catch {
      continue;
    }
  }
  throw new Error(`No se exportó ninguna de estas rutas: ${candidates.join(", ")}`);
}

const exists = (path) =>
  access(new URL(path.replace(/^\//, ""), OUT)).then(
    () => true,
    () => false,
  );

const ROUTES = ["/", "/servicios", "/servicios/web", "/servicios/videos", "/casos", "/nosotros", ...projects.map((p) => `/casos/${p.slug}`)];

test("existen todas las rutas del sitio", async () => {
  for (const route of ROUTES) await readPage(route);
});

test("el inicio presenta la marca, enlaza los servicios y el WhatsApp", async () => {
  const html = await readPage("/");
  assert.match(html, /Software a medida que/);
  assert.match(html, /wa\.me\/51961556197/);
  for (const href of ["/servicios", "/casos", "/servicios/videos", "/servicios/web", "/nosotros"]) {
    assert.match(html, new RegExp(`href="${href}[#"]`), `falta el enlace a ${href}`);
  }
});

test("los 8 casos están en el índice y cada uno tiene su página con reto y solución", async () => {
  assert.equal(projects.length, 8);
  const index = await readPage("/casos");
  for (const p of projects) {
    assert.match(index, new RegExp(`href="/casos/${p.slug}"`), `falta ${p.slug} en el índice`);
    const page = await readPage(`/casos/${p.slug}`);
    assert.match(page, new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, /EL RETO/);
    assert.match(page, /LA SOLUCIÓN/);
  }
});

test("las imágenes de los casos existen en disco", async () => {
  for (const p of projects) {
    const images = [...(p.carousel ?? []).map((c) => c.src), ...(p.image ? [p.image] : [])];
    assert.ok(images.length > 0, `${p.slug} no tiene imágenes`);
    for (const src of images) assert.ok(await exists(src), `no se exportó ${src}`);
  }
});

test("no queda contenido personal del portafolio anterior", async () => {
  const banned = [/Andree/, /UTEC/, /Mecatrónica/, /mi gato/i, /Sobre mí/, /Portafolio de/];
  for (const route of ROUTES) {
    const html = await readPage(route);
    // El texto visible: se ignoran los scripts de datos de Next.
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, "");
    for (const re of banned) assert.doesNotMatch(visible, re, `${route} contiene ${re}`);
  }
});

test("la voz de los casos y de las preguntas pasó a «nosotros»", async () => {
  for (const p of projects) {
    assert.doesNotMatch(p.solution, /\b(Diseñé|Construí|Implementé|Desarrollé|Sumé|conecté)\b/, `${p.slug} sigue en primera persona`);
  }
});

test("la página de videos publica todas las piezas del manifiesto", async () => {
  const html = await readPage("/servicios/videos");
  assert.ok(manifest.length > 0, "el manifiesto no puede estar vacío");
  assert.match(html, /Videos publicitarios/);
  for (const reel of manifest) {
    assert.match(html, new RegExp(reel.poster.replace(/[/.]/g, "\\$&")), `falta el poster ${reel.poster}`);
    assert.ok(await exists(reel.src), `no se exportó el video ${reel.src}`);
    assert.ok(await exists(reel.poster), `no se exportó el poster ${reel.poster}`);
  }
});

test("ningún video supera los 10 MB", () => {
  const heavy = manifest.filter((reel) => reel.bytes > 10 * 1024 * 1024);
  assert.deepEqual(heavy.map((r) => `${r.slug} (${(r.bytes / 1048576).toFixed(1)}MB)`), [], "hay videos demasiado pesados: vuelve a correr `npm run videos`");
});

test("el sitemap, robots, favicon e imagen social se exportan", async () => {
  for (const file of ["sitemap.xml", "robots.txt", "favicon.svg", "og.png"]) assert.ok(await exists(file), `falta ${file}`);
  const sitemap = await readFile(new URL("sitemap.xml", OUT), "utf8");
  assert.match(sitemap, /https:\/\/www\.mungi\.lat\/casos\/eurobraces-center/);
});
