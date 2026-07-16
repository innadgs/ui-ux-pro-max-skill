"use client";

import { motion } from "motion/react";
import { revealUp, easeEnter } from "@/lib/motion";

type Station = {
  title: string;
  description: string;
  competencies: string[];
};

/**
 * One entry of the experience timeline. Deliberately carries no employer
 * names, dates, or progress bars — the focus is the transferable competence
 * of each station, per the approved content rules.
 */
export function ExperienceStation({ station }: { station: Station }) {
  return (
    <li className="py-10 md:py-12">
      <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-12">
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-25% 0px" }}
          className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-card-border"
          variants={{
            hidden: { borderColor: "var(--color-card-border)" },
            visible: { borderColor: "var(--color-accent)" },
          }}
          transition={{ duration: 0.5, ease: easeEnter }}
        >
          <motion.span
            className="h-3 w-3 rounded-full bg-accent"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: easeEnter }}
          />
        </motion.span>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={revealUp}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-text">{station.title}</h3>
          <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">
            {station.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {station.competencies.map((item) => (
              <li
                key={item}
                className="rounded-full border border-card-border bg-glass-light px-3 py-1.5 text-sm text-text backdrop-blur-md"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </li>
  );
}
