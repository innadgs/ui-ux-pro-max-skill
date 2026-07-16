import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { revealLeftToRight } from "@/lib/motion";

export async function ServiceDetailSection({
  serviceKey,
  slug,
  anchorId,
  index,
  alt,
}: {
  serviceKey: string;
  slug: string;
  anchorId: string;
  index: number;
  alt: boolean;
}) {
  const t = await getTranslations("services");
  const d = await getTranslations(`servicesPage.detail.${serviceKey}`);
  const tCommon = await getTranslations("common");

  const included = d.raw("included") as string[];
  const deliverables = d.raw("deliverables") as string[];

  return (
    <Section
      id={anchorId}
      ariaLabelledby={`${anchorId}-heading`}
      className={alt ? "bg-background-secondary" : ""}
    >
      <MotionReveal>
        <span className="font-serif text-3xl text-card-border" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 id={`${anchorId}-heading`} className="mt-3 font-serif text-2xl md:text-4xl text-text leading-tight">
          {t(`${serviceKey}.name`)}
        </h2>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed">
          {d("definition")}
        </p>
      </MotionReveal>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <MotionReveal variants={revealLeftToRight}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
            {d("situationHeading")}
          </h3>
          <p className="text-text leading-relaxed">{d("situation")}</p>
        </MotionReveal>

        <MotionReveal variants={revealLeftToRight}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
            {d("includedHeading")}
          </h3>
          <ul className="space-y-1.5 text-text">
            {included.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal variants={revealLeftToRight}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
            {d("notIncludedHeading")}
          </h3>
          <p className="text-text-secondary leading-relaxed">{d("notIncluded")}</p>
        </MotionReveal>

        <MotionReveal variants={revealLeftToRight}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
            {d("deliverablesHeading")}
          </h3>
          <ul className="space-y-1.5 text-text">
            {deliverables.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>

      <MotionReveal className="mt-10 border-t border-card-border pt-8">
        <p className="text-text">
          <strong className="font-medium">{tCommon("result")}:</strong> {d("result")}
        </p>
        <p className="mt-3 text-sm text-text-secondary">
          <strong className="font-medium text-text">{d("formatsHeading")}:</strong>{" "}
          {d("formats")}
        </p>
        <TextLink href={`/services/${slug}`} className="mt-6">
          {tCommon("learnMore")}
        </TextLink>
      </MotionReveal>
    </Section>
  );
}
