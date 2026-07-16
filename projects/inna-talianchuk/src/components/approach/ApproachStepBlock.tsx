"use client";

import { motion } from "motion/react";
import { revealUp, easeEnter } from "@/lib/motion";

type StepData = {
  title: string;
  covers: string[];
  questions: string;
  work: string;
  deliverable: string;
  involvement: string;
};

type FieldLabels = {
  covers: string;
  questions: string;
  work: string;
  deliverable: string;
  involvement: string;
};

export function ApproachStepBlock({
  index,
  anchorId,
  step,
  labels,
}: {
  index: number;
  anchorId: string;
  step: StepData;
  labels: FieldLabels;
}) {
  return (
    <section id={anchorId} aria-labelledby={`${anchorId}-heading`} className="scroll-mt-24 py-16 md:py-20">
      <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12">
        {/* Activation indicator: outline circle fills with accent as the step scrolls into view. */}
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30% 0px" }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-card-border font-serif text-xl text-text-secondary"
          variants={{
            hidden: { backgroundColor: "rgba(0,0,0,0)", borderColor: "var(--color-card-border)", color: "var(--color-text-secondary)" },
            visible: { backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)", color: "var(--color-background)" },
          }}
          transition={{ duration: 0.5, ease: easeEnter }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <div>
          <h2 id={`${anchorId}-heading`} className="font-serif text-3xl text-text mb-6">
            {step.title}
          </h2>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ staggerChildren: 0.05 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {step.covers.map((item) => (
              <motion.li
                key={item}
                variants={revealUp}
                className="rounded-full border border-card-border bg-glass-light px-3 py-1.5 text-sm text-text backdrop-blur-md"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                {labels.questions}
              </h3>
              <p className="text-text leading-relaxed">{step.questions}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                {labels.work}
              </h3>
              <p className="text-text leading-relaxed">{step.work}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                {labels.deliverable}
              </h3>
              <p className="text-text leading-relaxed">{step.deliverable}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                {labels.involvement}
              </h3>
              <p className="text-text leading-relaxed">{step.involvement}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
