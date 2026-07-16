import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextLink } from "@/components/ui/TextLink";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealLeftToRight } from "@/lib/motion";

const FEATURED_SERVICE_KEYS = ["businessSystemsDesign", "marketingSystems", "aiAutomation"] as const;

export async function SelectedWork() {
  const t = await getTranslations("home.selectedWork");
  const tServices = await getTranslations("services");

  return (
    <Section ariaLabelledby="selected-work-heading">
      <SectionHeader id="selected-work-heading" eyebrow={t("eyebrow")} heading={t("headline")} />

      <MotionGroup as="ol" className="mt-14 grid gap-6 md:grid-cols-3">
        {FEATURED_SERVICE_KEYS.map((key) => (
          <MotionCard as="li" key={key} variants={revealLeftToRight}>
            <GlassCard as="article" className="h-full p-7">
              <p className="text-xs uppercase tracking-[0.15em] text-accent-text">
                {tServices(`${key}.name`)}
              </p>
              <p className="mt-4 font-serif text-xl text-text">{t("statusLabel")}</p>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {t("statusNote")}
              </p>
            </GlassCard>
          </MotionCard>
        ))}
      </MotionGroup>

      <div className="mt-12 text-center">
        <TextLink href="/case-studies">{t("cta")}</TextLink>
      </div>
    </Section>
  );
}
