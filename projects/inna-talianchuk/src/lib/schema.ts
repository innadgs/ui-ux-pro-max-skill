import { absoluteUrl } from "./seo";
import type { Locale } from "@/i18n/routing";

const PERSON_NAME = "Inna Talianchuk";
const JOB_TITLE = "Digital Systems Strategist & AI Business Orchestrator";

export function buildPersonSchema(
  locale: Locale,
  extra?: { image?: string; knowsAbout?: string[] },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    jobTitle: JOB_TITLE,
    url: absoluteUrl(locale),
    ...(extra?.image ? { image: extra.image } : {}),
    ...(extra?.knowsAbout?.length ? { knowsAbout: extra.knowsAbout } : {}),
  };
}

const SERVICE_TYPES = [
  "Business Systems Design",
  "Marketing Systems",
  "AI & Automation",
  "Project Management & Operations",
  "Premium Websites & Digital Experience",
];

export function buildProfessionalServiceSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: PERSON_NAME,
    description: JOB_TITLE,
    url: absoluteUrl(locale),
    provider: {
      "@type": "Person",
      name: PERSON_NAME,
    },
    serviceType: SERVICE_TYPES,
    availableLanguage: ["de", "en", "uk", "ru"],
  };
}

export function buildWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PERSON_NAME,
    url: absoluteUrl(locale),
    inLanguage: locale,
  };
}

export function buildBreadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function buildServiceSchema(
  locale: Locale,
  service: { name: string; description: string; path: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(locale, service.path),
    provider: {
      "@type": "Person",
      name: PERSON_NAME,
    },
    areaServed: "Worldwide",
    availableLanguage: ["de", "en", "uk", "ru"],
  };
}

export function buildItemListSchema(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}

/** Only use this where the same Q&A pairs are actually visible on the page. */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
