import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";

type EducationItem = {
  title: string;
  institution?: string;
  note?: string;
};

/**
 * Education & certification. Renders nothing until verified qualifications
 * are added to `aboutPage.education.items` in the message files — no
 * placeholder or invented credentials are ever shown. Certificate titles
 * must be used exactly as documented (never renamed).
 */
export async function AboutEducation() {
  const t = await getTranslations("aboutPage.education");
  const items = t.raw("items") as EducationItem[];

  if (items.length === 0) return null;

  return (
    <Section ariaLabelledby="education-heading">
      <SectionHeader id="education-heading" eyebrow={t("eyebrow")} heading={t("heading")} />
      <MotionReveal className="mt-10 max-w-2xl">
        <ul className="divide-y divide-card-border border-y border-card-border">
          {items.map((item) => (
            <li key={item.title}>
              {item.note ? (
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-text [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block font-medium">{item.title}</span>
                      {item.institution ? (
                        <span className="mt-1 block text-sm text-text-secondary">
                          {item.institution}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl text-text-secondary transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-text-secondary leading-relaxed">{item.note}</p>
                </details>
              ) : (
                <div className="py-4">
                  <span className="block font-medium text-text">{item.title}</span>
                  {item.institution ? (
                    <span className="mt-1 block text-sm text-text-secondary">
                      {item.institution}
                    </span>
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      </MotionReveal>
    </Section>
  );
}
