"use client";

import { useState } from "react";
import { useLanguage } from "../i18n";
import { cases } from "../lib/cases";
import { CaseCard } from "../components/CaseCard";
import { CtaBand } from "../components/CtaBand";
import { Cubo, WaButton } from "../components/ui";

const CATEGORIES = ["web", "producto", "crm", "operaciones", "automatizacion"] as const;

export function CasosContent() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const c = t.cases;
  const visible = filter === "all" ? cases : cases.filter((x) => x.category === filter);
  const count = (cat: string) => cases.filter((x) => x.category === cat).length;

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="mono b">{c.index}</div>
          <h1>
            {c.h1[0]}
            <br />
            <em>{c.h1[1]}</em>
          </h1>
          <p className="lead">{c.lead}</p>
        </div>
      </section>

      <div className="shell">
        <div className="filters" role="group" aria-label={c.index}>
          <button type="button" className={filter === "all" ? "chip on" : "chip"} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            {c.all} · {cases.length}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              className={filter === cat ? "chip on" : "chip"}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {c.categories[cat]} · {count(cat)}
            </button>
          ))}
        </div>

        <div className="grid3 cases-grid">
          {visible.map((study) => (
            <CaseCard study={study} key={study.slug} />
          ))}
          {filter === "all" && (
            <article className="card next9">
              <Cubo pose="pensando" className="next9-cubo" />
              <div className="mono b">{c.nextCardTag}</div>
              <h3>{c.nextCardTitle}</h3>
              <WaButton>{c.nextCardBtn}</WaButton>
            </article>
          )}
        </div>
      </div>

      <CtaBand kicker={c.ctaKicker} pre={c.ctaH2Pre} em={c.ctaH2Em} pose="check" label={t.common.whatsapp} />
    </>
  );
}
