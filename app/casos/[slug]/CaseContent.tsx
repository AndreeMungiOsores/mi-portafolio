"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n";
import { WHATSAPP_URL } from "../../copy";
import { caseSlides, caseText, cases, type CaseStudy } from "../../lib/cases";
import { CtaBand } from "../../components/CtaBand";
import { ProjectGallery, type GallerySlide } from "../../components/ProjectGallery";
import { WaIcon } from "../../components/ui";

export function CaseContent({ slug }: { slug: string }) {
  const { lang, t } = useLanguage();
  const index = cases.findIndex((c) => c.slug === slug);
  const study = cases[index] as CaseStudy;
  const next = cases[(index + 1) % cases.length];
  const text = caseText(study, lang);
  const d = t.caseDetail;

  const slides: GallerySlide[] = caseSlides(study, lang).map((s) => ({ type: "image", src: s.src, alt: s.alt, label: s.label }));
  const words = study.title.split(" ");
  const last = words.length > 1 ? words.pop() : null;
  const cards = [
    { k: d.challenge, v: text.challenge },
    { k: d.solution, v: text.solution },
    ...(text.impact ? [{ k: d.result, v: text.impact }] : []),
  ];

  return (
    <>
      <section className="case-head">
        <div className="shell">
          <div className="crumb">
            <Link href="/casos">{d.crumb}</Link> / {study.title.toUpperCase()}
          </div>
          <div className="case-row">
            <div>
              <div className="mono b">{text.eyebrow}</div>
              <h1>
                {last ? words.join(" ") + " " : study.title}
                {last ? <em>{last}</em> : null}
              </h1>
              <p className="lead">{text.lead}</p>
              <div className="chips" aria-label={d.stack}>
                {text.stack.map((tech) => (
                  <span className="chip" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <div className="case-actions">
              {study.liveUrl ? (
                <a className="btn p" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                  {d.live}
                </a>
              ) : null}
              <a className="btn s" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <WaIcon />
                {d.wantThis}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        {slides.length > 0 ? <ProjectGallery slides={slides} title={study.title} /> : null}
      </section>

      <section className="sec tight">
        <div className="shell">
          <div className={`tri n${cards.length}`}>
            {cards.map((c) => (
              <div className="card" key={c.k}>
                <span className="mono b">{c.k}</span>
                <p>{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell next-case">
        <Link href={`/casos/${next.slug}`} className="card next-link">
          <div>
            <div className="mono">{d.next}</div>
            <h3>{next.title}</h3>
          </div>
          <span className="btn s">{t.common.viewCase}</span>
        </Link>
      </section>

      <CtaBand kicker={d.ctaKicker} pre={d.ctaH2Pre} em={d.ctaH2Em} pose="senalando" label={t.common.whatsapp} />
    </>
  );
}
