import type { Metadata } from "next";
import { Archivo, Syne } from "next/font/google";
import "./globals.css";
import { AnchorScrollFix } from "./AnchorScrollFix";
import { LanguageProvider } from "./i18n";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mungi.lat"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Andree — Portafolio de software",
    template: "%s · Andree",
  },
  description:
    "Productos digitales, automatización y sistemas construidos para resolver problemas reales.",
  keywords: ["desarrollo de software", "automatización", "productos digitales", "Perú", "Andree Mungi"],
  authors: [{ name: "Andree Mungi", url: "https://www.mungi.lat" }],
  creator: "Andree Mungi",
  openGraph: {
    title: "Andree — Portafolio de software",
    description: "Productos digitales, automatización y sistemas que sí se usan.",
    url: "/",
    siteName: "Andree — Portafolio de software",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/social-preview.png",
        width: 1730,
        height: 909,
        alt: "Portafolio de software, automatización y productos digitales de Andree Mungi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andree — Portafolio de software",
    description: "Productos digitales, automatización y sistemas que sí se usan.",
    images: ["/social-preview.png"],
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
        <LanguageProvider>
          <AnchorScrollFix />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
