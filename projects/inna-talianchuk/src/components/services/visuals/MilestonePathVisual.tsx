"use client";

import { motion } from "motion/react";
import { revealUp, lineDraw, motionTiming } from "@/lib/motion";

/** Project Management & Operations: milestones rise along a clear diagonal project path. */
export function MilestonePathVisual({ items }: { items: string[] }) {
  const points = items.map((_, index) => {
    const x = (index / Math.max(items.length - 1, 1)) * 100;
    const y = 90 - index * (70 / Math.max(items.length - 1, 1));
    return { x, y };
  });

  const pathD = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");

  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="h-32 w-full">
        <motion.path
          d={pathD}
          fill="none"
          stroke="#8f9a7a"
          strokeWidth="0.8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineDraw}
        />
      </svg>

      <motion.div
        className="mt-2 flex justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: motionTiming.staggerChildren }}
      >
        {items.map((item) => (
          <motion.div key={item} variants={revealUp} className="max-w-24 text-center">
            <span className="mx-auto mb-2 block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs text-text-secondary leading-snug">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
