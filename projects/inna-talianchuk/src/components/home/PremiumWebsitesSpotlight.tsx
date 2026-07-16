import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { PrimaryButton } from "@/components/ui/Button";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { BrowserMockup } from "./BrowserMockup";

export async function PremiumWebsitesSpotlight() {
  const t = await getTranslations("home.premiumWebsites");
  const includes = t.raw("includes") as string[];

  return (
    <Section ariaLabelledby="premium-websites-heading" className="bg-background-secondary">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
            {t("eyebrow")}
          </p>
          <h2 id="premium-websites-heading" className="font-serif text-3xl md:text-5xl leading-tight text-text">
            {t("headline")} <span className="text-text-secondary">{t("headlineSecondLine")}</span>
          </h2>

          <p className="mt-8 text-sm uppercase tracking-[0.15em] text-text-secondary">
            {t("includesHeading")}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-text">
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <PrimaryButton href="/services/premium-websites-digital-experience" className="mt-10">
            {t("cta")}
          </PrimaryButton>
        </div>

        <MotionReveal>
          <BrowserMockup />
        </MotionReveal>
      </div>
    </Section>
  );
}
