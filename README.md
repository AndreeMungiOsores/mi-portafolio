# Portafolio de Andree Mungi

Sitio personal en español: portafolio de software más dos páginas de servicio
(videos publicitarios y páginas web). Next.js 16 con App Router, exportado como
sitio **100% estático** — no hay servidor ni base de datos.

## Requisitos

- Node.js `>=22.13.0`
- [ffmpeg](https://ffmpeg.org) solo si vas a regenerar los videos

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Exporta el sitio estático a `out/` |
| `npm run preview` | Sirve `out/` en http://localhost:4321 (con soporte de rangos para video) |
| `npm run videos` | Convierte los videos originales a versiones web |
| `npm test` | Hace el build y verifica el HTML exportado |
| `npm run lint` | ESLint |

## Estructura

```
app/
  page.tsx                    portada: hero, sobre mí, 8 proyectos, enfoque
  ProjectCarousel.tsx         carrusel de capturas de cada proyecto
  SiteNav.tsx / SiteFooter.tsx   navegación y contacto compartidos
  globals.css                 todos los estilos (CSS a mano, sin utilidades)
  servicios/
    videos/
      page.tsx                landing del servicio de video
      ReelGrid.tsx            galería con reproductor a pantalla completa
      reels.ts                ✏️ textos de cada video
      manifest.json           generado por `npm run videos` — no editar a mano
    web/page.tsx              landing del servicio de páginas web
public/videos/                videos comprimidos + posters
scripts/                      utilidades de build (video, servidor de preview)
tests/                        verificación del sitio exportado
```

Las tres rutas son estáticas: `/`, `/servicios/videos` y `/servicios/web`.

## Editar el contenido

- **Proyectos del portafolio**: el array `projects` al inicio de `app/page.tsx`.
  El orden que se muestra lo define `orderedProjects` justo debajo.
- **Textos de cada video**: el objeto `COPY` en `app/servicios/videos/reels.ts`.
  Las dimensiones y el peso salen del manifiesto, no se tocan.
- **Paquetes y precios**: las constantes `PAQUETES` al inicio de
  `app/servicios/videos/page.tsx` y `app/servicios/web/page.tsx`. El campo
  `price` es texto libre.
- **Preguntas frecuentes**: la constante `FAQ` en `app/servicios/web/page.tsx`.
- **WhatsApp**: la constante `WHATSAPP` en `app/SiteFooter.tsx`.

## Agregar o actualizar videos

Los originales sin comprimir **no viven en el repositorio**: pesan cientos de
megas. El flujo es:

```bash
npm run videos
```

Por defecto lee `C:/Users/Andree/Desktop/marketing/videos`. Para otra carpeta:

```bash
npm run videos -- "D:/ruta/a/mis/videos"
```

El script convierte cada archivo a H.264 de 720p (~3 MB por pieza frente a los
~25 MB del original), extrae un poster, los deja en `public/videos/` y reescribe
`app/servicios/videos/manifest.json`. Si aparece un video nuevo te avisa que le
falta texto en `reels.ts`.

## Despliegue

El build genera HTML plano en `out/`, así que sirve cualquier hosting estático.
Hay dos caminos ya configurados:

- **Vercel**: detecta Next.js y publica solo (`vercel.json`).
- **GitHub Pages**: `.github/workflows/nextjs.yml` construye y publica en cada
  push a `main`.

Ten en cuenta que `public/videos/` pesa unos 40 MB; si el hosting cobra por
ancho de banda, conviene moverlos a un CDN y apuntar `src` en el manifiesto.
