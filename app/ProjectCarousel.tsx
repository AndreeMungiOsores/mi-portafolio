"use client";

import { useEffect, useRef, useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
  label: string;
};

export function ProjectCarousel({
  images,
  title,
}: {
  images: readonly CarouselImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const nextIndex = (index + images.length) % images.length;
    const track = trackRef.current;
    const slide = track?.children.item(nextIndex) as HTMLElement | null;

    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const index = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { root: track, threshold: [0.55, 0.8] },
    );

    Array.from(track.children).forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="project-visual carousel-visual red" aria-label={`Galería de ${title}`}>
      <div className="carousel-topline">
        <span>{title} · producto</span>
        <div className="carousel-count" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {images.map((image, index) => (
          <div className="carousel-slide" data-index={index} key={image.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} />
            <span>{image.label}</span>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Imagen anterior">
          ←
        </button>
        <div className="carousel-dots" aria-label="Seleccionar captura">
          {images.map((image, index) => (
            <button
              type="button"
              className={index === activeIndex ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`Ver ${image.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
              key={image.src}
            />
          ))}
        </div>
        <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Imagen siguiente">
          →
        </button>
      </div>
    </figure>
  );
}
