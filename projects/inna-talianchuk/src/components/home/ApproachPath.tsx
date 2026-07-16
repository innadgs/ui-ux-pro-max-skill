"use client";

import { motion } from "motion/react";
import { lineDraw } from "@/lib/motion";

/** Decorative connecting line, drawn left-to-right with a gentle upward trend. */
export function ApproachPath({ steps }: { steps: number }) {
  const points = Array.from({ length: steps }, (_, index) => {
    const x = (index / (steps - 1)) * 100;
    const y = 50 - index * 6;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-x-0 top-8 hidden h-16 w-full md:block"
    >
      <motion.polyline
        points={points}
        fill="none"
        stroke="#8f9a7a"
        strokeWidth="0.6"
        strokeLinecap="round"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineDraw}
      />
    </svg>
  );
}
