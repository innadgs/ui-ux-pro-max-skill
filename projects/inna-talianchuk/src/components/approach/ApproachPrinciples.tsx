import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";

type Principle = { title: string; description: string };

export async function ApproachPrinciples() {
  const t = await getTranslations("approachPage");
  const principles = t.raw("principles") as Principle[];

  return (
    <Section ariaLabelledby="principles-heading" className="bg-background-secondary">
      <SectionHeader
        id="principles-heading"
        eyebrow={t("principlesEyebrow")}
        heading={t("principlesHeading")}
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
  );
}
