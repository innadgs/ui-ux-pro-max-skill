import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";

/**
 * Placeholder production domain. Replace with the real domain (and set
 * NEXT_PUBLIC_SITE_URL in the deployment environment) before launch.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://inna-talianchuk.example.com";

export function absoluteUrl(locale: Locale, path = "") {
  const normalizedPath = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${normalizedPath}`;
}

/**
 * Builds the alternates.languages map (all locales + x-default) for a given
 * locale-agnostic path, e.g. "/services" or "/" for the homepage.
 */
export function buildLanguageAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(defaultLocale, path);
  return languages;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  ogImage,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Inna Talianchuk",
      locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
