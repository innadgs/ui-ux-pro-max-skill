import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { PrimaryButton } from "@/components/ui/Button";
import { MotionReveal } from "@/components/motion/MotionReveal";

export async function ServicesFinalCta() {
  const t = await getTranslations("servicesPage.finalCta");

  return (
    <Section ariaLabelledby="services-final-cta-heading" className="text-center">
      <MotionReveal className="mx-auto max-w-2xl">
        <h2 id="services-final-cta-heading" className="font-serif text-3xl md:text-5xl leading-tight text-text">
          {t("heading")}
        </h2>
        <PrimaryButton href="/contact" className="mt-10">
          {t("button")}
        </PrimaryButton>
      </MotionReveal>
    </Section>
  );
}
