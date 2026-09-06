"use client";

import { useTilt } from "./useTilt";

export function TiltVisual({
  className,
  src,
  alt,
  tilt = true,
}: {
  className: string;
  src: string;
  alt: string;
  tilt?: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLElement>();

  return (
    <figure
      className={tilt ? className : `${className} no-tilt`}
      ref={tilt ? ref : undefined}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </figure>
  );
}
