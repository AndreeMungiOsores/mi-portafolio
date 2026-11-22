import { WHATSAPP_NUMBER } from "../copy";
import { Cubo, WaButton, type Pose } from "./ui";

/** Banda de llamado a la acción en cobalto sólido (patrón de los flyers de la marca). */
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
            <WaButton variant="w">{label}</WaButton>
            <span className="cta-number">{WHATSAPP_NUMBER}</span>
          </div>
        </div>
        <div className="stage" aria-hidden="true">
          <Cubo pose={pose} />
        </div>
      </div>
    </section>
  );
}
