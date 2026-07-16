import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * Heading/display serif. The brief specified Instrument Serif, but that
 * family ships Latin/Latin-ext glyphs only — no Cyrillic — which would
 * silently break de/uk headings across two of the four required locales.
 * Cormorant Garamond is the closest editorial/high-contrast sibling with
 * full Cyrillic + Latin coverage, used uniformly across all locales so
 * typography stays identical de/en/uk/ru per the brief.
 */
export const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
