import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";
import { TextLink } from "@/components/ui/TextLink";

const STEP_KEYS = ["understand", "analyze", "design", "implement", "optimize"] as const;

/** Same five-step process shown on the Approach page — reused here, not redefined per service. */
export async function ServiceProcess() {
  const t = await getTranslations("home.approachPreview");
  const tTemplate = await getTranslations("servicesPage.template");

  return (
    <Section ariaLabelledby="service-process-heading">
      <SectionHeader id="service-process-heading" heading={tTemplate("processHeading")} />

      <MotionGroup as="ol" className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-5">
        {STEP_KEYS.map((key, index) => (
          <MotionCard as="li" key={key} variants={revealUp}>
            <span className="font-serif text-2xl text-card-border" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-medium text-text">{t(`steps.${key}.title`)}</h3>
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
              {t(`steps.${key}.description`)}
            </p>
          </MotionCard>
        ))}
      </MotionGroup>

      <TextLink href="/approach" className="mt-8 inline-block">
        {t("cta")}
      </TextLink>
    </Section>
  );
}
