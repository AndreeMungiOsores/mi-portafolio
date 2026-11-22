"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useRef, useState } from "react";
import { useLanguage } from "../i18n";

export function CompareSlider({
  before,
  after,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}) {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      className="compare-slider"
      ref={trackRef}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <div className="compare-layer">
        <img src={after.src} alt={after.alt} draggable={false} />
      </div>
      <div className="compare-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before.src} alt={before.alt} draggable={false} />
      </div>
      <span className="compare-tag left">{t.caseDetail.before}</span>
      <span className="compare-tag right">{t.caseDetail.after}</span>
      <div
        className="compare-handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label={t.caseDetail.drag}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
        }}
      >
        <span>↔</span>
      </div>
    </div>
  );
}
