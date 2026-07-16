import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { MotionReveal } from "@/components/motion/MotionReveal";

export async function FinalCta() {
  const t = await getTranslations("home.finalCta");

  return (
    <Section ariaLabelledby="final-cta-heading" className="text-center">
      <MotionReveal className="mx-auto max-w-2xl">
        <h2 id="final-cta-heading" className="font-serif text-3xl md:text-5xl leading-tight text-text">
          {t("headline")}
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <PrimaryButton href="/contact">{t("primaryCta")}</PrimaryButton>
          <SecondaryButton href="/services">{t("secondaryCta")}</SecondaryButton>
        </div>
      </MotionReveal>
    </Section>
  );
}
