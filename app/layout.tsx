import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";

const ui = Instrument_Sans({ variable: "--font-ui", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });
const logo = Libre_Franklin({ variable: "--font-logo", subsets: ["latin"], weight: ["400", "800"] });

const TITLE = "Mungi lat — Software a medida, automatización y web";
const DESCRIPTION =
  "Software a medida, automatización de procesos, páginas web y video con IA para negocios que quieren trabajar ordenados y verse profesionales.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mungi.lat"),
  alternates: { canonical: "/" },
  title: { default: TITLE, template: "%s · Mungi lat" },
  description: DESCRIPTION,
  keywords: ["software a medida", "automatización", "páginas web", "CRM", "ERP", "video con IA", "Perú", "Mungi lat"],
  authors: [{ name: "Mungi lat", url: "https://www.mungi.lat" }],
  creator: "Mungi lat",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Mungi lat",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mungi lat: software a medida, automatización y web" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#F3F7FF" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${ui.variable} ${mono.variable} ${logo.variable}`}>
      <body>
        <LanguageProvider>
          <SiteNav />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
