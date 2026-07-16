"use client";

import { motion } from "motion/react";
import { revealUp, lineDraw, motionTiming } from "@/lib/motion";

/** AI & Automation: manual task nodes gradually connect into a simplified automated flow. */
export function AutomationFlowVisual({ items }: { items: string[] }) {
  return (
    <motion.div
      className="flex items-center gap-1 overflow-x-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: motionTiming.staggerChildren }}
    >
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-1 shrink-0">
          <motion.div variants={revealUp} className="flex flex-col items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
            <span className="max-w-28 text-center text-xs text-text-secondary leading-snug">
              {item}
            </span>
          </motion.div>
          {index < items.length - 1 ? (
            <svg width="40" height="4" viewBox="0 0 40 4" aria-hidden="true" focusable="false" className="mb-6">
              <motion.line
                x1="0"
                y1="2"
                x2="40"
                y2="2"
                stroke="#8f9a7a"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                variants={lineDraw}
              />
            </svg>
          ) : null}
        </div>
      ))}
    </motion.div>
  );
}
