"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Reel } from "./reels";

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : `0:${String(secs).padStart(2, "0")}`;
}

export function ReelGrid({ reels }: { reels: readonly Reel[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + reels.length) % reels.length,
      ),
    [reels.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : reels[openIndex];

  return (
    <>
      <div className="reel-grid">
        {reels.map((reel, index) => (
          <button
            type="button"
            className={`reel-card ${reel.orientation}`}
            key={reel.slug}
            ref={(node) => {
              triggerRefs.current[index] = node;
            }}
            onClick={() => setOpenIndex(index)}
            aria-label={`Reproducir ${reel.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reel.poster}
              alt=""
              width={reel.width}
              height={reel.height}
              loading="lazy"
              decoding="async"
            />
            <span className="reel-play" aria-hidden="true">
              ▶
            </span>
            <span className="reel-time" aria-hidden="true">
              {formatDuration(reel.duration)}
            </span>
            <span className="reel-info">
              <b>{reel.title}</b>
              <small>{reel.tag}</small>
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="reel-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className={`reel-stage ${active.orientation}`}>
            <video
              key={active.slug}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
            <div className="reel-stage-bar">
              <div>
                <b>{active.title}</b>
                <small>
                  {active.tag} · {formatDuration(active.duration)}
                </small>
              </div>
              {reels.length > 1 ? (
                <div className="reel-stage-nav">
                  <button type="button" onClick={() => step(-1)} aria-label="Video anterior">
                    ←
                  </button>
                  <span>
                    {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(reels.length).padStart(2, "0")}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label="Video siguiente">
                    →
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <button type="button" className="reel-close" onClick={close} ref={closeRef} aria-label="Cerrar">
            ✕
          </button>
        </div>
      ) : null}
    </>
  );
}
