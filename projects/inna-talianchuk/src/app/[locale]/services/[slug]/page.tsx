import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import {
  SERVICE_KEYS,
  SERVICE_SLUGS,
  RELATED_SERVICES,
  getServiceKeyFromSlug,
  type ServiceKey,
} from "@/lib/services";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";

type Params = { locale: string; slug: string };
type FaqItem = { question: string; answer: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_KEYS.map((key) => ({ locale, slug: SERVICE_SLUGS[key] })),
  );
}

function resolveSlug(slug: string): ServiceKey {
  const key = getServiceKeyFromSlug(slug);
  if (!key) notFound();
  return key;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const key = resolveSlug(slug);

  const t = await getTranslations({ locale, namespace: "services" });
  const d = await getTranslations({ locale, namespace: `servicesPage.detail.${key}` });

  return buildMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: t(`${key}.name`),
    description: d("definition"),
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const key = resolveSlug(slug);
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const d = await getTranslations(`servicesPage.detail.${key}`);
  const tTemplate = await getTranslations("servicesPage.template");
  const tPagesServices = await getTranslations("pages.services");
  const tNav = await getTranslations("common.nav");
  const tCommon = await getTranslations("common");

  const included = d.raw("included") as string[];
  const deliverables = d.raw("deliverables") as string[];
  const usefulWhen = d.raw("usefulWhen") as string[];
  const problems = d.raw("problems") as string[];
  const faqItems = d.raw("faq") as FaqItem[];
  const journeyStages = key === "marketingSystems" ? (d.raw("journeyStages") as string[]) : undefined;
  const layers = key === "premiumWebsitesDigitalExperience" ? (d.raw("layers") as string[]) : undefined;

  const serviceName = t(`${key}.name`);

  const serviceSchema = buildServiceSchema(locale as Locale, {
    name: serviceName,
    description: d("definition"),
    path: `/services/${slug}`,
  });

  const breadcrumbSchema = buildBreadcrumbSchema(locale as Locale, [
    { name: tNav("home"), path: "/" },
    { name: tPagesServices("title"), path: "/services" },
    { name: serviceName, path: `/services/${slug}` },
  ]);

  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Section className="pt-12 md:pt-16">
        <Breadcrumbs
          items={[
            { label: tNav("home"), href: "/" },
            { label: tPagesServices("title"), href: "/services" },
            { label: serviceName },
          ]}
        />

        <MotionReveal className="mt-8 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-text">
            {serviceName}
          </h1>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            {d("definition")}
          </p>
        </MotionReveal>

        <div className="mt-14">
          <ServiceVisual
            serviceKey={key}
            included={included}
            deliverables={deliverables}
            journeyStages={journeyStages}
            layers={layers}
          />
        </div>
      </Section>

      <Section ariaLabelledby="useful-when-heading" className="bg-background-secondary">
        <SectionHeader id="useful-when-heading" heading={tTemplate("usefulWhenHeading")} />
        <MotionReveal>
          <ul className="mt-8 max-w-2xl space-y-3">
            {usefulWhen.map((item) => (
              <li key={item} className="flex gap-3 text-text">
                <span aria-hidden="true" className="text-accent-text">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Section>

      <Section ariaLabelledby="problems-heading">
        <SectionHeader id="problems-heading" heading={tTemplate("problemsHeading")} />
        <MotionReveal>
          <ul className="mt-8 max-w-2xl space-y-3">
            {problems.map((item) => (
              <li key={item} className="flex gap-3 text-text">
                <span aria-hidden="true" className="text-accent-text">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Section>

      <Section ariaLabelledby="scope-heading" className="bg-background-secondary">
        <SectionHeader id="scope-heading" heading={d("includedHeading")} />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <MotionReveal>
            <ul className="space-y-2 text-text">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal>
            <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
              {d("notIncludedHeading")}
            </h3>
            <p className="text-text-secondary leading-relaxed">{d("notIncluded")}</p>

            <h3 className="mt-8 text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
              {d("deliverablesHeading")}
            </h3>
            <ul className="space-y-2 text-text">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </Section>

      <ServiceProcess />

      <Section ariaLabelledby="result-heading" className="bg-background-secondary">
        <SectionHeader id="result-heading" heading={tCommon("result")} />
        <MotionReveal>
          <p className="mt-6 max-w-2xl text-lg text-text leading-relaxed">{d("result")}</p>
        </MotionReveal>

        <MotionReveal className="mt-10 border-t border-card-border pt-8">
          <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
            {tTemplate("doesNotPromiseHeading")}
          </h3>
          <p className="max-w-2xl text-text-secondary leading-relaxed">{d("doesNotPromise")}</p>
        </MotionReveal>
      </Section>

      {key === "premiumWebsitesDigitalExperience" ? (
        <Section ariaLabelledby="expertise-heading">
          <SectionHeader id="expertise-heading" heading={d("expertise.heading")}>
            <p>{d("expertise.intro")}</p>
          </SectionHeader>
          <MotionReveal>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl">
              {(d.raw("expertise.list") as string[]).map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-card-border bg-glass-light px-3 py-2.5 text-center text-sm text-text backdrop-blur-md"
                >
                  {item}
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal>
            <p className="mt-8 max-w-2xl text-sm text-text-secondary leading-relaxed">
              {d("expertise.techNote")}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary leading-relaxed">
              {d("expertise.aiNote")}
            </p>
          </MotionReveal>
        </Section>
      ) : null}

      <RelatedServices keys={RELATED_SERVICES[key]} />
      <ServiceFaq heading={tTemplate("faqHeading")} items={faqItems} />
      <ServicesFinalCta />
    </>
  );
}
