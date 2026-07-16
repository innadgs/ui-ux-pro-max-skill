import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildFaqSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceNav } from "@/components/services/ServiceNav";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { ServicesConnector } from "@/components/services/ServicesConnector";
import { ServiceCombinations } from "@/components/services/ServiceCombinations";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";
import { SERVICE_KEYS, SERVICE_SLUGS } from "@/lib/services";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage.hero" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/services",
    title: t("headline"),
    description: t("intro"),
  });
}

export default async function ServicesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const tServices = await getTranslations("services");
  const tNav = await getTranslations("common.nav");
  const tFaq = await getTranslations("servicesPage.faq");

  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  const itemListSchema = buildItemListSchema(
    locale as Locale,
    SERVICE_KEYS.map((key) => ({
      name: tServices(`${key}.name`),
      path: `/services/${SERVICE_SLUGS[key]}`,
    })),
  );

  const breadcrumbSchema = buildBreadcrumbSchema(locale as Locale, [
    { name: tNav("home"), path: "/" },
    { name: t("hero.headline"), path: "/services" },
  ]);

  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Section className="pt-12 md:pt-16">
        <Breadcrumbs items={[{ label: tNav("home"), href: "/" }, { label: t("hero.headline") }]} />

        <MotionReveal className="mt-8 max-w-3xl">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-text">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            {t("hero.intro")}
          </p>
        </MotionReveal>

        <ServiceNav />
      </Section>

      <ServicesConnector>
        {SERVICE_KEYS.map((key, index) => (
          <ServiceDetailSection
            key={key}
            serviceKey={key}
            slug={SERVICE_SLUGS[key]}
            anchorId={SERVICE_SLUGS[key]}
            index={index}
            alt={index % 2 === 1}
          />
        ))}
      </ServicesConnector>

      <ServiceCombinations />
      <ServicesFaq />
      <ServicesFinalCta />
    </>
  );
}
