import Link from "next/link";

export type NavKey = "home" | "videos" | "web";

const TABS = [
  { key: "videos", href: "/servicios/videos", label: "Videos" },
] as const;

export function SiteNav({ active = "home" }: { active?: NavKey }) {
  return (
    <nav className="nav shell" aria-label="Navegación principal">
      <Link
        className="brand"
        href={active === "home" ? "#inicio" : "/"}
        aria-label="Volver al inicio"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/andree-profile.png" alt="" />
        <span className="brand-name">
          <span className="brand-name-full">Portafolio de Andree Mungi</span>
          <span className="brand-name-short">Andree Mungi</span>
        </span>
      </Link>

      <div className="nav-links">
        {active === "home" ? (
          <>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#proyectos">Proyectos</a>
          </>
        ) : (
          <Link href="/">Portafolio</Link>
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

        <a className="nav-cta" href="#contacto">
          Conversemos ↗
        </a>
      </div>
    </nav>
  );
}
