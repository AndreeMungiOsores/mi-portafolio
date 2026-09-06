"use client";

import { useCallback, useRef, useState } from "react";

export function CompareSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Después",
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div
      className="compare-slider"
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="compare-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.alt} draggable={false} />
      </div>
      <div className="compare-layer compare-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.src} alt={before.alt} draggable={false} />
      </div>

      <span className="compare-tag compare-tag-left">{beforeLabel}</span>
      <span className="compare-tag compare-tag-right">{afterLabel}</span>

      <div
        className="compare-handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Arrastra para comparar antes y después"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
      >
        <span className="compare-handle-grip">↔</span>
      </div>
    </div>
  );
}
