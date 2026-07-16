import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { FragmentRow } from "./FragmentRow";

export async function BusinessProblem() {
  const t = await getTranslations("home.businessProblem");

  const fragments = [
    t("fragments.website"),
    t("fragments.ads"),
    t("fragments.crm"),
    t("fragments.spreadsheets"),
    t("fragments.aiTools"),
    t("fragments.social"),
    t("fragments.processes"),
  ];

  return (
    <Section ariaLabelledby="business-problem-heading">
      <div className="max-w-2xl">
        <MotionReveal>
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
            {t("eyebrow")}
          </p>
        </MotionReveal>
        <MotionReveal>
          <h2 id="business-problem-heading" className="font-serif text-3xl md:text-5xl leading-tight text-text">
            {t("headline")} <span className="text-text-secondary">{t("headlineSecondLine")}</span>
          </h2>
        </MotionReveal>
        <MotionReveal>
          <p className="mt-8 text-base md:text-lg text-text-secondary leading-relaxed">
            {t("supporting")}
          </p>
        </MotionReveal>
      </div>

      <FragmentRow items={fragments} />

      <MotionReveal>
        <p className="mt-14 font-serif text-2xl md:text-3xl text-text">{t("closing")}</p>
      </MotionReveal>
    </Section>
  );
}
