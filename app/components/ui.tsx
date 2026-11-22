/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { WHATSAPP_URL } from "../copy";

export type Pose = "saludando" | "senalando" | "pensando" | "preocupado" | "check";

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 58 58" aria-hidden="true">
        <rect width="38" height="38" fill="#0F1B2D" />
        <rect x="20" y="20" width="38" height="38" fill="#1F4FD8" />
        <rect x="20" y="20" width="18" height="18" fill="#0A1F66" />
      </svg>
      <span>
        Mungi <i>lat</i>
      </span>
    </span>
  );
}

export function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.04 3.2c-7.05 0-12.78 5.66-12.78 12.63 0 2.23.6 4.4 1.74 6.31L3.15 28.8l6.86-1.78a12.9 12.9 0 0 0 6.03 1.51c7.05 0 12.78-5.66 12.78-12.63S23.09 3.2 16.04 3.2Zm5.84 15.23c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.56-.95-.84-1.59-1.88-1.78-2.2-.19-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.68-.98-2.31-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.23 3.36 5.4 4.71.76.32 1.35.51 1.81.65.76.24 1.45.2 2 .12.61-.09 1.88-.76 2.15-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#1F4FD8" />
      <path d="M12 22.5l7 7 13-14" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** El Cubo sobre fondo blanco: `multiply` lo funde con el fondo claro de la página. */
export function Cubo({ pose, className = "", style }: { pose: Pose; className?: string; style?: CSSProperties }) {
  return (
    <img
      className={`cubo ${className}`}
      src={`/cubo/${pose}.webp`}
      alt=""
      aria-hidden="true"
      width={900}
      height={900}
      decoding="async"
      style={style}
    />
  );
}

/** Marco tipo navegador para capturas reales. */
export function Shot({ src, alt = "", priority = false }: { src: string; alt?: string; priority?: boolean }) {
  return (
    <div className="shot">
      <div className="shot-bar" aria-hidden="true">
        <b />
        <b />
        <b />
      </div>
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

export function SectionHead({ index, children, aside }: { index: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="head">
      <div>
        <div className="mono b">{index}</div>
        <h2>{children}</h2>
      </div>
      {aside ? <p>{aside}</p> : null}
    </div>
  );
}

export function WaButton({ children, variant = "p" }: { children: ReactNode; variant?: "p" | "w" }) {
  return (
    <a className={`btn ${variant}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
      <WaIcon />
      {children}
    </a>
  );
}

export function ButtonLink({ href, children, variant = "s" }: { href: string; children: ReactNode; variant?: "p" | "s" }) {
  return (
    <Link className={`btn ${variant}`} href={href}>
      {children}
    </Link>
  );
}
