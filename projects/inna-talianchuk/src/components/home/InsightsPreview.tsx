import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextLink } from "@/components/ui/TextLink";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";

type InsightItem = { category: string; title: string; excerpt: string };

export async function InsightsPreview() {
  const t = await getTranslations("home.insights");
  const items = t.raw("items") as InsightItem[];

  return (
    <Section ariaLabelledby="insights-preview-heading" className="bg-background-secondary">
      <SectionHeader id="insights-preview-heading" eyebrow={t("eyebrow")} heading={t("headline")} />

      <MotionGroup as="ol" className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <MotionCard as="li" key={item.title} variants={revealUp}>
            <GlassCard as="article" className="h-full p-7">
              <p className="text-xs uppercase tracking-[0.15em] text-accent-text">
                {item.category}
              </p>
              <h3 className="mt-4 font-serif text-lg text-text leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.excerpt}</p>
            </GlassCard>
          </MotionCard>
        ))}
      </MotionGroup>

      <div className="mt-12 text-center">
        <TextLink href="/insights">{t("cta")}</TextLink>
      </div>
    </Section>
  );
}
