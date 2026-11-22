"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";
import { WHATSAPP_URL } from "../copy";
import { Logo, WaIcon } from "./ui";

export function SiteNav() {
  const { lang, t, toggle } = useLanguage();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Cierra el menú móvil al navegar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/servicios", label: t.nav.services, match: "/servicios" },
    { href: "/casos", label: t.nav.cases, match: "/casos" },
    { href: "/servicios/videos", label: t.nav.video, match: "/servicios/videos" },
    { href: "/nosotros", label: t.nav.about, match: "/nosotros" },
  ];

  const isActive = (match: string) =>
    match === "/servicios"
      ? pathname.startsWith("/servicios") && !pathname.startsWith("/servicios/videos")
      : pathname.startsWith(match);

  return (
    <>
      <a className="skip" href="#contenido">
        {t.common.skip}
      </a>
      <nav className="nav" aria-label={t.nav.aria}>
        <div className="shell nav-inner">
          <Link href="/" aria-label={t.nav.home} className="nav-logo">
            <Logo />
          </Link>

          <div className={`links${open ? " open" : ""}`} id="menu-principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.match) ? "on" : undefined} aria-current={isActive(l.match) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="lang"
              onClick={toggle}
              aria-label={lang === "es" ? t.nav.toEnglish : t.nav.toSpanish}
            >
              {lang === "es" ? "ES · EN" : "EN · ES"}
            </button>
            <a className="btn p nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <WaIcon size={18} />
              {t.common.writeUs}
            </a>
          </div>

          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </nav>
    </>
  );
}
