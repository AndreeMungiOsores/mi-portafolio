/**
 * Verifica el sitio ya exportado en `out/`. Corre con `npm test`, que hace el
 * build antes. Comprueba que las tres páginas existen, que la navegación entre
 * ellas funciona y que todos los videos referenciados están realmente en disco.
 */
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const OUT = new URL("../out/", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("../app/servicios/videos/manifest.json", import.meta.url), "utf8"),
);

/** El export estático escribe `ruta.html`; algunas versiones usan `ruta/index.html`. */
async function readPage(route) {
  const candidates =
    route === "/"
      ? ["index.html"]
      : [`${route.replace(/^\//, "")}.html`, `${route.replace(/^\//, "")}/index.html`];

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

test("la portada conserva el hero, los 8 proyectos y el contacto", async () => {
  const html = await readPage("/");

  assert.match(html, /Herramientas digitales/);
  assert.match(html, /Portafolio de Andree Mungi/);
  assert.match(html, /wa\.me\/51961556197/);

  for (const anchor of ["proyecto-01", "proyecto-04", "proyecto-08"]) {
    assert.match(html, new RegExp(`id="${anchor}"`), `falta el ancla ${anchor}`);
  }

  const cards = html.match(/class="project-card/g) ?? [];
  assert.equal(cards.length, 8, "deberían quedar 8 tarjetas de proyecto");
});

test("la portada enlaza la pestaña de servicio de videos", async () => {
  const html = await readPage("/");
  assert.match(html, /href="\/servicios\/videos"/);
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
  assert.deepEqual(
    heavy.map((reel) => `${reel.slug} (${(reel.bytes / 1048576).toFixed(1)}MB)`),
    [],
    "hay videos demasiado pesados: vuelve a correr `npm run videos`",
  );
});

test("la página web publica paquetes, proceso y preguntas", async () => {
  const html = await readPage("/servicios/web");

  assert.match(html, /Landing page/);
  assert.match(html, /Sitio corporativo/);
  assert.match(html, /Aplicaci[oó]n web/);
  assert.match(html, /<details/);

  const questions = html.match(/<summary/g) ?? [];
  assert.ok(questions.length >= 5, "deberían quedar al menos 5 preguntas frecuentes");
});

test("las páginas de servicio vuelven al portafolio", async () => {
  for (const route of ["/servicios/videos", "/servicios/web"]) {
    const html = await readPage(route);
    assert.match(html, /href="\/"/, `${route} debería enlazar de vuelta a la portada`);
    assert.match(html, /wa\.me\/51961556197/, `${route} debería tener el contacto`);
  }
});

test("no quedan restos de la plantilla original", async () => {
  for (const route of ["/", "/servicios/videos", "/servicios/web"]) {
    const html = await readPage(route);
    assert.doesNotMatch(html, /vinext|site-creator|Starter Project|codex-preview/i, route);
  }
});
