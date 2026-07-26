import type { Metadata } from "next";
import { ProjectCarousel } from "./ProjectCarousel";

export const metadata: Metadata = {
  title: "Andree — Portafolio de software",
  description:
    "Productos digitales, automatización y sistemas construidos para resolver problemas reales.",
};

const projects = [
  {
    number: "01",
    title: "Medical Tech Field",
    eyebrow: "Field operations · Monitoreo en vivo",
    lead: "Un panel de control para asignar rutas diarias y seguir la operación de vendedores en tiempo real.",
    tone: "red",
    challenge:
      "Coordinar la agenda de ejecutivos de campo y conocer, durante la jornada, qué puntos de venta fueron visitados, cuáles siguen pendientes y dónde se encuentra cada vendedor.",
    solution:
      "Diseñé un panel administrativo que permite asignar clínicas y puntos de venta por fecha, visualizar la ruta recorrida sobre el mapa y monitorear geolocalización, movimiento y estado de cada visita.",
    impact:
      "Medical Tech obtiene trazabilidad diaria de su equipo comercial, puede reaccionar ante desvíos y mantiene una lectura clara del avance de cada ruta.",
    stack: ["Monitoreo en vivo", "Geolocalización", "Rutas diarias", "Estados PDV", "Usuarios", "Control de acceso"],
    deliverables: ["Mapa en vivo", "Asignación de rutas", "Seguimiento por vendedor"],
    carousel: [
      {
        src: "/projects/medicaltech-live-monitoring.png",
        alt: "Panel Medical Tech con la ruta y geolocalización en vivo de una ejecutiva",
        label: "Monitoreo en vivo",
      },
      {
        src: "/projects/medicaltech-route-assignment.png",
        alt: "Panel Medical Tech para asignar puntos de venta a la ruta diaria de una ejecutiva",
        label: "Asignación de rutas",
      },
      {
        src: "/projects/medicaltech-login.png",
        alt: "Pantalla de acceso seguro al panel Medical Tech",
        label: "Acceso seguro",
      },
    ],
  },
  {
    number: "02",
    title: "BlissMap",
    eyebrow: "SaaS · Geolocalización",
    lead: "Un localizador de tiendas personalizable que cualquier marca puede integrar en minutos.",
    image: "/projects/blissmap.png",
    imageAlt: "Captura de la plataforma BlissMap",
    tone: "violet",
    challenge:
      "Convertir una necesidad técnica —mostrar y administrar múltiples puntos de venta— en una experiencia simple para equipos sin conocimientos de programación.",
    solution:
      "Diseñé una plataforma con autenticación, administración de localizadores, geocodificación, personalización visual y publicación mediante iframe.",
    impact:
      "El negocio puede crear, actualizar e integrar su mapa sin depender de un desarrollador para cada cambio.",
    stack: ["React 19", "TypeScript", "Vite", "Supabase", "Leaflet", "Google Maps"],
    deliverables: ["Panel de gestión", "Mapa público", "Widget embebible"],
  },
  {
    number: "03",
    title: "CRM WhatsApp",
    eyebrow: "Automatización · CRM médico",
    lead: "Conversaciones de campo convertidas en información ordenada, consultable y segura.",
    tone: "lime",
    challenge:
      "Centralizar conversaciones entre ejecutivos y médicos sin alterar WhatsApp ni introducir funciones de envío que comprometieran la seguridad.",
    solution:
      "Construí un flujo de captura pasiva, normalización programada, deduplicación, persistencia local y un dashboard de consulta en modo solo lectura.",
    impact:
      "Unifica el historial comercial y permite revisar contactos, mensajes, archivos y estado de sincronización desde un único lugar.",
    stack: ["Node.js", "WhatsApp Web", "SQLite", "Python", "Streamlit", "Pandas"],
    deliverables: ["Captura pasiva", "ETL programado", "Dashboard seguro"],
    mockup: "crm",
  },
  {
    number: "04",
    title: "clickenla.bio",
    eyebrow: "Producto digital · Creator economy",
    lead: "Una alternativa peruana a Linktree con identidad propia, analítica y control total del perfil.",
    image: "/projects/clickenlabio.png",
    imageAlt: "Captura de clickenla.bio",
    tone: "coral",
    challenge:
      "Dar a creadores y negocios una página rápida, personalizable y fácil de administrar desde una sola pantalla.",
    solution:
      "Implementé registro, perfiles públicos, editor drag-and-drop, diseño configurable, vista previa móvil, QR del perfil y métricas por enlace.",
    impact:
      "Cada usuario puede lanzar una presencia digital coherente y medir clics y CTR sin armar un sitio desde cero.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Drag & Drop", "QR"],
    deliverables: ["Perfil público", "Editor visual", "Analítica"],
  },
  {
    number: "05",
    title: "QR Router",
    eyebrow: "Herramienta · Growth operations",
    lead: "QR estáticos y dinámicos cuyo destino puede cambiar sin volver a imprimir.",
    image: "/projects/qr-router.png",
    imageAlt: "Captura del creador de QR Router",
    tone: "cyan",
    challenge:
      "Evitar que una campaña impresa quede obsoleta cuando cambia la URL de destino y, además, medir su uso.",
    solution:
      "Desarrollé un administrador de enlaces con slugs persistentes, personalización del QR, historial de destinos, activación y conteo de visitas.",
    impact:
      "Los equipos actualizan campañas en segundos, conservan el mismo código físico y obtienen trazabilidad de escaneos.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "QR APIs"],
    deliverables: ["QR dinámico", "Historial", "Analítica de visitas"],
  },
  {
    number: "06",
    title: "Rindegastos",
    eyebrow: "Fintech interna · Operaciones",
    lead: "Un centro de control para revisar, aprobar, exportar y desembolsar gastos empresariales.",
    tone: "orange",
    challenge:
      "Reunir comprobantes, datos de vendedores, estados de aprobación y desembolsos que vivían dispersos en procesos manuales.",
    solution:
      "Construí un panel con filtros avanzados, revisión de vouchers, edición, exportaciones con imágenes, préstamos internos e integración con Dataverse.",
    impact:
      "Reduce trabajo operativo, mejora la trazabilidad y concentra decisiones financieras en una interfaz auditable.",
    stack: ["Next.js 14", "React 18", "Dataverse", "Microsoft Graph", "ExcelJS", "JSZip"],
    deliverables: ["Control de gastos", "Exportaciones", "Módulo de préstamos"],
    mockup: "expenses",
  },
] as const;

function ProjectVisual({
  project,
}: {
  project: (typeof projects)[number];
}) {
  if ("carousel" in project) {
    return <ProjectCarousel images={project.carousel} title={project.title} />;
  }

  if ("image" in project) {
    return (
      <figure className={`project-visual ${project.tone}`}>
        <div className="window-bar">
          <span />
          <span />
          <span />
          <small>{project.title.toLowerCase().replaceAll(" ", "-")}.app</small>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.imageAlt} />
      </figure>
    );
  }

  if (project.mockup === "crm") {
    return (
      <div className="project-visual mockup crm-mockup">
        <div className="mock-sidebar">
          <strong>WA·CRM</strong>
          <span className="active">Conversaciones</span>
          <span>Contactos</span>
          <span>Sincronización</span>
        </div>
        <div className="mock-content">
          <div className="mock-top">
            <div><small>CRM DE CAMPO</small><strong>Conversaciones</strong></div>
            <b>● Solo lectura</b>
          </div>
          <div className="chat-grid">
            <div className="contact-list">
              {["Dra. Valeria M.", "Dr. Carlos R.", "Dra. Ana P."].map((name, index) => (
                <div className={index === 0 ? "selected" : ""} key={name}>
                  <i>{name.charAt(0)}</i><span><strong>{name}</strong><small>Conversación sincronizada</small></span>
                </div>
              ))}
            </div>
            <div className="chat-thread">
              <span className="bubble">Buenos días, comparto la información solicitada.</span>
              <span className="bubble reply">Recibido. Lo revisamos en la reunión.</span>
              <span className="sync-label">Actualizado hace 2 min.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual mockup expenses-mockup">
      <div className="expense-head">
        <div><small>OPERACIONES FINANCIERAS</small><strong>Rindegastos</strong></div>
        <span>Exportar reporte ↗</span>
      </div>
      <div className="metric-row">
        <div><small>PENDIENTES</small><b>18</b><em>por revisar</em></div>
        <div><small>APROBADOS</small><b>S/ 24,680</b><em>este mes</em></div>
        <div><small>DESEMBOLSOS</small><b>12</b><em>procesados</em></div>
      </div>
      <div className="expense-table">
        <div className="table-tools"><span>Buscar comprobante…</span><span>Julio 2026⌄</span></div>
        {[
          ["Blisscorp", "Movilidad comercial", "S/ 148.00", "Aprobado"],
          ["Skinbliss", "Materiales", "S/ 326.40", "Pendiente"],
          ["Blissfarma", "Alimentación", "S/ 89.90", "Aprobado"],
        ].map((row) => (
          <div className="expense-row" key={row[1]}>
            {row.map((cell, index) => <span key={cell} className={index === 3 ? cell.toLowerCase() : ""}>{cell}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          <span>A</span> ANDREE
        </a>
        <div className="nav-links">
          <a href="#proyectos">Proyectos</a>
          <a href="#enfoque">Enfoque</a>
          <a className="nav-cta" href="#contacto">Conversemos ↗</a>
        </div>
      </nav>

      <header className="hero shell" id="inicio">
        <div className="hero-kicker"><span /> Disponible para nuevos proyectos · 2026</div>
        <h1>
          Software que convierte
          <span> procesos complejos </span>
          en productos claros.
        </h1>
        <div className="hero-bottom">
          <p>
            Diseño y construyo productos digitales, automatizaciones y sistemas internos
            que conectan tecnología, operación y resultados de negocio.
          </p>
          <a href="#proyectos" className="round-link" aria-label="Ver proyectos">↓</a>
        </div>
        <div className="hero-strip" aria-label="Especialidades">
          <span>PRODUCTO DIGITAL</span><i />
          <span>AUTOMATIZACIÓN</span><i />
          <span>FULL-STACK</span><i />
          <span>IA + DATOS</span>
        </div>
      </header>

      <section className="projects shell" id="proyectos">
        <div className="section-intro">
          <span className="section-index">01 / TRABAJO SELECCIONADO</span>
          <h2>Seis proyectos.<br />Seis problemas reales resueltos.</h2>
          <p>
            Cada caso combina criterio de producto, interfaz, arquitectura y ejecución.
            El foco no está en mostrar código: está en explicar la decisión y el valor creado.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              className={`project-card tone-${project.tone}`}
              id={`proyecto-${project.number}`}
              key={project.title}
            >
              <div className="project-heading">
                <span className="project-number">{project.number}</span>
                <div>
                  <p className="project-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-lead">{project.lead}</p>
                </div>
              </div>
              <ProjectVisual project={project} />
              <div className="case-grid">
                <div>
                  <span>EL RETO</span>
                  <p>{project.challenge}</p>
                </div>
                <div>
                  <span>LA SOLUCIÓN</span>
                  <p>{project.solution}</p>
                </div>
                <div>
                  <span>EL VALOR</span>
                  <p>{project.impact}</p>
                </div>
              </div>
              <div className="project-footer">
                <div className="tags">
                  {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
                <div className="deliverables">
                  {project.deliverables.map((item) => <span key={item}>✓ {item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach shell" id="enfoque">
        <span className="section-index">02 / CÓMO TRABAJO</span>
        <div className="approach-grid">
          <h2>De una fricción operativa a un producto usable.</h2>
          <div className="steps">
            {[
              ["01", "Entender", "Mapeo el problema, las personas y el costo real del proceso actual."],
              ["02", "Diseñar", "Convierto restricciones técnicas y de negocio en una experiencia clara."],
              ["03", "Construir", "Integro frontend, backend, datos y automatización en una solución mantenible."],
              ["04", "Validar", "Pruebo el flujo completo y dejo una base lista para iterar y crecer."],
            ].map(([num, title, copy]) => (
              <div className="step" key={num}>
                <span>{num}</span><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities shell">
        <span className="section-index">03 / CAPACIDADES</span>
        <div className="capability-grid">
          <h2>Producto, tecnología y operación en una sola conversación.</h2>
          <div className="capability-list">
            <span>Aplicaciones web full-stack</span>
            <span>Automatización de procesos</span>
            <span>Dashboards y analítica</span>
            <span>Integraciones y APIs</span>
            <span>Bases de datos y ETL</span>
            <span>Prototipos funcionales</span>
          </div>
        </div>
      </section>

      <footer className="footer" id="contacto">
        <div className="shell footer-inner">
          <p>¿Tienes un proceso que debería funcionar mejor?</p>
          <h2>Construyamos<br />la solución.</h2>
          <div className="footer-row">
            <span>Disponible para proyectos de producto, automatización y software a medida.</span>
            <a href="#inicio">Volver arriba ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
