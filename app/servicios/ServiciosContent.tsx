"use client";
/* eslint-disable @next/next/no-img-element */

import { useLanguage } from "../i18n";
import { CtaBand } from "../components/CtaBand";
import { ButtonLink, CheckList, Shot } from "../components/ui";

export function ServiciosContent() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="mono b">{s.index}</div>
          <h1>
            {s.h1Pre}
            <em>{s.h1Em}</em>
          </h1>
          <p className="lead">{s.lead}</p>
        </div>
      </section>

      <div className="shell">
        <section className="blk" id="software">
          <div className="blk-text">
            <div className="num">01</div>
            <h2>{s.software.title}</h2>
            <p className="lead">{s.software.lead}</p>
            <CheckList items={s.software.items} />
            <ButtonLink href="/casos" variant="p">{s.software.cta}</ButtonLink>
          </div>
          <Shot src="/projects/medicaltech-crm-map.webp" />
        </section>

        <section className="blk rev" id="automatizacion">
          <div className="blk-text">
            <div className="num">02</div>
            <h2>{s.automation.title}</h2>
            <p className="lead">{s.automation.lead}</p>
            <CheckList items={s.automation.items} />
            <ButtonLink href="/casos/crm-whatsapp" variant="p">{s.automation.cta}</ButtonLink>
          </div>
          <Shot src="/projects/captura-de-pantalla-2026-09-05-223524-23e139.webp" />
        </section>

        <section className="blk" id="web">
          <div className="blk-text">
            <div className="num">03</div>
            <h2>{s.web.title}</h2>
            <p className="lead">{s.web.lead}</p>
            <div className="packs">
              {s.web.packs.map((p) => (
                <div className="card" key={p.name}>
                  <b>{p.name}</b>
                  <span className="mono b">{p.time}</span>
                  <p>{p.copy}</p>
                </div>
              ))}
            </div>
            <ButtonLink href="/servicios/web" variant="p">{s.web.cta}</ButtonLink>
          </div>
          <Shot src="/projects/eurobraces-home-hero.webp" />
        </section>

        <section className="blk rev" id="video">
          <div className="blk-text">
            <div className="num">04</div>
            <h2>{s.video.title}</h2>
            <p className="lead">{s.video.lead}</p>
            <div className="stat2">
              {s.video.stats.map((x) => (
                <div className="card" key={x.s}>
                  <b>{x.b}</b>
                  <span>{x.s}</span>
                </div>
              ))}
            </div>
            <ButtonLink href="/servicios/videos" variant="p">{s.video.cta}</ButtonLink>
          </div>
          <div className="duo" aria-hidden="true">
            <div className="card"><img src="/videos/reel-0127.jpg" alt="" loading="lazy" /></div>
            <div className="card low"><img src="/videos/reel-0731.jpg" alt="" loading="lazy" /></div>
          </div>
        </section>
      </div>

      <CtaBand kicker={s.ctaKicker} pre={s.ctaH2Pre} em={s.ctaH2Em} pose="pensando" label={t.common.whatsapp} />
    </>
  );
}
