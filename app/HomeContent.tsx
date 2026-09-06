"use client";

import { Fragment } from "react";
import Link from "next/link";
import projectsData from "../data/projects.json";
import { ProjectGallery, type GallerySlide } from "./ProjectGallery";
import { TiltVisual } from "./TiltVisual";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { useLanguage } from "./i18n";

type CarouselImage = { src: string; alt: string; label: string };

type ProjectTranslation = { eyebrow: string; lead: string; impact: string; stack: string[] };

type Project = {
  number: string;
  title: string;
  eyebrow: string;
  lead: string;
  tone: string;
  order: number;
  challenge: string;
  solution: string;
  impact: string;
  stack: string[];
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  carousel?: CarouselImage[];
  en?: ProjectTranslation;
};

const projects = projectsData as Project[];

const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

/** Rotación de composición por tarjeta: texto-arriba, imagen-arriba, lado a lado. */
const CARD_LAYOUTS = ["top", "bottom", "split"] as const;

const EUROBRACES_COMPARE: GallerySlide = {
  type: "compare",
  label: "Comparador antes/después",
  before: { src: "/projects/compare/eurobraces-apinados-antes.webp", alt: "Dientes apiñados antes del tratamiento" },
  after: { src: "/projects/compare/eurobraces-apinados-despues.webp", alt: "Sonrisa alineada después del tratamiento" },
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.carousel) {
    const slides: GallerySlide[] = project.carousel.map((slide) =>
      project.title === "EuroBraces Center" && slide.label === "Comparador antes/después"
        ? EUROBRACES_COMPARE
        : { type: "image", src: slide.src, alt: slide.alt, label: slide.label },
    );

    return <ProjectGallery slides={slides} title={project.title} />;
  }

  if (project.image) {
    return (
      <TiltVisual
        className={`project-visual clean-visual ${project.tone}`}
        src={project.image}
        alt={project.imageAlt ?? ""}
        tilt={project.title !== "CRM WhatsApp" && project.title !== "QR Router"}
      />
    );
  }

  return null;
}

function projectText(project: Project, lang: string): ProjectTranslation {
  if (lang === "en" && project.en) return project.en;
  return { eyebrow: project.eyebrow, lead: project.lead, impact: project.impact, stack: project.stack };
}

export function HomeContent() {
  const { lang, t } = useLanguage();

  return (
    <main className="snap-page">
      <SiteNav active="home" />

      <header className="hero shell" id="inicio">
        <h1>
          {t.heroH1Line1}
          {" "}
          {t.heroH1Line2}
          <span>{t.heroH1Span}</span>
        </h1>
        <div className="hero-bottom">
          <p>{t.heroBody}</p>
          <a href="#sobre-mi" className="round-link" aria-label={t.heroDownAria}>↓</a>
        </div>
        <div className="hero-strip" aria-label={t.aboutFactsAria}>
          {t.heroStrip.map((item, i) => (
            <Fragment key={item}>
              <span>{item}</span>
              {i < t.heroStrip.length - 1 && <i />}
            </Fragment>
          ))}
        </div>
      </header>

      <section className="about shell" id="sobre-mi">
        <div className="about-visual">
          <div className="portrait-bubble">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/andree-profile.png" alt="Retrato de Andree Mungi" />
          </div>
          <div className="cat-bubble">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/andree-cat.png" alt="El gato de Andree" />
          </div>
          <div className="about-orbit" aria-hidden="true" />
          <span className="about-visual-label">{t.aboutVisualLabel}</span>
          <span className="cat-label">{t.catLabel}</span>
        </div>
        <div className="about-content">
          <span className="section-index">{t.aboutIndex}</span>
          <p className="about-kicker">{t.aboutKicker}</p>
          <h2>
            {t.aboutH2Pre}
            <strong>{t.aboutH2Strong1}</strong>
            {t.aboutH2Mid}
            <strong>{t.aboutH2Strong2}</strong>
            {t.aboutH2Post}
          </h2>
          <p className="about-copy">
            {t.aboutCopyPre}
            <strong>{t.aboutCopyStrong1}</strong>
            {t.aboutCopyMid}
            <strong>{t.aboutCopyStrong2}</strong>
            {t.aboutCopyPost}
            <strong>{t.aboutCopyStrong3}</strong>
            {t.aboutCopyEnd}
          </p>
          <p className="about-personal">
            {t.aboutPersonalPre}
            <strong>{t.aboutPersonalStrong}</strong>
            {t.aboutPersonalPost}
          </p>
          <div className="about-facts" aria-label={t.aboutFactsAria}>
            {t.aboutFacts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="projects shell" id="proyectos">
        <div className="section-intro">
          <span className="section-index">{t.projectsIndex}</span>
          <h2>
            {t.projectsH2[0]}
            <br />
            {t.projectsH2[1]}
          </h2>
          <p>{t.projectsBody}</p>
        </div>

        <div className="project-list">
          {orderedProjects.map((project, index) => {
            const displayNumber = String(index + 1).padStart(2, "0");
            const layout = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
            const text = projectText(project, lang);

            return (
            <article
              className={`project-card layout-${layout} tone-${project.tone}`}
              id={`proyecto-${displayNumber}`}
              key={project.title}
            >
              <div className="project-heading">
                <span className="project-number">{displayNumber}</span>
                <div>
                  <p className="project-eyebrow">{text.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-lead">{text.lead}</p>
                  <p className="project-impact">{text.impact}</p>
                  <div className="project-tags">
                    {text.stack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      className="project-live-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.liveLink}
                    </a>
                  )}
                </div>
              </div>
              <ProjectVisual project={project} />
            </article>
            );
          })}
        </div>
      </section>

      <section className="video-feature shell" id="videos-ia">
        <div className="video-feature-card">
          <div className="video-feature-content">
            <span className="section-index">{t.videoIndex}</span>
            <h2>
              {t.videoH2Pre}
              <span>{t.videoH2Span}</span>
            </h2>
            <p>{t.videoBody}</p>
            <div className="video-feature-pills" aria-label={t.videoPillsAria}>
              {t.videoPills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
            <Link className="video-feature-btn" href="/servicios/videos">
              {t.videoBtn}
            </Link>
          </div>
          <div className="video-feature-visual" aria-hidden="true">
            <div className="video-feature-badge">
              <b>{t.videoBadgeB}</b>
              <small>{t.videoBadgeSmall}</small>
            </div>
            <div className="video-feature-preview">
              <span>{t.videoPreviewSpan}</span>
              <p>{t.videoPreviewP}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities shell">
        <span className="section-index">{t.capsIndex}</span>
        <div className="capability-grid">
          <h2>{t.capsH2}</h2>
          <div className="capability-list">
            {t.caps.map((cap) => (
              <span key={cap}>{cap}</span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
