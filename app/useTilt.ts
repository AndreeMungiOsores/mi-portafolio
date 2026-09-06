"use client";

import { useRef } from "react";

/** Inclinación 3D sutil que sigue el cursor; no-op en touch y con "prefers-reduced-motion". */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (event: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return { ref, onMouseMove, onMouseLeave };
}
