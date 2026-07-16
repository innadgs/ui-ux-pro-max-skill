import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildPersonSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AccessibleImage } from "@/components/ui/AccessibleImage";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { ScrollConnector } from "@/components/motion/ScrollConnector";
import { softScale, revealUp } from "@/lib/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { ExperienceStation } from "@/components/about/ExperienceStation";
import { AboutEducation } from "@/components/about/AboutEducation";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";

type Params = { locale: string };
type PerspectiveItem = { title: string; text: string };
type Station = { title: string; description: string; competencies: string[] };
type MatrixCategory = { title: string; capabilities: string[] };
type Principle = { title: string; description: string };

const PORTRAIT_URL = `${SITE_URL}/images/portrait-about.jpg`;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage.hero" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("headline"),
    description: t("intro"),
    ogImage: PORTRAIT_URL,
  });
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");
  const tNav = await getTranslations("common.nav");
  const tPages = await getTranslations("pages.about");

  const areas = t.raw("positioning.areas") as string[];
  const perspectiveItems = t.raw("perspective.items") as PerspectiveItem[];
  const stations = t.raw("experience.stations") as Station[];
  const categories = t.raw("matrix.categories") as MatrixCategory[];
  const principles = t.raw("philosophy.principles") as Principle[];

  const personSchema = buildPersonSchema(locale as Locale, {
    image: PORTRAIT_URL,
    knowsAbout: areas,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(locale as Locale, [
    { name: tNav("home"), path: "/" },
    { name: tPages("title"), path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Section className="pt-12 md:pt-16">
        <Breadcrumbs items={[{ label: tNav("home"), href: "/" }, { label: tPages("title") }]} />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <MotionReveal>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
              {t("hero.eyebrow")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-text">
              {t("hero.headline")}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-text-secondary leading-relaxed">
              {t("hero.intro")}
            </p>
          </MotionReveal>

          <MotionReveal variants={softScale} className="mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-card-border shadow-soft">
              <AccessibleImage
                src="/images/portrait-about.jpg"
                alt={t("hero.portraitAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 320px"
                className="object-cover"
              />
            </div>
          </MotionReveal>
        </div>
      </Section>

      <Section ariaLabelledby="positioning-heading">
        <SectionHeader
          id="positioning-heading"
          eyebrow={t("positioning.eyebrow")}
          heading={t("positioning.heading")}
        >
          <p className="max-w-2xl">{t("positioning.text")}</p>
        </SectionHeader>
        <MotionGroup as="ul" className="mt-10 flex flex-wrap gap-3">
          {areas.map((area) => (
            <MotionCard
              as="li"
              key={area}
              variants={revealUp}
              className="rounded-full border border-card-border bg-glass-light px-5 py-2.5 text-text backdrop-blur-md"
            >
              {area}
            </MotionCard>
          ))}
        </MotionGroup>
      </Section>

      <Section ariaLabelledby="perspective-heading" className="bg-background-secondary">
        <SectionHeader
          id="perspective-heading"
          eyebrow={t("perspective.eyebrow")}
          heading={t("perspective.heading")}
        />
        <MotionGroup as="ul" className="mt-12 grid gap-10 sm:grid-cols-2 md:gap-x-16">
          {perspectiveItems.map((item) => (
            <MotionCard as="li" key={item.title} variants={revealUp}>
              <h3 className="font-serif text-xl md:text-2xl text-text">{item.title}</h3>
              <p className="mt-3 text-text-secondary leading-relaxed">{item.text}</p>
            </MotionCard>
          ))}
        </MotionGroup>
      </Section>

      <Section ariaLabelledby="experience-heading">
        <SectionHeader
          id="experience-heading"
          eyebrow={t("experience.eyebrow")}
          heading={t("experience.heading")}
        >
          <p className="max-w-2xl">{t("experience.note")}</p>
        </SectionHeader>
        <div className="mt-12">
          <ScrollConnector>
            <ol>
              {stations.map((station) => (
                <ExperienceStation key={station.title} station={station} />
              ))}
            </ol>
          </ScrollConnector>
        </div>
      </Section>

      <Section ariaLabelledby="matrix-heading" className="bg-background-secondary">
        <SectionHeader
          id="matrix-heading"
          eyebrow={t("matrix.eyebrow")}
          heading={t("matrix.heading")}
        />
        <MotionGroup as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <MotionCard as="li" key={category.title} variants={revealUp} className="h-full">
              <GlassCard className="h-full p-6">
                <h3 className="font-serif text-lg text-text">{category.title}</h3>
                <ul className="mt-4 space-y-2">
                  {category.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </MotionCard>
          ))}
        </MotionGroup>
      </Section>

      <AboutEducation />

      <Section ariaLabelledby="philosophy-heading">
        <SectionHeader
          id="philosophy-heading"
          eyebrow={t("philosophy.eyebrow")}
          heading={t("philosophy.heading")}
        />
        <MotionGroup as="ol" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <MotionCard as="li" key={principle.title} variants={revealUp}>
              <h3 className="font-serif text-lg text-text">{principle.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {principle.description}
              </p>
            </MotionCard>
          ))}
        </MotionGroup>
      </Section>

      <ServicesFinalCta />
    </>
  );
}
