import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";

const AREA_KEYS = [
  "businessStrategy",
  "marketing",
  "projectManagement",
  "aiAutomation",
  "websites",
] as const;

export async function ExperienceCompetence() {
  const t = await getTranslations("home.experience");

  return (
    <Section ariaLabelledby="experience-heading" className="bg-background-secondary">
      <SectionHeader id="experience-heading" eyebrow={t("eyebrow")} heading={t("headline")} />

      <MotionGroup as="ol" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {AREA_KEYS.map((key) => (
          <MotionCard as="li" key={key} variants={revealUp}>
            <h3 className="font-serif text-lg text-text">{t(`areas.${key}.title`)}</h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {t(`areas.${key}.description`)}
            </p>
          </MotionCard>
        ))}
      </MotionGroup>
    </Section>
  );
}
