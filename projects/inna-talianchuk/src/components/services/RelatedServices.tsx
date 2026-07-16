import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextLink } from "@/components/ui/TextLink";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";
import { SERVICE_SLUGS, type ServiceKey } from "@/lib/services";

export async function RelatedServices({ keys }: { keys: [ServiceKey, ServiceKey] }) {
  const t = await getTranslations("services");
  const tTemplate = await getTranslations("servicesPage.template");
  const tCommon = await getTranslations("common");

  return (
    <Section ariaLabelledby="related-services-heading" className="bg-background-secondary">
      <SectionHeader id="related-services-heading" heading={tTemplate("relatedHeading")} />

      <MotionGroup as="ol" className="mt-10 grid gap-6 sm:grid-cols-2">
        {keys.map((key) => (
          <MotionCard as="li" key={key} variants={revealUp}>
            <GlassCard as="article" className="h-full p-6">
              <h3 className="font-serif text-lg text-text">{t(`${key}.name`)}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{t(`${key}.short`)}</p>
              <TextLink href={`/services/${SERVICE_SLUGS[key]}`} className="mt-4">
                {tCommon("learnMore")}
              </TextLink>
            </GlassCard>
          </MotionCard>
        ))}
      </MotionGroup>
    </Section>
  );
}
