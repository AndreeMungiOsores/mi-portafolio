import type { Metadata } from "next";
import { ServiciosContent } from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Software a medida, automatización de procesos, páginas web y video con IA: cuatro servicios para que tu negocio trabaje ordenado.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
