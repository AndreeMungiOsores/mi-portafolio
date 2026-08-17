import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../../SiteNav";
import { SiteFooter } from "../../SiteFooter";

export const metadata: Metadata = {
  title: "Páginas web",
  description:
    "Diseño y desarrollo de landings, sitios corporativos y aplicaciones web a medida, con hosting, dominio y analítica listos.",
  openGraph: {
    title: "Páginas web · Andree",
    description:
      "Landings, sitios corporativos y aplicaciones web a medida: rápidos, medibles y fáciles de actualizar.",
  },
};

/**
 * ✏️ EDITA AQUÍ LOS PAQUETES.
 * `price` es texto libre: pon "S/ 900", "Desde $400" o "A convenir".
 * `timeline` es el plazo estimado de entrega.
 */
const PAQUETES = [
  {
    name: "Landing page",
    price: "A convenir",
    timeline: "1 a 2 semanas",
    summary: "Una página que explica lo que vendes y empuja a un solo llamado a la acción.",
    includes: [
      "Diseño a medida (sin plantilla)",
      "Una página, hasta 6 secciones",
      "Formulario o botón directo a WhatsApp",
      "Optimización para celular",
      "Dominio, hosting y publicación",
    ],
    tone: "cyan",
  },
  {
    name: "Sitio corporativo",
    price: "A convenir",
    timeline: "2 a 4 semanas",
    summary: "La presencia completa de la empresa: servicios, casos, equipo y contacto.",
    includes: [
      "Todo lo de la landing",
      "Hasta 6 páginas internas",
      "Blog o sección de novedades",
      "SEO técnico y metadatos",
      "Panel para editar contenido",
      "Google Analytics configurado",
    ],
    featured: true,
    tone: "violet",
  },
  {
    name: "Aplicación web",
    price: "A convenir",
    timeline: "Desde 4 semanas",
    summary: "Cuando el sitio tiene que hacer algo: cuentas, datos, reportes o automatizaciones.",
    includes: [
      "Login y roles de usuario",
      "Base de datos y panel de administración",
      "Integraciones con APIs y servicios",
      "Reportes y exportaciones",
      "Despliegue y monitoreo",
    ],
    tone: "lime",
  },
] as const;

const TIPOS = [
  [
    "Landing de campaña",
    "Una sola página, un solo objetivo. Ideal para pauta publicitaria: llega el clic y convierte.",
  ],
  [
    "Sitio institucional",
    "Servicios, casos, equipo y contacto. La cara formal de la empresa para clientes y proveedores.",
  ],
  [
    "Catálogo o localizador",
    "Productos, sedes o puntos de venta con búsqueda, filtros y mapa. Actualizable sin tocar código.",
  ],
  [
    "Panel interno",
    "Herramientas para tu equipo: seguimiento, reportes y procesos que hoy viven en Excel o WhatsApp.",
  ],
] as const;

const PROCESO = [
  ["01", "Conversamos", "Media hora para entender el negocio, el público y qué debe lograr el sitio."],
  ["02", "Propuesta", "Te paso alcance, plazo y precio cerrado. Sin sorpresas a mitad del proyecto."],
  ["03", "Diseño y desarrollo", "Trabajo con avances visibles: ves el sitio crecer, no esperas a ciegas."],
  ["04", "Publicación", "Dominio, hosting, analítica y una guía corta para que puedas actualizarlo tú."],
] as const;

const PRUEBAS = [
  {
    title: "clickenla.bio",
    copy: "Producto completo con registro, editor visual, perfiles públicos y analítica por enlace.",
    href: "/#proyecto-05",
    tone: "coral",
  },
  {
    title: "BlissMap",
    copy: "SaaS de localizadores: panel de gestión, mapa público y widget embebible para cualquier marca.",
    href: "/#proyecto-03",
    tone: "violet",
  },
  {
    title: "QR Router",
    copy: "Herramienta con enlaces dinámicos, historial de destinos y conteo de visitas.",
    href: "/#proyecto-06",
    tone: "cyan",
  },
] as const;

const FAQ = [
  [
    "¿Cuánto cuesta una página web?",
    "Depende del alcance. Una landing de una página no cuesta lo mismo que un sitio con panel de administración. Después de una conversación corta te paso un precio cerrado, no un rango.",
  ],
  [
    "¿El dominio y el hosting están incluidos?",
    "Configuro ambos como parte del proyecto. El costo anual del dominio y del hosting lo pagas directamente al proveedor, a tu nombre: el sitio siempre queda en tus cuentas, no en las mías.",
  ],
  [
    "¿Puedo actualizar el contenido yo mismo?",
    "Sí. En los paquetes con panel editas textos, imágenes y secciones sin tocar código. Te dejo una guía y te acompaño la primera vez.",
  ],
  [
    "¿Usas plantillas de WordPress?",
    "No. Diseño y programo cada sitio a medida, lo que da páginas más rápidas y sin plugins que se rompen. Si prefieres un gestor conocido para editar, lo integramos.",
  ],
  [
    "¿Qué pasa si necesito cambios después de entregar?",
    "Incluyo un mes de ajustes tras la publicación. Pasado ese plazo podemos trabajar por horas o con un acuerdo de mantenimiento mensual.",
  ],
  [
    "¿Trabajas con empresas fuera de Perú?",
    "Sí. Todo el proceso funciona a distancia: reuniones por video, avances en línea y entrega del sitio publicado.",
  ],
] as const;

export default function WebPage() {
  return (
    <main className="service-page">
      <SiteNav active="web" />

      <header className="service-hero shell" id="inicio">
        <span className="section-index">SERVICIO · WEB</span>
        <h1>
          Páginas web que
          <span> trabajan para el negocio.</span>
        </h1>
        <div className="service-hero-bottom">
          <p>
            Diseño y programo sitios a medida: rápidos, claros en el celular y medibles. Desde
            una landing para pauta hasta una aplicación con cuentas, datos y reportes.
          </p>
          <a href="#paquetes" className="round-link" aria-label="Ver los paquetes">
            ↓
          </a>
        </div>
        <div className="service-stats">
          <div>
            <b>A medida</b>
            <span>Sin plantillas</span>
          </div>
          <div>
            <b>1-4 sem</b>
            <span>Plazo típico</span>
          </div>
          <div>
            <b>100%</b>
            <span>Responsive</span>
          </div>
          <div>
            <b>Tuyo</b>
            <span>Dominio y hosting a tu nombre</span>
          </div>
        </div>
      </header>

      <section className="service-section shell">
        <div className="service-section-head">
          <span className="section-index">01 / QUÉ CONSTRUYO</span>
          <h2>Cuatro tipos de sitio, un mismo estándar.</h2>
        </div>
        <div className="include-grid">
          {TIPOS.map(([title, copy]) => (
            <div className="include-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section shell" id="paquetes">
        <div className="service-section-head">
          <span className="section-index">02 / PAQUETES</span>
          <h2>Alcance claro desde el primer día.</h2>
          <p>
            Cada paquete se cierra con alcance y plazo por escrito. Si tu caso no encaja en
            ninguno, lo armamos a medida.
          </p>
        </div>
        <div className="plan-grid">
          {PAQUETES.map((plan) => (
            <article
              className={`plan-card tone-${plan.tone}${"featured" in plan && plan.featured ? " featured" : ""}`}
              key={plan.name}
            >
              {"featured" in plan && plan.featured ? <span className="plan-flag">Más pedido</span> : null}
              <h3>{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <p className="plan-timeline">Entrega: {plan.timeline}</p>
              <p className="plan-summary">{plan.summary}</p>
              <ul>
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="plan-cta" href="#contacto">
                Cotizar este paquete ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="service-section shell">
        <span className="section-index">03 / CÓMO TRABAJO</span>
        <div className="approach-grid">
          <h2>Cuatro pasos, sin cajas negras.</h2>
          <div className="steps">
            {PROCESO.map(([num, title, copy]) => (
              <div className="step" key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section shell">
        <div className="service-section-head">
          <span className="section-index">04 / PRUEBA</span>
          <h2>Ya está construido y funcionando.</h2>
          <p>
            No son maquetas: son productos en uso. Puedes ver el detalle de cada uno en el
            portafolio.
          </p>
        </div>
        <div className="proof-grid">
          {PRUEBAS.map((proof) => (
            <Link className={`proof-card tone-${proof.tone}`} href={proof.href} key={proof.title}>
              <h3>{proof.title}</h3>
              <p>{proof.copy}</p>
              <span>Ver el caso ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-section shell" id="preguntas">
        <div className="service-section-head">
          <span className="section-index">05 / PREGUNTAS</span>
          <h2>Lo que todos preguntan antes de empezar.</h2>
        </div>
        <div className="faq-list">
          {FAQ.map(([question, answer]) => (
            <details key={question}>
              <summary>
                <span>{question}</span>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter
        kicker="¿Tu negocio todavía no tiene sitio, o el que tiene no funciona?"
        headline={
          <>
            Hagamos
            <br />
            tu página.
          </>
        }
        note="Landings, sitios corporativos y aplicaciones web a medida, con dominio y hosting a tu nombre."
      />
    </main>
  );
}
