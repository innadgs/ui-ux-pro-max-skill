"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { staggerContainer } from "@/lib/motion";

type Tag = "div" | "ol" | "ul";

const tagMap = {
  div: motion.div,
  ol: motion.ol,
  ul: motion.ul,
} as const;

/**
 * Wraps a group of MotionReveal-style children (same variants object, e.g.
 * revealUp/revealLeftToRight) and staggers their entrance as one
 * whileInView trigger, per the brief's 0.04-0.07s stagger spec.
 */
export function MotionGroup({
  children,
  as = "div",
  className = "",
  viewportMargin = "-10% 0px",
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  viewportMargin?: string;
}) {
  const MotionTag = tagMap[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}
