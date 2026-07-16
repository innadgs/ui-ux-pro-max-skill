import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const SERVICE_SLUGS = {
  "business-systems-design": "businessSystemsDesign",
  "marketing-systems": "marketingSystems",
  "ai-automation": "aiAutomation",
  "project-management-operations": "projectManagementOperations",
  "premium-websites-digital-experience": "premiumWebsitesDigitalExperience",
} as const;

type Slug = keyof typeof SERVICE_SLUGS;
type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(SERVICE_SLUGS).map((slug) => ({ locale, slug })),
  );
}

function isValidSlug(slug: string): slug is Slug {
  return slug in SERVICE_SLUGS;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const key = SERVICE_SLUGS[slug];

  return buildMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: t(`${key}.name`),
    description: t(`${key}.short`),
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tPages = await getTranslations({ locale, namespace: "pages.services" });
  const tNav = await getTranslations({ locale, namespace: "common.nav" });
  const key = SERVICE_SLUGS[slug];

  return (
    <Section className="pt-12 md:pt-16">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tPages("title"), href: "/services" },
          { label: t(`${key}.name`) },
        ]}
      />
      <div className="mt-8">
        <SectionHeader level={1} heading={t(`${key}.name`)}>
          <p>{t(`${key}.short`)}</p>
        </SectionHeader>
        <p className="mt-10 text-text-secondary max-w-prose">
          <strong className="block text-text mb-2">
            {tCommon("comingSoon.title")}
          </strong>
          {tCommon("comingSoon.body")}
        </p>
      </div>
    </Section>
  );
}
