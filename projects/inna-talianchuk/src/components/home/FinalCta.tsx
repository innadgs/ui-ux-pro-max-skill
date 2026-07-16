import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { MotionReveal } from "@/components/motion/MotionReveal";

/**
 * The closing bookend: the page opens in ink (chaos act) and closes in
 * ink again. `surface-dark` re-scopes the color variables, so the shared
 * buttons render their inverted ivory/champagne forms unchanged.
 */
export async function FinalCta() {
  const t = await getTranslations("home.finalCta");
  const tChaos = await getTranslations("home.chaosHero");

  return (
    <div data-header-dark>
      <Section ariaLabelledby="final-cta-heading" className="surface-dark text-center">
        <MotionReveal className="mx-auto max-w-2xl">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne">
            {tChaos("tagline")}
          </p>
          <h2
            id="final-cta-heading"
            className="mt-6 font-serif text-3xl md:text-5xl leading-tight text-text"
          >
            {t("headline")}
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryButton href="/contact">{t("primaryCta")}</PrimaryButton>
            <SecondaryButton href="/services">{t("secondaryCta")}</SecondaryButton>
          </div>
        </MotionReveal>
      </Section>
    </div>
  );
}
