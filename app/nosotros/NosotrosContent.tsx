"use client";

import { useLanguage } from "../i18n";
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_NUMBER } from "../copy";
import { Cubo, SectionHead, WaButton } from "../components/ui";

export function NosotrosContent() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <section className="page-head about-head">
        <div className="shell about-grid">
          <div>
            <div className="mono b">{a.index}</div>
            <h1>
              {a.h1Pre}
              <em>{a.h1Em}</em>
            </h1>
            <p className="lead">{a.lead}</p>
          </div>
          <div className="about-visual" aria-hidden="true">
            <div className="glow about-glow" />
            <Cubo pose="senalando" className="float-y" />
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={a.principlesIndex} aside={a.principlesLead}>{a.principlesH2}</SectionHead>
          <div className="grid3 vals">
            {a.principles.map((p) => (
              <div className="card" key={p.n}>
                <span className="num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" id="contacto">
        <div className="shell">
          <SectionHead index={a.contactIndex} aside={a.contactLead}>{a.contactH2}</SectionHead>
          <div className="two">
            <div className="card wa-card">
              <div className="mono b">{a.waLabel}</div>
              <div className="wa-number">{WHATSAPP_NUMBER}</div>
              <WaButton>{a.openWa}</WaButton>
              <Cubo pose="saludando" className="wa-cubo" />
            </div>
            <div className="card soc">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><b>{a.rows.instagram}</b><span>@mungi.lat</span></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><b>{a.rows.facebook}</b><span>Mungi lat</span></a>
              <div><b>{a.rows.web}</b><span>mungi.lat</span></div>
              <div><b>{a.rows.place}</b><span>{t.common.country}</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
