"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n";
import { CtaBand } from "../../components/CtaBand";
import { SectionHead } from "../../components/ui";

export function WebContent() {
  const { t } = useLanguage();
  const w = t.web;

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="mono b">{w.index}</div>
          <h1>
            {w.h1Pre}
            <em>{w.h1Em}</em>
          </h1>
          <p className="lead">{w.lead}</p>
          <div className="stats">
            {w.stats.map((x) => (
              <div className="card" key={x.s}>
                <b>{x.b}</b>
                <span>{x.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={w.typesIndex}>{w.typesH2}</SectionHead>
          <div className="grid4">
            {w.types.map((x) => (
              <div className="card info-card" key={x.title}>
                <h3>{x.title}</h3>
                <p>{x.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" id="paquetes">
        <div className="shell">
          <SectionHead index={w.plansIndex} aside={w.plansLead}>{w.plansH2}</SectionHead>
          <div className="plans">
            {w.plans.map((p) => (
              <article className={`card plan${"featured" in p && p.featured ? " featured" : ""}`} key={p.name}>
                {"featured" in p && p.featured ? <span className="plan-flag">{w.featured}</span> : null}
                <h3>{p.name}</h3>
                <p className="plan-price">{p.price}</p>
                <p className="mono b">{w.delivery} {p.timeline}</p>
                <p className="plan-summary">{p.summary}</p>
                <ul>
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a className="btn s" href="#contacto-cta">{w.quote}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={w.processIndex}>{w.processH2}</SectionHead>
          <div className="steps">
            {w.steps.map((s) => (
              <div className="card" key={s.n}>
                <b>{s.n}</b>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={w.proofIndex} aside={w.proofLead}>{w.proofH2}</SectionHead>
          <div className="grid3">
            {w.proofs.map((p) => (
              <Link className="card info-card proof" href={`/casos/${p.slug}`} key={p.slug}>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
                <span className="more">{w.proofLink}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight">
        <div className="shell faq-shell">
          <SectionHead index={w.faqIndex}>{w.faqH2}</SectionHead>
          <div className="faq">
            {w.faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  <span>{q}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand kicker={w.ctaKicker} pre={w.ctaH2Pre} em={w.ctaH2Em} pose="senalando" label={t.common.whatsapp} />
    </>
  );
}
