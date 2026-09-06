"use client";

import { useRef, useState } from "react";
import { CompareSlider } from "./CompareSlider";
import { useTilt } from "./useTilt";

type ImageSlide = {
  type: "image";
  src: string;
  alt: string;
  label: string;
};

type CompareSlide = {
  type: "compare";
  label: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export type GallerySlide = ImageSlide | CompareSlide;

export function ProjectGallery({
  slides,
  title,
}: {
  slides: readonly GallerySlide[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: stageRef, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>();
  const active = slides[activeIndex];
  const hasMultiple = slides.length > 1;
  const touchStart = useRef<{ x: number; y: number; skip: boolean } | null>(null);

  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    const skip = !!(event.target as HTMLElement).closest(".compare-slider");
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, skip };
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || start.skip) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <figure className="project-visual gallery-visual" aria-label={`Galería de ${title}`}>
      <div
        className="gallery-stage"
        ref={stageRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div className={`gallery-frame${index === activeIndex ? " is-active" : ""}`} key={slide.label}>
            {slide.type === "compare" ? (
              <CompareSlider before={slide.before} after={slide.after} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" />
            )}
          </div>
        ))}

        {hasMultiple && (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-prev"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Vista anterior"
            >
              ←
            </button>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-next"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Vista siguiente"
            >
              →
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="gallery-meta">
          <span className="gallery-caption">{active.label}</span>
          <div className="gallery-dots" aria-label="Seleccionar vista">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.label}
                className={index === activeIndex ? "active" : ""}
                onClick={() => goTo(index)}
                aria-label={`Ver ${slide.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </figure>
  );
}
