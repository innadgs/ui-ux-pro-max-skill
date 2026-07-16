"use client";

import { motion, type Variants } from "motion/react";
import { easeEnter, motionTiming } from "@/lib/motion";

/**
 * Several disconnected fragments enter scattered (different horizontal
 * offsets/rotations) then align into one clean row on scroll-into-view —
 * a visual for "fragmentation becoming structure," per the brief.
 */
const scatterToAligned: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -40 - index * 6 : 40 + index * 6,
    y: 18,
    rotate: index % 2 === 0 ? -4 : 4,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: easeEnter },
  },
};

export function FragmentRow({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="mt-12 flex flex-wrap gap-3"
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
          className="rounded-full border border-card-border bg-glass-light px-4 py-2 text-sm text-text backdrop-blur-md"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
