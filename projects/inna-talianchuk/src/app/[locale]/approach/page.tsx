import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ScrollConnector } from "@/components/motion/ScrollConnector";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApproachStepBlock } from "@/components/approach/ApproachStepBlock";
import { ApproachPrinciples } from "@/components/approach/ApproachPrinciples";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";

type Params = { locale: string };
type StepData = {
  title: string;
  covers: string[];
  questions: string;
  work: string;
  deliverable: string;
  involvement: string;
};
type FaqItem = { question: string; answer: string };

const STEP_KEYS = ["understand", "analyze", "design", "implement", "optimize"] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "approachPage.hero" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/approach",
    title: t("headline"),
    description: t("intro"),
  });
}

export default async function ApproachPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("approachPage");
  const tNav = await getTranslations("common.nav");
  const tPages = await getTranslations("pages.approach");

  const labels = t.raw("fieldLabels") as {
    covers: string;
    questions: string;
    work: string;
    deliverable: string;
    involvement: string;
  };
  const faqItems = t.raw("faq") as FaqItem[];

  const breadcrumbSchema = buildBreadcrumbSchema(locale as Locale, [
    { name: tNav("home"), path: "/" },
    { name: tPages("title"), path: "/approach" },
  ]);
  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Section className="pt-12 md:pt-16">
        <Breadcrumbs items={[{ label: tNav("home"), href: "/" }, { label: tPages("title") }]} />

        <MotionReveal className="mt-8 max-w-2xl">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-text">
            {t("hero.headline")}
          </h1>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            {t("hero.intro")}
          </p>
        </MotionReveal>
      </Section>

      <Section className="pt-0">
        <ScrollConnector>
          {STEP_KEYS.map((key, index) => (
            <ApproachStepBlock
              key={key}
              index={index}
              anchorId={key}
              step={t.raw(`steps.${key}`) as StepData}
              labels={labels}
            />
          ))}
        </ScrollConnector>
      </Section>

      <ApproachPrinciples />

      <Section ariaLabelledby="formats-heading">
        <h2 id="formats-heading" className="font-serif text-2xl md:text-3xl text-text">
          {t("formatsHeading")}
        </h2>
        <MotionReveal>
          <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
            {t("formatsText")}
          </p>
        </MotionReveal>

        <h2 id="collaboration-heading" className="mt-14 font-serif text-2xl md:text-3xl text-text">
          {t("collaborationHeading")}
        </h2>
        <MotionReveal>
          <p className="mt-4 max-w-2xl text-text-secondary leading-relaxed">
            {t("collaborationText")}
          </p>
        </MotionReveal>
      </Section>

      <ServiceFaq heading={t("faqHeading")} items={faqItems} />
      <ServicesFinalCta />
    </>
  );
}
