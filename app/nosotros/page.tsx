import type { Metadata } from "next";
import { NosotrosContent } from "./NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros y contacto",
  description:
    "Somos Mungi lat: software a medida, automatización, webs y video con IA para negocios que quieren dar el salto digital. Escríbenos por WhatsApp.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
