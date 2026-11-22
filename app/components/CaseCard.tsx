"use client";

import Link from "next/link";
import { useLanguage } from "../i18n";
import { caseText, coverOf, type CaseStudy } from "../lib/cases";
import { Shot } from "./ui";

export function CaseCard({ study }: { study: CaseStudy }) {
  const { lang, t } = useLanguage();
  const text = caseText(study, lang);

  return (
    <article className="card case-card">
      <Link href={`/casos/${study.slug}`} className="case-link" aria-label={`${study.title}: ${t.common.viewCase}`}>
        <Shot src={coverOf(study)} />
        <div className="case-body">
          <div className="mono b">{text.eyebrow}</div>
          <h3>{study.title}</h3>
          <p>{text.lead}</p>
          <div className="chips">
            {text.stack.slice(0, 3).map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <span className="more">{t.common.viewCase}</span>
        </div>
      </Link>
    </article>
  );
}
