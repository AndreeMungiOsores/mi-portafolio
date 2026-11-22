"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { useLanguage } from "../i18n";
import { CompareSlider } from "./CompareSlider";

export type GallerySlide =
  | { type: "image"; src: string; alt: string; label: string }
  | { type: "compare"; label: string; before: { src: string; alt: string }; after: { src: string; alt: string } };

export function ProjectGallery({ slides, title }: { slides: readonly GallerySlide[]; title: string }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number; skip: boolean } | null>(null);
  const many = slides.length > 1;
  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <figure className="gallery" aria-label={`${t.caseDetail.galleryAria} ${title}`}>
      <div
        className="shot gallery-stage"
        onTouchStart={(e) => {
          if (!many) return;
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, skip: !!(e.target as HTMLElement).closest(".compare-slider") };
        }}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s || s.skip) return;
          const dx = e.changedTouches[0].clientX - s.x;
          const dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="shot-bar" aria-hidden="true">
          <b />
          <b />
          <b />
        </div>
        <div className="gallery-frames">
          {slides.map((s, i) => (
            <div className={`gallery-frame${i === index ? " is-active" : ""}`} key={s.label} aria-hidden={i !== index}>
              {s.type === "compare" ? (
                <CompareSlider before={s.before} after={s.after} />
              ) : (
                <img src={s.src} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
              )}
            </div>
          ))}
        </div>
        {many && (
          <>
            <button type="button" className="gallery-arrow prev" onClick={() => go(index - 1)} aria-label={t.caseDetail.prev}>
              ←
            </button>
            <button type="button" className="gallery-arrow next" onClick={() => go(index + 1)} aria-label={t.caseDetail.nextView}>
              →
            </button>
          </>
        )}
      </div>

      {many && (
        <>
          <div className="gallery-meta">
            <span className="mono">{slides[index].label}</span>
            <span className="mono">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="gallery-thumbs" role="group" aria-label={t.caseDetail.selectView}>
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.label}
                className={i === index ? "on" : ""}
                onClick={() => setIndex(i)}
                aria-label={s.label}
                aria-current={i === index ? "true" : undefined}
              >
                <img src={s.type === "compare" ? s.after.src : s.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </>
      )}
    </figure>
  );
}
