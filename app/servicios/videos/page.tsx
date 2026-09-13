import type { Metadata } from "next";
import { SiteNav } from "../../SiteNav";
import { SiteFooter } from "../../SiteFooter";
import { ReelGrid } from "./ReelGrid";
import { horizontalReels, verticalReels } from "./reels";

export const metadata: Metadata = {
  title: "Videos publicitarios con IA",
  description:
    "Producción de reels y anuncios en video generados con Inteligencia Artificial: guion persuasivo, avatares y voces hiperrealistas, edición dinámica y entrega rápida.",
  openGraph: {
    title: "Videos publicitarios con IA · Andree",
    description:
      "Anuncios y reels de alto impacto generados con Inteligencia Artificial. Menor costo, entrega en 48-72h y listos para pautar en redes.",
  },
};

const PROCESO = [
  ["01", "Brief y ángulo comercial", "Definimos tu producto, a quién le vendes y la oferta que provocará el clic o la compra."],
  ["02", "Guion y ganchos con IA", "Estructuro el gancho de los primeros 3 segundos, los puntos de dolor y el llamado a la acción."],
  ["03", "Generación y edición", "Creo visuales, avatares y locución neural con IA, integrando música, ritmo y subtítulos de alta retención."],
  ["04", "Entrega lista para pautar", "Archivos en formato 9:16, 1:1 o 16:9 listos para subir a tus redes o correr en anuncios pagados."],
] as const;

export default function VideosPage() {
  return (
    <main className="service-page video-service-page">
      <SiteNav active="videos" />

      <header className="service-hero shell" id="inicio">
        <span className="section-index">SERVICIO · PRODUCCIÓN AUDIOVISUAL CON IA</span>
        <h1>
          Videos publicitarios con IA que
          <span> se ven hasta el final.</span>
        </h1>
        <div className="service-hero-bottom">
          <p>
            Produzco reels y anuncios de alto impacto potenciados con Inteligencia Artificial:
            guiones que retienen el scroll, voces y visuales hiperrealistas, y entrega lista
            para pautar en días, no en semanas.
          </p>
          <a href="#galeria" className="round-link" aria-label="Ver los videos">
            ↓
          </a>
        </div>
        <div className="service-stats">
          <div>
            <b>100% IA</b>
            <span>Producción ágil</span>
          </div>
          <div>
            <b>48-72h</b>
            <span>Tiempo de entrega</span>
          </div>
          <div>
            <b>-70% costo</b>
            <span>Frente a rodaje tradicional</span>
          </div>
          <div>
            <b>9:16 + 1:1</b>
            <span>Optimizado para anuncios</span>
          </div>
        </div>
      </header>

      <section className="service-section shell" id="galeria">
        <div className="service-section-head">
          <span className="section-index">01 / TRABAJO REAL CON IA</span>
          <h2>Piezas generadas y producidas con IA.</h2>
          <p>
            Toca cualquier video para reproducirlo con sonido. Todo lo que ves aquí fue creado
            con herramientas de Inteligencia Artificial y edición profesional para marcas y campañas reales.
          </p>
        </div>

        {verticalReels.length > 0 ? <ReelGrid reels={verticalReels} /> : null}

        {horizontalReels.length > 0 ? (
          <>
            <div className="service-subhead">
              <h3>Formato horizontal</h3>
              <p>Spots para YouTube, pantallas en punto de venta y presentaciones.</p>
            </div>
            <ReelGrid reels={horizontalReels} />
          </>
        ) : null}
      </section>

      <section className="service-section shell">
        <span className="section-index">02 / CÓMO TRABAJO</span>
        <div className="approach-grid">
          <h2>De una idea a anuncios listos para pautar en 4 pasos.</h2>
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

      <SiteFooter
        kicker="¿Quieres anuncios en video de alto impacto sin gastar miles en producción?"
        headline={
          <>
            Produzcamos
            <br />
            tus videos con IA.
          </>
        }
        note="Reels, spots y anuncios con Inteligencia Artificial para marcas que necesitan salir a pautar y vender esta semana."
      />
    </main>
  );
}
