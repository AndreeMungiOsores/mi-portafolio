# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños y equipos de decisión de negocios que necesitan software a medida, automatización de procesos o producción de video publicitario con IA. Sin foco geográfico único: tanto PyMEs locales en Perú como clientes remotos/internacionales. Llegan al portafolio evaluando si contratar a Andree para un proyecto concreto.

## Product Purpose

Portafolio personal de Andree Mungi, desarrollador full-stack y automatizador. Existe para convertir visitantes en clientes que lo contraten para proyectos de software a medida, automatización de procesos, y producción de video con IA. Éxito = el visitante inicia contacto (WhatsApp) para conversar sobre un proyecto.

## Positioning

Ejecuta de punta a punta —producto, interfaz, arquitectura, automatización y producción de video con IA— sin subcontratar ni fragmentar el trabajo entre varias personas o agencias. Velocidad y ejecución completa por una sola persona es el diferenciador frente a un freelancer puntual o una agencia con intermediarios.

## Operating Context

Se navega principalmente en visitas cortas de evaluación: un potencial cliente revisa casos de trabajo previo antes de decidir si contacta. El canal de contacto principal es WhatsApp. El sitio es estático (Next.js, `output: "export"`, desplegado en Vercel) y expone, además del portafolio de software, una oferta de producción de reels/anuncios con IA (`/servicios/videos`).

## Capabilities and Constraints

- 8 casos de estudio reales, cada uno con capturas, stack técnico y resultados: Medicaltech Field, EuroBraces Center, Medicaltech CRM, BlissMap, CRM WhatsApp, clickenla.bio, QR Router, Rindegastos.
- Sitio 100% estático (`output: "export"`); cualquier funcionalidad dinámica (backend, base de datos, formularios con envío server-side) requiere reconsiderar esa restricción de arquitectura antes de proponerla.
- Panel de administración local (`npm run admin`, `scripts/admin-server.mjs`) permite editar textos e imágenes de los 8 proyectos sin tocar código. Corre solo en `127.0.0.1`, sin login — no está pensado para exponerse a internet.
- Datos de los proyectos viven en `data/projects.json` (no hardcodeados en componentes React).
- Servicio adicional reciente: producción de video publicitario con IA, con su propia página (`/servicios/videos`) y pipeline de conversión de video (`scripts/build-videos.mjs`, ffmpeg).

## Brand Commitments

Nombre: Andree Mungi. Egresado de Ingeniería Mecatrónica de UTEC, 2+ años de experiencia en desarrollo de software, con base en Perú. Toque personal: tiene un gato, aparece en la sección "Sobre mí". Identidad visual ya establecida (no a reinventar sin motivo): estética editorial oscura y audaz — tipografías Syne (display) + Archivo (cuerpo), un color de acento distinto por proyecto, textura de grano sutil, secciones a pantalla completa con scroll-snap.

## Evidence on Hand

Las capturas, el stack técnico y las cifras de impacto de los 8 casos de estudio son reales y fueron confirmadas explícitamente por el usuario como verificables tal cual están — usar sin alterar, nunca fabricar cifras, resultados o casos adicionales. Hay un enlace en vivo real (eurobraces.com). El sitio no muestra testimonios de clientes actualmente: no inventar ninguno.

## Product Principles

1. Toda afirmación de resultado debe ser real y verificable — nunca inventar métricas, testimonios o casos.
2. El trabajo mostrado debe transmitir ejecución rápida y completa de punta a punta, sin fragmentación entre varias personas.
3. La propuesta debe funcionar igual de bien para una PyME local peruana que para un cliente remoto/internacional — sin asumir un único contexto cultural o idioma de negocio.
4. Las piezas gráficas (capturas, video) son el argumento de venta principal; el texto es de apoyo, no el protagonista.
5. La estética editorial oscura y audaz ya establecida es la identidad de marca — extenderla, no reemplazarla sin que el usuario lo pida explícitamente.
