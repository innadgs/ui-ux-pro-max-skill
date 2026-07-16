import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";
import { ApproachPath } from "./ApproachPath";

const STEP_KEYS = ["understand", "analyze", "design", "implement", "optimize"] as const;

export async function ApproachPreview() {
  const t = await getTranslations("home.approachPreview");

  return (
    <Section ariaLabelledby="approach-preview-heading">
      <SectionHeader
        id="approach-preview-heading"
        eyebrow={t("eyebrow")}
        heading={t("headline")}
        align="center"
      />

      <div className="relative mt-16">
        <ApproachPath steps={STEP_KEYS.length} />
        <MotionGroup as="ol" className="relative grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          {STEP_KEYS.map((key, index) => (
            <MotionCard as="li" key={key} variants={revealUp} className="text-center md:text-left">
              <span className="font-serif text-3xl text-card-border" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium text-text">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {t(`steps.${key}.description`)}
              </p>
            </MotionCard>
          ))}
        </MotionGroup>
      </div>

      <div className="mt-14 text-center">
        <TextLink href="/approach">{t("cta")}</TextLink>
      </div>
    </Section>
  );
}
