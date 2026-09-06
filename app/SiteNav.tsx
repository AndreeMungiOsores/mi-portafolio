"use client";

import Link from "next/link";
import { useLanguage } from "./i18n";

export type NavKey = "home" | "videos" | "web";

export function SiteNav({ active = "home" }: { active?: NavKey }) {
  const { lang, t, toggle } = useLanguage();

  const TABS = [{ key: "videos", href: "/servicios/videos", label: t.navVideos }] as const;

  return (
    <nav className="nav" aria-label={t.navAria}>
      <div className="nav-inner shell">
        <Link
          className="brand"
          href={active === "home" ? "#inicio" : "/"}
          aria-label={t.backHomeAria}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/andree-profile.png" alt="" />
          <span className="brand-name">
            <span className="brand-name-full">{t.brandFull}</span>
            <span className="brand-name-short">{t.brandShort}</span>
          </span>
        </Link>

        <div className="nav-links">
          {active === "home" ? (
            <>
              <a href="#sobre-mi">{t.navAbout}</a>
              <a href="#proyectos">{t.navProjects}</a>
            </>
          ) : (
            <Link href="/">{t.navPortfolio}</Link>
          )}

          {TABS.map((tab) => (
            <Link
              key={tab.key}
              className={`nav-tab${active === tab.key ? " active" : ""}`}
              href={tab.href}
              aria-current={active === tab.key ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}

          <button
            type="button"
            className="lang-toggle"
            onClick={toggle}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a className="nav-cta" href="#contacto">
            {t.navCta}
          </a>
        </div>
      </div>
    </nav>
  );
}
