import projectsData from "../../data/projects.json";
import type { Lang } from "../i18n";
import { LABELS_EN } from "../copy";

export type CarouselImage = { src: string; alt: string; label: string };

type CaseText = { eyebrow: string; lead: string; impact: string; stack: string[]; challenge: string; solution: string };

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  order: number;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  carousel?: CarouselImage[];
  eyebrow: string;
  lead: string;
  impact: string;
  stack: string[];
  challenge: string;
  solution: string;
  en: CaseText;
};

export const cases = (projectsData as unknown as CaseStudy[]).slice().sort((a, b) => a.order - b.order);

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function caseText(c: CaseStudy, lang: Lang): CaseText {
  return lang === "en" ? c.en : c;
}

/** Imágenes del caso (carrusel o imagen única), con la etiqueta en el idioma activo. */
export function caseSlides(c: CaseStudy, lang: Lang): CarouselImage[] {
  const base: CarouselImage[] = c.carousel ?? (c.image ? [{ src: c.image, alt: c.imageAlt ?? "", label: c.title }] : []);
  return base.map((s) => ({ ...s, label: lang === "en" ? (LABELS_EN[s.label] ?? s.label) : s.label }));
}

export function coverOf(c: CaseStudy): string {
  // Portada: la captura más "de producto" disponible (evita las imágenes generadas con IA del carrusel).
  const preferred: Record<string, string> = {
    "eurobraces-center": "/projects/eurobraces-home-hero.webp",
    "clickenla-bio": "/projects/clickenlabio-landing.webp",
    plazaderma: "/projects/blissmap-public-map.webp",
    "crm-whatsapp": c.image ?? "",
  };
  return preferred[c.slug] ?? c.carousel?.[0]?.src ?? c.image ?? "";
}
