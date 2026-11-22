# Sitio mungi.lat

Web de la marca **Mungi lat** (reemplaza al portafolio personal de Andree Mungi). Next.js 16 con export estático. El sitio anterior sigue intacto en `..\Portafolio Andree - respaldo 2026-11-22` y en `C:\Users\Andree\Desktop\PORTAFOLIO`.

## Estado (2026-11-22)

- [x] Respaldo completo del sitio anterior.
- [x] Vistas aprobadas (`docs/vistas/png/`).
- [x] Sitio construido: inicio, servicios (+ páginas web y video con IA), casos (índice + 8 páginas), nosotros y contacto, 404, sitemap, robots, ES/EN, responsive.
- [x] `npm test` (build + 9 pruebas) y `npm run lint` en verde.
- [ ] Publicación en `mungi.lat` (pendiente: decidir cómo apuntar el dominio de Vercel a este proyecto).
- [ ] Decisiones abiertas: ver `PRODUCT.md`.

## Comandos

| | |
|---|---|
| `npm run dev` | Desarrollo en http://localhost:3000 |
| `npm run build` | Genera `out/` (sitio estático) |
| `npm test` | Build + pruebas del sitio exportado |
| `npm run preview` | Sirve `out/` como un hosting estático |
| `npm run videos` | Convierte videos originales a `public/videos` y regenera `data/manifest.json` |

## Dónde editar

| Qué | Archivo |
|---|---|
| Todos los textos (ES/EN), WhatsApp, redes, paquetes, FAQ | `app/copy.ts` |
| Los 8 casos (textos, stack, capturas) | `data/projects.json` |
| Títulos de los videos | `data/reels.ts` |
| Estilos y colores | `app/globals.css` |
| Poses del Cubo | `public/cubo/*.webp` (originales en `docs/marca/assets/`) |

## Contenido que no se migró

Las descripciones personales del portafolio (foto, gato, UTEC, «2+ años», «Sobre mí»). El panel de administración local (`npm run admin`) del sitio anterior tampoco se migró; los casos se editan en `data/projects.json`.

`docs/vistas/` conserva las vistas de diseño y los scripts que las generan (`build-vistas.py`, `render-vistas.py`, desde PowerShell).
