import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";

type ComboItem = { title: string; description: string };

export async function ServiceCombinations() {
  const t = await getTranslations("servicesPage.combine");
  const items = t.raw("items") as ComboItem[];

  return (
    <Section ariaLabelledby="combine-heading">
      <SectionHeader id="combine-heading" eyebrow={t("eyebrow")} heading={t("heading")} />

      <MotionGroup as="ol" className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <MotionCard as="li" key={item.title} variants={revealUp}>
            <GlassCard as="article" className="h-full p-7">
              <h3 className="font-serif text-lg text-text leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          </MotionCard>
        ))}
      </MotionGroup>
    </Section>
  );
}
