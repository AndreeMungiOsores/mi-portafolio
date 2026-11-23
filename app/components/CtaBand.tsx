import { WHATSAPP_NUMBER } from "../copy";
import { Cubo, WaButton, type Pose } from "./ui";

/** Banda de llamado a la acción: escenario claro con el Cubo sobre órbitas (sin recuadro propio). */
export function CtaBand({
  kicker,
  pre,
  em,
  pose = "saludando",
  label,
}: {
  kicker: string;
  pre: string;
  em: string;
  pose?: Pose;
  label: string;
}) {
  return (
    <section className="shell cta-wrap" id="contacto-cta">
      <div className="cta">
        <div className="cta-text">
          <div className="k">{kicker}</div>
          <h2>
            {pre}
            <em>{em}</em>
          </h2>
          <div className="cta-actions">
            <WaButton>{label}</WaButton>
            <span className="cta-number">{WHATSAPP_NUMBER}</span>
          </div>
        </div>
        <div className="stage" aria-hidden="true">
          <span className="glow-c" />
          <span className="ring r1" />
          <span className="ring r2" />
          <span className="ring r3" />
          <span className="dot d1" />
          <span className="dot d2" />
          <span className="dot d3" />
          <Cubo pose={pose} />
        </div>
      </div>
    </section>
  );
}
