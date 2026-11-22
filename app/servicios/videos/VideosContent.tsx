"use client";

import { useLanguage } from "../../i18n";
import { CtaBand } from "../../components/CtaBand";
import { ReelGrid } from "../../components/ReelGrid";
import { SectionHead } from "../../components/ui";
import { horizontalReels, verticalReels } from "../../../data/reels";

export function VideosContent() {
  const { t } = useLanguage();
  const v = t.video;

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="mono b">{v.index}</div>
          <h1>
            {v.h1Pre}
            <em>{v.h1Em}</em>
          </h1>
          <p className="lead">{v.lead}</p>
          <div className="stats">
            {v.stats.map((x) => (
              <div className="card" key={x.s}>
                <b>{x.b}</b>
                <span>{x.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" id="galeria">
        <div className="shell">
          <SectionHead index={v.galleryIndex} aside={v.galleryLead}>
            {v.galleryH2[0]}
            <br />
            {v.galleryH2[1]}
          </SectionHead>
          {verticalReels.length > 0 ? <ReelGrid reels={verticalReels} /> : null}
          {horizontalReels.length > 0 ? (
            <div className="horizontal">
              <div className="horizontal-copy">
                <div className="mono b">{v.horizontalTitle.toUpperCase()}</div>
                <p className="lead">{v.horizontalCopy}</p>
              </div>
              <ReelGrid reels={horizontalReels} wide />
            </div>
          ) : null}
        </div>
      </section>

      <section className="sec tight">
        <div className="shell">
          <SectionHead index={v.processIndex}>
            {v.processH2[0]}
            <br />
            {v.processH2[1]}
          </SectionHead>
          <div className="steps">
            {v.steps.map((s) => (
              <div className="card" key={s.n}>
                <b>{s.n}</b>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand kicker={v.ctaKicker} pre={v.ctaH2Pre} em={v.ctaH2Em} label={t.common.whatsapp} />
    </>
  );
}
