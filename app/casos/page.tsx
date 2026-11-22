import type { Metadata } from "next";
import { CasosContent } from "./CasosContent";

export const metadata: Metadata = {
  title: "Casos",
  description:
    "Ocho proyectos reales: CRM, paneles de operaciones, automatización, productos digitales y sitios web a medida, con capturas, stack y resultados.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  return <CasosContent />;
}
