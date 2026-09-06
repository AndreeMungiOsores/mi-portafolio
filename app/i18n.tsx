"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en";

export type Strings = {
  navAbout: string;
  navProjects: string;
  navVideos: string;
  navPortfolio: string;
  navCta: string;
  brandFull: string;
  brandShort: string;
  heroH1Line1: string;
  heroH1Line2: string;
  heroH1Span: string;
  heroBody: string;
  heroDownAria: string;
  heroStrip: string[];
  aboutIndex: string;
  aboutKicker: string;
  aboutH2Pre: string;
  aboutH2Strong1: string;
  aboutH2Mid: string;
  aboutH2Strong2: string;
  aboutH2Post: string;
  aboutCopyPre: string;
  aboutCopyStrong1: string;
  aboutCopyMid: string;
  aboutCopyStrong2: string;
  aboutCopyPost: string;
  aboutCopyStrong3: string;
  aboutCopyEnd: string;
  aboutPersonalPre: string;
  aboutPersonalStrong: string;
  aboutPersonalPost: string;
  aboutFacts: string[];
  aboutFactsAria: string;
  aboutVisualLabel: string;
  catLabel: string;
  projectsIndex: string;
  projectsH2: string[];
  projectsBody: string;
  liveLink: string;
  videoIndex: string;
  videoH2Pre: string;
  videoH2Span: string;
  videoBody: string;
  videoPillsAria: string;
  videoPills: string[];
  videoBtn: string;
  videoBadgeB: string;
  videoBadgeSmall: string;
  videoPreviewSpan: string;
  videoPreviewP: string;
  capsIndex: string;
  capsH2: string;
  caps: string[];
  footerKicker: string;
  footerHeadlineLine1: string;
  footerHeadlineLine2: string;
  whatsappSmall: string;
  whatsappB: string;
  whatsappAria: string;
  footerNote: string;
  backToTop: string;
  navAria: string;
  backHomeAria: string;
};

const STRINGS: Record<Lang, Strings> = {
  es: {
    navAbout: "Sobre mí",
    navProjects: "Proyectos",
    navVideos: "Videos",
    navPortfolio: "Portafolio",
    navCta: "Conversemos ↗",
    brandFull: "Portafolio de Andree Mungi",
    brandShort: "Andree Mungi",
    heroH1Line1: "Herramientas digitales",
    heroH1Line2: "construidas para resolver",
    heroH1Span: " problemas reales.",
    heroBody:
      "Desarrollador full-stack y automatizador. Ayudo a negocios a digitalizar procesos con tecnología rápida, segura y a medida.",
    heroDownAria: "Ir a la sección sobre mí",
    heroStrip: ["PRODUCTO DIGITAL", "AUTOMATIZACIÓN", "FULL-STACK", "IA + DATOS"],
    aboutIndex: "01 / SOBRE MÍ",
    aboutKicker: "Hola, soy Andree Mungi.",
    aboutH2Pre: "Te ayudo a dar el ",
    aboutH2Strong1: "salto",
    aboutH2Mid: " a la ",
    aboutH2Strong2: "digitalización",
    aboutH2Post: " de tu empresa.",
    aboutCopyPre: "Soy egresado de ",
    aboutCopyStrong1: "Ingeniería Mecatrónica de UTEC",
    aboutCopyMid: " y llevo ",
    aboutCopyStrong2: "más de dos años",
    aboutCopyPost:
      " desarrollando soluciones de software. Ayudo a empresas a transformar sus procesos, competir mejor y abrir nuevas oportunidades con ",
    aboutCopyStrong3: "tecnología hecha a su medida",
    aboutCopyEnd: ".",
    aboutPersonalPre: "Trabajo desde ",
    aboutPersonalStrong: "Perú",
    aboutPersonalPost:
      ", disfruto unir software y hardware y, cuando cierro la laptop, probablemente estoy pasando tiempo con mi gato.",
    aboutFacts: ["UTEC · Ing. Mecatrónica", "2+ años en software", "Perú"],
    aboutFactsAria: "Datos sobre Andree",
    aboutVisualLabel: "INGENIERÍA + PRODUCTO",
    catLabel: "MI COMPAÑERO DE IDEAS",
    projectsIndex: "02 / TRABAJO SELECCIONADO",
    projectsH2: ["Ocho proyectos.", "Ocho problemas reales resueltos."],
    projectsBody:
      "Cada caso combina criterio de producto, interfaz, arquitectura y ejecución. El foco no está en mostrar código: está en explicar la decisión y el valor creado.",
    liveLink: "Ver sitio en vivo ↗",
    videoIndex: "03 / PRODUCCIÓN AUDIOVISUAL CON IA",
    videoH2Pre: "¿Quieres vender más con video sin gastar en rodajes?",
    videoH2Span: " Creo anuncios con Inteligencia Artificial.",
    videoBody:
      "Produzco reels y spots optimizados para captar atención en los primeros 3 segundos: guiones persuasivos, avatares y voces hiperrealistas, edición dinámica y entrega lista para pautar en 48 a 72 horas.",
    videoPillsAria: "Beneficios de producción de video con IA",
    videoPills: [
      "✓ -70% de costo vs rodaje tradicional",
      "✓ Entrega en 48-72 horas",
      "✓ Variantes A/B para Meta & TikTok Ads",
    ],
    videoBtn: "Ver galería y piezas con IA ↗",
    videoBadgeB: "100% IA",
    videoBadgeSmall: "Producción ágil y medible",
    videoPreviewSpan: "9:16 + 1:1",
    videoPreviewP: "Reels · TikToks · Ads",
    capsIndex: "04 / CAPACIDADES",
    capsH2: "Producto, tecnología y operación en una sola conversación.",
    caps: [
      "Aplicaciones web full-stack",
      "Automatización de procesos",
      "Dashboards y analítica",
      "Integraciones y APIs",
      "Bases de datos y ETL",
      "Prototipos funcionales",
    ],
    footerKicker: "¿Tienes un proceso que debería funcionar mejor?",
    footerHeadlineLine1: "Construyamos",
    footerHeadlineLine2: "la solución.",
    whatsappSmall: "HABLEMOS POR WHATSAPP",
    whatsappB: "Mandar mensaje",
    whatsappAria: "Mandar un mensaje a Andree por WhatsApp",
    footerNote: "Disponible para proyectos de producto, automatización y software a medida.",
    backToTop: "Volver arriba ↑",
    navAria: "Navegación principal",
    backHomeAria: "Volver al inicio",
  },
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navVideos: "Videos",
    navPortfolio: "Portfolio",
    navCta: "Let's talk ↗",
    brandFull: "Andree Mungi — Software Portfolio",
    brandShort: "Andree Mungi",
    heroH1Line1: "Digital tools",
    heroH1Line2: "built to solve",
    heroH1Span: " real problems.",
    heroBody:
      "Full-stack developer and automation specialist. I help businesses digitize processes with fast, secure, custom-built technology.",
    heroDownAria: "Go to the about section",
    heroStrip: ["DIGITAL PRODUCT", "AUTOMATION", "FULL-STACK", "AI + DATA"],
    aboutIndex: "01 / ABOUT",
    aboutKicker: "Hi, I'm Andree Mungi.",
    aboutH2Pre: "I help you take the ",
    aboutH2Strong1: "leap",
    aboutH2Mid: " into your company's ",
    aboutH2Strong2: "digital transformation",
    aboutH2Post: ".",
    aboutCopyPre: "I graduated in ",
    aboutCopyStrong1: "Mechatronics Engineering from UTEC",
    aboutCopyMid: " and have spent ",
    aboutCopyStrong2: "more than two years",
    aboutCopyPost:
      " building software solutions. I help companies transform their processes, compete better, and open new opportunities with ",
    aboutCopyStrong3: "technology built around them",
    aboutCopyEnd: ".",
    aboutPersonalPre: "I work from ",
    aboutPersonalStrong: "Peru",
    aboutPersonalPost:
      ", enjoy blending software and hardware, and when I close the laptop I'm probably spending time with my cat.",
    aboutFacts: ["UTEC · Mechatronics Eng.", "2+ years in software", "Peru"],
    aboutFactsAria: "Facts about Andree",
    aboutVisualLabel: "ENGINEERING + PRODUCT",
    catLabel: "MY THINKING PARTNER",
    projectsIndex: "02 / SELECTED WORK",
    projectsH2: ["Eight projects.", "Eight real problems solved."],
    projectsBody:
      "Each case combines product judgment, interface, architecture, and execution. The focus isn't showing code — it's explaining the decision and the value created.",
    liveLink: "View live site ↗",
    videoIndex: "03 / AI VIDEO PRODUCTION",
    videoH2Pre: "Want to sell more with video without spending on shoots?",
    videoH2Span: " I create ads with Artificial Intelligence.",
    videoBody:
      "I produce reels and spots optimized to grab attention in the first 3 seconds: persuasive scripts, hyperrealistic avatars and voices, dynamic editing, and delivery ready to run ads in 48-72 hours.",
    videoPillsAria: "Benefits of AI video production",
    videoPills: [
      "✓ -70% cost vs. traditional shoots",
      "✓ Delivery in 48-72 hours",
      "✓ A/B variants for Meta & TikTok Ads",
    ],
    videoBtn: "See the AI gallery ↗",
    videoBadgeB: "100% AI",
    videoBadgeSmall: "Fast, measurable production",
    videoPreviewSpan: "9:16 + 1:1",
    videoPreviewP: "Reels · TikToks · Ads",
    capsIndex: "04 / CAPABILITIES",
    capsH2: "Product, technology, and operations in one conversation.",
    caps: [
      "Full-stack web applications",
      "Process automation",
      "Dashboards and analytics",
      "Integrations and APIs",
      "Databases and ETL",
      "Functional prototypes",
    ],
    footerKicker: "Got a process that should work better?",
    footerHeadlineLine1: "Let's build",
    footerHeadlineLine2: "the solution.",
    whatsappSmall: "LET'S TALK ON WHATSAPP",
    whatsappB: "Send a message",
    whatsappAria: "Send Andree a message on WhatsApp",
    footerNote: "Available for product, automation, and custom software projects.",
    backToTop: "Back to top ↑",
    navAria: "Main navigation",
    backHomeAria: "Back to home",
  },
};

const LanguageContext = createContext<{
  lang: Lang;
  t: Strings;
  toggle: () => void;
}>({ lang: "es", t: STRINGS.es, toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    // One-time hydration from localStorage: unavailable during SSR, so the
    // default render is always "es" and this reconciles it after mount.
    const saved = window.localStorage.getItem("lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((current) => {
      const next = current === "es" ? "en" : "es";
      window.localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t: STRINGS[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
