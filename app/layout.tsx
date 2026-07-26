import type { Metadata } from "next";
import { Archivo, Syne } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andree-software-portfolio.blisscorp-3376.chatgpt.site"),
  title: {
    default: "Andree — Portafolio de software",
    template: "%s · Andree",
  },
  description:
    "Productos digitales, automatización y sistemas construidos para resolver problemas reales.",
  openGraph: {
    title: "Andree — Portafolio de software",
    description: "Productos digitales, automatización y sistemas que sí se usan.",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Portafolio de software de Andree" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andree — Portafolio de software",
    description: "Productos digitales, automatización y sistemas que sí se usan.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${archivo.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  );
}
