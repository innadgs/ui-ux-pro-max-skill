"use client";

import { motion, type Variants } from "motion/react";
import { easeEnter, motionTiming } from "@/lib/motion";

const layerVariants: Variants[] = [
  // Typography: from the left
  { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeEnter } } },
  // Image: scale in
  { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeEnter } } },
  // Layout: from the right
  { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeEnter } } },
  // Motion: from below
  { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeEnter } } },
];

/** Premium Websites: typography, image, layout and motion layers assemble into a finished composition. */
export function WebsiteAssemblyVisual({ layers }: { layers: string[] }) {
  return (
    <motion.div
      className="relative rounded-2xl border border-card-border bg-background shadow-soft overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: motionTiming.staggerChildren }}
    >
      <div className="flex items-center gap-1.5 border-b border-card-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-6">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            variants={layerVariants[index % layerVariants.length]}
            className="rounded-xl border border-card-border bg-background-secondary p-4"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-text-secondary">{layer}</p>
            <div className="mt-3 h-10 rounded-lg bg-glass-light" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
