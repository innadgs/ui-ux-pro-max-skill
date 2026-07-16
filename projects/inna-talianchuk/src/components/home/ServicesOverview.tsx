import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextLink } from "@/components/ui/TextLink";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealLeftToRight } from "@/lib/motion";

const SERVICES = [
  { key: "businessSystemsDesign", slug: "business-systems-design" },
  { key: "marketingSystems", slug: "marketing-systems" },
  { key: "aiAutomation", slug: "ai-automation" },
  { key: "projectManagementOperations", slug: "project-management-operations" },
  { key: "premiumWebsitesDigitalExperience", slug: "premium-websites-digital-experience" },
] as const;

export async function ServicesOverview() {
  const t = await getTranslations("home.servicesOverview");
  const tServices = await getTranslations("services");
  const tCommon = await getTranslations("common");

  return (
    <Section ariaLabelledby="services-overview-heading">
      <SectionHeader id="services-overview-heading" eyebrow={t("eyebrow")} heading={t("headline")} />

      <MotionGroup as="ol" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <MotionCard
            as="li"
            key={service.slug}
            variants={revealLeftToRight}
            className="focus-within:-translate-y-1 transition-transform duration-200"
          >
            <GlassCard as="article" className="h-full p-7 flex flex-col">
              <span className="font-serif text-4xl text-card-border" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl text-text">
                {tServices(`${service.key}.name`)}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed flex-1">
                {tServices(`${service.key}.short`)}
              </p>
              <p className="mt-4 text-sm text-text">
                <strong className="font-medium">{tCommon("result")}:</strong>{" "}
                {t(`results.${service.key}`)}
              </p>
              <TextLink href={`/services/${service.slug}`} className="mt-5">
                {tCommon("learnMore")}
              </TextLink>
            </GlassCard>
          </MotionCard>
        ))}
      </MotionGroup>
    </Section>
  );
}
