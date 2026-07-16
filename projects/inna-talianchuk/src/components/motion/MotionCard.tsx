"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { hoverLift } from "@/lib/motion";

type Tag = "div" | "li" | "article";

const tagMap = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
} as const;

/**
 * A single card inside a MotionGroup: inherits the stagger/entrance
 * variant from its parent and adds the brief's "hover lifts <=5px" feedback.
 */
export function MotionCard({
  children,
  variants,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  variants: Variants;
  as?: Tag;
  className?: string;
}) {
  const MotionTag = tagMap[as];

  return (
    <MotionTag variants={variants} whileHover={hoverLift} className={className}>
      {children}
    </MotionTag>
  );
}
