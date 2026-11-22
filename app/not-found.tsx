"use client";

import { useLanguage } from "./i18n";
import { ButtonLink, Cubo, WaButton } from "./components/ui";

export default function NotFound() {
  const { t } = useLanguage();
  const n = t.notFound;

  return (
    <section className="page-head about-head">
      <div className="shell about-grid">
        <div>
          <div className="mono b">404</div>
          <h1>{n.title}</h1>
          <p className="lead">{n.copy}</p>
          <div className="btns">
            <ButtonLink href="/" variant="p">{n.home}</ButtonLink>
            <WaButton>{t.common.whatsapp}</WaButton>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="glow about-glow" />
          <Cubo pose="preocupado" className="float-y" />
        </div>
      </div>
    </section>
  );
}
