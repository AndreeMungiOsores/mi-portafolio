import type { Metadata } from "next";
import { VideosContent } from "./VideosContent";

export const metadata: Metadata = {
  title: "Videos publicitarios con IA",
  description:
    "Producción de reels y anuncios en video generados con Inteligencia Artificial: guion persuasivo, avatares y voces hiperrealistas, edición dinámica y entrega rápida.",
  alternates: { canonical: "/servicios/videos" },
  openGraph: {
    title: "Videos publicitarios con IA · Mungi lat",
    description:
      "Anuncios y reels de alto impacto generados con Inteligencia Artificial. Menor costo, entrega en 48-72h y listos para pautar en redes.",
  },
};

export default function VideosPage() {
  return <VideosContent />;
}
