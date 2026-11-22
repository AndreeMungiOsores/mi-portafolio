import type { Metadata } from "next";
import { WebContent } from "./WebContent";

export const metadata: Metadata = {
  title: "Páginas web",
  description:
    "Diseño y desarrollo de landings, sitios corporativos y aplicaciones web a medida, con hosting, dominio y analítica listos.",
  alternates: { canonical: "/servicios/web" },
  openGraph: {
    title: "Páginas web · Mungi lat",
    description: "Landings, sitios corporativos y aplicaciones web a medida: rápidos, medibles y fáciles de actualizar.",
  },
};

export default function WebPage() {
  return <WebContent />;
}
