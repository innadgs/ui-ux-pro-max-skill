import { getTranslations } from "next-intl/server";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { revealLeftToRight } from "@/lib/motion";
import { HeroVisual } from "./HeroVisual";

export async function Hero() {
  const t = await getTranslations("home.hero");

  const panels = {
    ai: t("panels.ai"),
    analytics: t("panels.analytics"),
    crm: t("panels.crm"),
    automation: t("panels.automation"),
    projectManagement: t("panels.projectManagement"),
    marketing: t("panels.marketing"),
    businessStrategy: t("panels.businessStrategy"),
  };

  return (
    <section aria-labelledby="hero-heading" className="pt-14 pb-24 md:pt-20 md:pb-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <MotionReveal variants={revealLeftToRight}>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
              {t("eyebrow")}
            </p>
          </MotionReveal>

          <MotionReveal variants={revealLeftToRight}>
            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-text max-w-xl"
            >
              {t("headline")}
            </h1>
          </MotionReveal>

          <MotionReveal variants={revealLeftToRight}>
            <p className="mt-8 text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
              {t("supporting")}
            </p>
          </MotionReveal>

          <MotionReveal variants={revealLeftToRight}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PrimaryButton href="/contact">{t("primaryCta")}</PrimaryButton>
              <SecondaryButton href="/services">{t("secondaryCta")}</SecondaryButton>
            </div>
          </MotionReveal>

          <MotionReveal variants={revealLeftToRight}>
            <p className="mt-10 text-sm text-text-secondary">{t("microText")}</p>
          </MotionReveal>
        </div>

        <HeroVisual panels={panels} portraitAlt={t("portraitAlt")} />
      </Container>
    </section>
  );
}
