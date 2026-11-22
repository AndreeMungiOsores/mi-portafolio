"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useLanguage } from "./i18n";
import { cases } from "./lib/cases";
import { CaseCard } from "./components/CaseCard";
import { CtaBand } from "./components/CtaBand";
import { ButtonLink, Cubo, SectionHead, WaButton, CheckList } from "./components/ui";

const SERVICE_ICONS = [
  <path key="a" d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
  <g key="b"><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" /></g>,
  <g key="c"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></g>,
  <g key="d"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9.5v5l4.5-2.5z" /></g>,
];
const SERVICE_LINKS = ["/servicios#software", "/servicios#automatizacion", "/servicios/web", "/servicios/videos"];

export function ServiceIcon({ index }: { index: number }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {SERVICE_ICONS[index]}
    </svg>
  );
}

const FEATURED = ["eurobraces-center", "routetrack", "qr-router"];
const REELS = ["reel-0108", "reel-0118", "reel-0204"];

export function HomeContent() {
  const { t } = useLanguage();
  const h = t.home;
  const featured = FEATURED.map((slug) => cases.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="glow hero-glow" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="chips" aria-hidden="true">
              {h.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
            <h1>
              {h.h1Pre}
              <em>{h.h1Em}</em>
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="btns">
              <WaButton>{t.common.whatsapp}</WaButton>
              <ButtonLink href="/casos">{h.seeCases}</ButtonLink>
            </div>
            <dl className="meta">
              {h.meta.map((m) => (
                <div key={m.s}>
                  <dt>{m.b}</dt>
                  <dd>{m.s}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <Cubo pose="saludando" className="hero-cubo float-y" />
            <span className="float f1">CRM</span>
            <span className="float f2">{t.home.chips[1]}</span>
            <span className="float f3">API</span>
            <span className="float f4">ERP</span>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <SectionHead index={h.servicesIndex} aside={h.servicesLead}>
            {h.servicesH2[0]}
            <br />
            {h.servicesH2[1]}
          </SectionHead>
          <div className="svc">
            {h.services.map((s, i) => (
              <Link href={SERVICE_LINKS[i]} className="card svc-card" key={s.title}>
                <ServiceIcon index={i} />
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <span className="more">{t.common.viewService}</span>
              </Link>
            ))}
          </div>
          <div className="caps">
            {h.caps.map((c) => (
              <span className="chip plain" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={h.casesIndex} aside={h.casesLead}>
            {h.casesH2[0]}
            <br />
            {h.casesH2[1]}
          </SectionHead>
          <div className="grid3">
            {featured.map((c) => (
              <CaseCard study={c} key={c.slug} />
            ))}
          </div>
          <div className="center">
            <ButtonLink href="/casos">{h.casesAll}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <div className="vid">
            <div>
              <div className="mono b">{h.videoIndex}</div>
              <h2>
                {h.videoH2Pre}
                <em>{h.videoH2Em}</em>
              </h2>
              <CheckList items={h.videoPills} />
              <ButtonLink href="/servicios/videos" variant="p">{h.videoBtn}</ButtonLink>
            </div>
            <div className="phones" aria-hidden="true">
              {REELS.map((slug) => (
                <div className="ph" key={slug}>
                  <img src={`/videos/${slug}.jpg`} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <div className="head">
            <div>
              <div className="mono b">{h.processIndex}</div>
              <h2>
                {h.processH2[0]}
                <br />
                {h.processH2[1]}
              </h2>
            </div>
            <div className="head-cubo" aria-hidden="true">
              <Cubo pose="pensando" />
            </div>
          </div>
          <div className="steps">
            {h.steps.map((s) => (
              <div className="card" key={s.n}>
                <b>{s.n}</b>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand kicker={t.cta.homeKicker} pre={t.cta.homeH2Pre} em={t.cta.homeH2Em} label={t.common.whatsapp} />
    </>
  );
}
