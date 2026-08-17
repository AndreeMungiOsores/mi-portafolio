import manifest from "./manifest.json";

/**
 * ✏️ AQUÍ SE EDITAN LOS TEXTOS DE CADA VIDEO.
 *
 * Las dimensiones, el peso y el poster salen de `manifest.json`, que se
 * regenera solo al correr `npm run videos`. Este archivo es lo único que se
 * escribe a mano: título, etiqueta y una línea de contexto por pieza.
 *
 * - `title`   nombre de la pieza o de la campaña.
 * - `tag`     categoría corta que se pinta sobre el video.
 * - `caption` una frase sobre el objetivo o el resultado. Si la dejas vacía,
 *             simplemente no se muestra.
 */
type ReelCopy = {
  title: string;
  tag: string;
  caption?: string;
};

const COPY: Record<string, ReelCopy> = {
  "reel-0108": { title: "Pieza 01", tag: "Reel vertical" },
  "reel-0118": { title: "Pieza 02", tag: "Reel vertical" },
  "reel-0127": { title: "Pieza 03", tag: "Reel vertical" },
  "reel-0204": { title: "Pieza 04", tag: "Reel vertical" },
  "reel-0217": { title: "Pieza 05", tag: "Reel vertical" },
  "reel-0723": { title: "Pieza 06", tag: "Reel vertical" },
  "reel-0731": { title: "Pieza 07", tag: "Anuncio 30s" },
  "reel-0804": { title: "Pieza 08", tag: "Anuncio 30s" },
  "tiktok": { title: "Pieza 09", tag: "TikTok" },
  "publicidad-modificado-ceba": {
    title: "Publicidad CEBA",
    tag: "Spot horizontal",
  },
};

export type Reel = (typeof manifest)[number] & ReelCopy;

export const reels: Reel[] = manifest.map((entry) => ({
  ...entry,
  ...(COPY[entry.slug] ?? { title: entry.slug, tag: "Video" }),
}));

export const verticalReels = reels.filter(
  (reel) => reel.orientation === "vertical",
);
export const horizontalReels = reels.filter(
  (reel) => reel.orientation === "horizontal",
);

export const totalSeconds = reels.reduce((sum, reel) => sum + reel.duration, 0);
