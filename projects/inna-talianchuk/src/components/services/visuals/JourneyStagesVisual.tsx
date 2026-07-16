"use client";

import { motion } from "motion/react";
import { revealLeftToRight, lineDraw, motionTiming } from "@/lib/motion";

/** Marketing Systems: customer journey elements move left to right through clear stages. */
export function JourneyStagesVisual({ stages }: { stages: string[] }) {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-4 overflow-x-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: motionTiming.staggerChildren }}
    >
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center gap-2 sm:gap-4 shrink-0">
          <motion.div
            variants={revealLeftToRight}
            className="rounded-full border border-card-border bg-glass-light px-4 py-2.5 text-sm font-medium text-text backdrop-blur-md whitespace-nowrap"
          >
            {stage}
          </motion.div>
          {index < stages.length - 1 ? (
            <svg width="32" height="8" viewBox="0 0 32 8" aria-hidden="true" focusable="false">
              <motion.line
                x1="0"
                y1="4"
                x2="28"
                y2="4"
                stroke="#8f9a7a"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.polyline
                points="24,1 28,4 24,7"
                fill="none"
                stroke="#8f9a7a"
                strokeWidth="1.5"
                variants={lineDraw}
              />
            </svg>
          ) : null}
        </div>
      ))}
    </motion.div>
  );
}
