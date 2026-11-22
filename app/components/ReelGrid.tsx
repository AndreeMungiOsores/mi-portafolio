"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n";
import type { Reel } from "../../data/reels";

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  return `${mins}:${String(seconds % 60).padStart(2, "0")}`;
}

export function ReelGrid({ reels, wide = false }: { reels: readonly Reel[]; wide?: boolean }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpenIndex((cur) => {
      if (cur !== null) triggers.current[cur]?.focus();
      return null;
    });
  }, []);
  const step = useCallback(
    (d: number) => setOpenIndex((cur) => (cur === null ? cur : (cur + d + reels.length) % reels.length)),
    [reels.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : reels[openIndex];

  return (
    <>
      <div className={`reels${wide ? " wide" : ""}`}>
        {reels.map((reel, i) => (
          <button
            type="button"
            className="reel"
            key={reel.slug}
            ref={(n) => {
              triggers.current[i] = n;
            }}
            onClick={() => setOpenIndex(i)}
            aria-label={`${t.video.play}: ${reel.title}`}
          >
            <img src={reel.poster} alt="" width={reel.width} height={reel.height} loading="lazy" decoding="async" />
            <span className="reel-tag">{reel.tag}</span>
            <span className="reel-play" aria-hidden="true">▶</span>
            <span className="reel-time" aria-hidden="true">{formatDuration(reel.duration)}</span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="reel-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className={`reel-stage ${active.orientation}`}>
            <video key={active.slug} src={active.src} poster={active.poster} controls autoPlay playsInline preload="metadata" />
            <div className="reel-bar">
              <div>
                <b>{active.title}</b>
                <small>
                  {active.tag} · {formatDuration(active.duration)}
                </small>
              </div>
              {reels.length > 1 ? (
                <div className="reel-nav">
                  <button type="button" onClick={() => step(-1)} aria-label={t.video.prev}>←</button>
                  <span>
                    {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label={t.video.next}>→</button>
                </div>
              ) : null}
            </div>
          </div>
          <button type="button" className="reel-close" onClick={close} ref={closeRef} aria-label={t.video.close}>
            ✕
          </button>
        </div>
      ) : null}
    </>
  );
}
