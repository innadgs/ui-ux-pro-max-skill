import { MotionReveal } from "@/components/motion/MotionReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FaqItem = { question: string; answer: string };

export function ServiceFaq({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <Section ariaLabelledby="service-faq-heading" className="bg-background-secondary">
      <SectionHeader id="service-faq-heading" heading={heading} />

      <div className="mt-10 max-w-2xl divide-y divide-card-border border-t border-b border-card-border">
        {items.map((item) => (
          <MotionReveal key={item.question} as="div">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-text marker:content-none">
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-text-secondary group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-3 text-text-secondary leading-relaxed">{item.answer}</p>
            </details>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
