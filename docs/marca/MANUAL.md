# Manual de marca — Mungi lat (v1.0 · 2026-11-21)

Guía **exclusiva** para crear cualquier pieza de la marca (flyers, posts, portadas, avatares). Versión visual: `manual-de-marca.pdf` / `manual-de-marca.html`. Tokens en código: `brand.css`. Ejemplos: `flyers/` (generados por `build-flyers.py`).

> Antes de crear una pieza: leer esto, partir de un flyer de `flyers/` y pasar la lista de revisión (sección 10). No improvisar colores, fuentes ni personajes.

## 1. Esencia

- **Nombre:** «Mungi lat» (solo la M en mayúscula). Dominio: `mungi.lat`, siempre en minúsculas. Antes: «Mungi Grid».
- **Qué hace:** software a medida, ERPs, CRMs, automatizaciones, diseño web y contenido visual para que un negocio se vea profesional, genere confianza y atraiga clientes.
- **Personalidad:** profesional, tranquila, tecnológica. Cercana, sin ciencia ficción.
- **Tono:** tuteo, directo y breve. Abre con el problema del cliente en una pregunta («¿Tu equipo sigue copiando y pegando entre planillas?») y responde con algo concreto. Sin promesas infladas, sin jerga.
- **No es:** infantil (nada de gatos, cartoon, pasteles, contornos gruesos), triste (nada de crema/beige), saturada o futurista (nada de verde lima, degradados en texto ni efectos «de IA»).

## 2. Logotipo

- **Símbolo:** dos cuadrados de 38 px (viewBox 58×58) superpuestos; el segundo desplazado 20 px en X e Y; cruce de 18×18. Claro: tinta `#0F1B2D` + cobalto `#1F4FD8` + cruce `#0A1F66`. Oscuro: blanco + `#3D7BFF` + cruce `#C6D6FF`.
- **Nombre en el logo:** «Mungi» en Libre Franklin 800; «lat» en Libre Franklin 400 con color de acento (cobalto en claro, `#8FB2FF` en oscuro). Interletrado −3.5 %. Separación símbolo–texto ≈ 0.4 × el cuerpo del texto.
- **Variantes:** principal claro, principal oscuro, monocromo negro, monocromo blanco, símbolo solo. Fondo oscuro → versión oscura; claro → versión clara; fondo azul o foto → monocromo blanco.
- **Mínimos:** logo completo 96 px de ancho; símbolo 16 px. **Zona de respeto:** la mitad de la altura del símbolo.
- **Prohibido:** deformar, recolorear, versión clara sobre fondo oscuro, sombras/brillos/degradados.
- **Archivos:** `assets/logo-claro.png`, `assets/logo-oscuro.png` (fondo transparente), `assets/simbolo-claro.svg`, `simbolo-oscuro.svg`, `simbolo-mono-negro.svg`, `simbolo-mono-blanco.svg`.

## 3. Color

| Nombre | Hex | Uso |
|---|---|---|
| Noche | `#060D1C` | Fondo oscuro principal |
| Noche 2 | `#081631` | Final del degradado de fondo |
| Azul eléctrico | `#3D7BFF` | Acento sobre oscuro; formas y botones |
| Cobalto | `#1F4FD8` | Acento sobre claro; texto destacado |
| Cielo | `#8FB2FF` | Etiquetas y «lat» sobre oscuro |
| Cielo 2 | `#6FA0FF` | Palabra destacada sobre oscuro |
| Tinta | `#0B1630` | Texto sobre claro |
| Fondo claro | `#F3F7FF` | Fondo claro oficial (con cuadrícula) |
| Borde claro | `#D5E0F5` | Bordes y filetes sobre claro |
| Hielo | `#E8F0FF` | Texto/formas sobre oscuro |
| Texto sec. oscuro | `#C5D3EE` | Texto secundario sobre oscuro |
| Texto sec. claro | `#5B6B8C` | Etiquetas y notas sobre claro |
| Ámbar | `#FFB547` | Detalle mínimo (≤ 2 %) |
| WhatsApp | `#25D366` | Solo el botón de WhatsApp |

**Contrastes verificados (WCAG):** blanco/noche 19.4 · `#C5D3EE`/noche 12.9 · cielo/noche 9.2 · cielo 2/noche 7.5 · tinta/fondo claro 16.7 · cobalto/fondo claro 6.2 · gris azul/fondo claro 5.0.
**Atención:** `#3D7BFF` sobre blanco da solo 3.8:1 → no usarlo para texto sobre claro (usar cobalto). Texto blanco sobre `#3D7BFF` solo si es grande y en negrita.
**Proporciones:** oscuro ≈ 70 % noche · 20 % texto claro · 8 % azul · ≤ 2 % ámbar. Claro ≈ 75 % fondo/blanco · 15 % tinta · 8 % cobalto, más barra CTA oscura.
**Una sola frase corta de acento por titular.**

## 4. Tipografía (Google Fonts, gratuitas)

- **Instrument Sans** (400/500/600/700): titulares y texto. Titular 700, interletrado −3.5 %.
- **IBM Plex Mono** (400/500): etiquetas, números de paso, dominio. Mayúsculas, interletrado +14–16 %, 13–15 px (nunca < 13).
- **Libre Franklin** (800/400): **solo** para escribir «Mungi lat» en el logo.

Escala para flyer 1080 × 1350: titular 68–72 px / 1.06 (máx. 3 líneas, saltos manuales); bajada 28 px / 1.45 (máx. 2 líneas); ítems 26–34 px (máx. 4); etiqueta 14–15 px; cifra de contacto 44 px/700.

## 5. El Cubo (mascota)

- **Archivo oficial:** `assets/mascota-cubo.png` (1254 × 1254). **Se usa tal cual: no se redibuja ni se regenera.**
- **Qué es:** los dos cuadrados del símbolo hechos personaje: cuerpo blanco mate + cristal azul, pantalla oscura con dos ojos redondos luminosos, sin boca, dos manos flotantes con brillo ámbar. Asistente tecnológico sereno.
- **Hacer:** fondo noche (o panel/barra oscura en piezas claras); en hero con máscara radial `radial-gradient(closest-side,#000 62%,transparent 100%)` y ≈ 700 px en flyer; presente en cada pieza (grande o como avatar en la barra CTA).
- **No hacer:** deformar, recolorear, añadir boca/ropa/accesorios; ponerlo recortado sobre fondo claro; ponerle texto encima; usarlo como testimonio o prueba de un resultado.
- **Avatar:** `assets/avatar-facebook.png` (800 × 800; recorte 1000 × 1000 desde (127,100) del original).
- **Poses (generadas con `codex-image -r` sobre el original y validadas, 2026-11-22):** `assets/cubo-saludando.png` (mano alzada: presentaciones), `assets/cubo-senalando.png` (apunta a la derecha; espacio libre a ese lado: listas), `assets/cubo-check.png` (con insignia de check: soluciones/listo). Mismas reglas que el original (máscara radial, fondo noche, sin deformar). Para poses nuevas: mismo método y validar con `Read`.
- **Flyers de lanzamiento en Facebook (2026-11-22):** `flyers/fb-1-presentacion`, `fb-2-productos`, `fb-3-sistema` (generados con `build-flyers-facebook.py`). Portada: `portada-facebook.html` → `assets/portada-facebook.png` (1640×624).

## 6. Elementos gráficos

- **Cuadrícula:** líneas de 1 px cada 72 px con máscara que las desvanece hacia abajo. Oscuro `rgba(143,178,255,.22)`; claro `rgba(31,79,216,.10)`.
- **Tarjetas:** radio 16 px, borde 1 px. Oscuro: relleno `rgba(255,255,255,.04)`. Claro: blanco con sombra `0 20px 50px rgba(31,79,216,.10)`. Destacada: borde cobalto/azul.
- **Tag** arriba a la derecha, en mono: «ERP · Nº 01», «CRM · SEGUIMIENTO».
- **Barra CTA** abajo: icono WhatsApp verde + «Escríbenos al» + **961 556 197**; a la derecha `mungi.lat` o el avatar del Cubo. Siempre oscura (también en piezas claras).
- **Visuales ilustrativos:** abstractos (barras, no datos) y marcados «Vista ilustrativa» / «Ejemplo ilustrativo». Capturas reales: «Proyecto real», sin datos de clientes.
- **Antes/después:** «Hoy» tachado en gris azul + «Automatizado» en tarjeta con borde cobalto, pasos 01–04 en mono.
- **Lienzo:** 1080 × 1350 (4:5), márgenes 72 px laterales y 64–68 px verticales. Orden: logo + tag → titular → bajada → visual → barra CTA.

## 7. Modos

- **Oscuro** (principal en redes): fondo noche → noche 2, cuadrícula, resplandor azul. Ejemplos: `flyers/oscuro-1-crm`, `oscuro-2-erp`.
- **Claro** (propuestas, PDF, piezas corporativas): fondo `#F3F7FF` con cuadrícula azul tenue, tarjetas blancas, acento cobalto. Ejemplos: `flyers/claro-1-automatizacion`, `claro-2-a-medida`.

## 8. Contacto oficial

WhatsApp +51 961 556 197 (en piezas: «961 556 197») · mungi.lat.

## 9. Honestidad

Sin cifras, clientes, testimonios ni resultados inventados. Ilustración = «Vista ilustrativa»; captura real = «Proyecto real». No publicar capturas con datos de clientes (BlissMap, RindeGastos y Medicaltech traen datos: no usarlas).

## 10. Lista de revisión antes de publicar

- [ ] Logo correcto para el fondo y con zona de respeto.
- [ ] Colores solo de la paleta; acento en una sola frase.
- [ ] Titular ≤ 3 líneas; ≤ 4 ítems; sin párrafos largos.
- [ ] Fuentes correctas; etiquetas mono ≥ 13 px.
- [ ] El Cubo presente (hero o avatar) y es el original.
- [ ] Barra CTA con 961 556 197 y mungi.lat bien escritos.
- [ ] Ortografía en español («¿…?», tildes, «tú»).
- [ ] Sin crema, verde lima, degradado en texto ni gatos.

## 11. Cómo crear una pieza nueva

1. Elegir modo (oscuro/claro) y tema.
2. Añadir una función a `build-flyers.py` (o copiar un HTML de `flyers/`) usando las clases de `brand.css` (`.flyer .dark|.light`, `.logo`, `.tag`, `h1`, `.lead`, `.card`, `.cta`, `.label`).
3. Renderizar a PNG 1080 × 1350 con Edge headless:
   `msedge --headless=new --hide-scrollbars --allow-file-access-from-files --virtual-time-budget=10000 --window-size=1080,1350 --screenshot=salida.png file:///ruta/pieza.html`
4. Abrir el PNG, revisar y pasar la lista de la sección 10.

## 12. Redes sociales (actualizado 2026-11-22)

- **Facebook:** página «Mungi lat». **Instagram:** `@mungi.lat` (cuenta de empresa, categoría «Empresa de software»), vinculadas entre sí.
- **Avatar (ambas):** `assets/avatar-facebook-blanco.png` — el Cubo saludando sobre fondo blanco (el avatar oscuro `avatar-facebook.png` queda como alternativa).
- **Portada de Facebook:** `assets/portada-facebook.png` (1640 × 624; fuente `portada-facebook.html`). Estilo mixto: mitad clara con el titular y panel oscuro diagonal con el Cubo; sin logo ni textos pequeños. Versión anterior: `portada-facebook-oscura-v1.png`.
- **Formato de posts:** 1080 × 1350 (4:5) para ambas redes. Margen lateral ≥ 72 px (la cuadrícula del perfil de Instagram recorta ≈ 34 px por lado en 3:4). En Instagram web elegir siempre el recorte **4:5**; por defecto recorta a 1:1 y corta el flyer.
- **Piezas claras:** sin bloques oscuros; el Cubo sobre blanco (`assets/cubo-*-blanco.png`: saludando, señalando, check) con `mix-blend-mode:multiply`, una sola vez por pieza; WhatsApp en tarjeta blanca; textos grandes (nada de etiquetas mono pequeñas). Ejemplos: `flyers/fb-1-presentacion-light`, `fb-3-sistema-v2`, `fb-4-a-medida`, `fb-5-automatiza` (generados con `build-flyers-facebook.py` y `build-flyers-facebook-2.py`).
- **Publicación:** procedimiento y trampas en la memoria del proyecto (Chrome del usuario; el navegador integrado no se usa con Meta/Instagram).

## 13. Pendiente

- Historias de Instagram (1080 × 1920) y plantilla editable de posts.
- Aplicar la identidad en mungi.lat.
- Teléfono comercial permanente (+51) para ventas y automatizaciones (en evaluación).
