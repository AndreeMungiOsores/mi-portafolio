"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COPY, type Copy } from "./copy";

export type Lang = "es" | "en";

const LanguageContext = createContext<{ lang: Lang; t: Copy; toggle: () => void }>({
  lang: "es",
  t: COPY.es,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    // El render inicial siempre es "es" (SSR); aquí se reconcilia con la preferencia guardada.
    const saved = window.localStorage.getItem("lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () =>
    setLang((current) => {
      const next = current === "es" ? "en" : "es";
      window.localStorage.setItem("lang", next);
      return next;
    });

  return <LanguageContext.Provider value={{ lang, t: COPY[lang], toggle }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
