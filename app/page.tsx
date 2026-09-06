import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Andree — Portafolio de software",
  description:
    "Productos digitales, automatización y sistemas construidos para resolver problemas reales.",
};

export default function Home() {
  return <HomeContent />;
}
