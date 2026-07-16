"use client";

import { motion, type Variants } from "motion/react";
import { easeEnter, motionTiming } from "@/lib/motion";

const scatterToAligned: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -36 - index * 5 : 36 + index * 5,
    y: 14,
    rotate: index % 2 === 0 ? -3 : 3,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: easeEnter },
  },
};

/** Business Systems Design: disconnected cards align into one structured model. */
export function AligningCardsVisual({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="flex flex-wrap gap-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: motionTiming.staggerChildren }}
    >
      {items.map((item, index) => (
        <motion.li
          key={item}
          custom={index}
          variants={scatterToAligned}
          className="rounded-xl border border-card-border bg-glass-light px-4 py-2.5 text-sm text-text backdrop-blur-md"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
