import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";
import { ConnectedSystemVisual } from "./ConnectedSystemVisual";

const CAPABILITY_KEYS = [
  "strategy",
  "marketing",
  "aiAutomation",
  "projectManagement",
  "websites",
] as const;

export async function ConnectedSystem() {
  const t = await getTranslations("home.connectedSystem");

  return (
    <div data-header-dark>
      <Section dark ariaLabelledby="connected-system-heading">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <SectionHeader
            id="connected-system-heading"
            eyebrow={t("eyebrow")}
            heading={t("headline")}
            invert
          />

          <MotionGroup as="ol" className="mt-12 grid sm:grid-cols-2 gap-6">
            {CAPABILITY_KEYS.map((key) => (
              <MotionCard as="li" key={key} variants={revealUp}>
                <h3 className="font-serif text-xl text-background">
                  {t(`capabilities.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-background/70 leading-relaxed">
                  {t(`capabilities.${key}.description`)}
                </p>
              </MotionCard>
            ))}
          </MotionGroup>
        </div>

        <ConnectedSystemVisual />
      </div>
      </Section>
    </div>
  );
}
