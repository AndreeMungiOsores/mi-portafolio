# Product

## Platform

web

## Users

Dueños y equipos de decisión de negocios que necesitan software a medida, automatización de procesos, una página web o video publicitario con IA. PyMEs locales en Perú y clientes remotos. Llegan evaluando si contratar a Mungi lat para un proyecto concreto.

## Product Purpose

Sitio web de la empresa **Mungi lat** (reemplaza al portafolio personal de Andree Mungi). Existe para convertir visitantes en clientes: éxito = el visitante escribe por WhatsApp (961 556 197).

## Positioning

Software, automatización, web y video en un solo lugar, de punta a punta y a la medida del negocio, sin plantillas y sin fragmentar el trabajo entre varios proveedores.

## Capabilities and Constraints

- 8 casos de estudio reales (`data/projects.json`) con capturas, stack y resultados confirmados por el usuario. Usar tal cual; nunca inventar cifras, resultados ni testimonios. No hay testimonios.
- Sitio 100 % estático (`output: "export"`, Vercel). Cualquier funcionalidad dinámica requiere reconsiderar esa restricción.
- Bilingüe ES/EN con el texto en `app/copy.ts` (y `data/projects.json` para los casos).
- Video con IA: piezas en `public/videos`, textos en `data/reels.ts`, conversión con `npm run videos`.

## Brand Commitments

Identidad de **Mungi lat** (`docs/marca/MANUAL.md`): base clara con cuadrícula técnica, cobalto `#1F4FD8`, Instrument Sans + IBM Plex Mono, logo en Libre Franklin. El Cubo (mascota) aparece en inicio, nosotros, proceso y llamados a la acción, usando las poses de `public/cubo/` sin redibujarlo. Sin bloques oscuros; el llamado a la acción es una banda de cobalto sólido. Voz: «nosotros», sin mencionar tamaño de equipo ni datos personales de ninguna persona.

## Open Decisions (pendientes de confirmar)

- Cifras migradas tal cual: «-70 % de costo», «48-72 h» (video) y «8 casos reales».
- Paquetes de páginas web con precio «A convenir».
- Categorías de «Casos» (Web, Producto, CRM, Operaciones, Automatización), deducidas de los textos.
- El caso EuroBraces tiene un resultado solo en inglés («indexed within hours…»); en español está vacío.

## Product Principles

1. Toda afirmación de resultado debe ser real y verificable.
2. El trabajo mostrado (capturas, video) es el argumento de venta; el texto apoya.
3. Funciona igual para una PyME peruana que para un cliente remoto.
4. Una sola idea y un solo llamado a la acción por pantalla.
