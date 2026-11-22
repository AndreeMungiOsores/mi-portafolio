import type { MetadataRoute } from "next";
import { cases } from "./lib/cases";

export const dynamic = "force-static";

const BASE = "https://www.mungi.lat";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/servicios", "/servicios/web", "/servicios/videos", "/casos", "/nosotros", ...cases.map((c) => `/casos/${c.slug}`)];
  return pages.map((p) => ({ url: BASE + p, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
