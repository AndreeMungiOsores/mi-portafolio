const WHATSAPP = "https://wa.me/51961556197";

export function SiteFooter({
  kicker = "¿Tienes un proceso que debería funcionar mejor?",
  headline = (
    <>
      Construyamos
      <br />
      la solución.
    </>
  ),
  note = "Disponible para proyectos de producto, automatización y software a medida.",
}: {
  kicker?: string;
  headline?: React.ReactNode;
  note?: string;
}) {
  return (
    <footer className="footer" id="contacto">
      <div className="shell footer-inner">
        <p>{kicker}</p>
        <h2>{headline}</h2>
        <a
          className="whatsapp-button"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Mandar un mensaje a Andree por WhatsApp"
        >
          <span className="whatsapp-icon" aria-hidden="true">
            ☎
          </span>
          <span>
            <small>HABLEMOS POR WHATSAPP</small>
            Mandar mensaje
          </span>
          <b aria-hidden="true">↗</b>
        </a>
        <div className="footer-row">
          <span>{note}</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
