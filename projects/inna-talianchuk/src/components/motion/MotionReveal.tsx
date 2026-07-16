"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { revealUp } from "@/lib/motion";

type Tag = "div" | "section" | "article" | "li" | "span";

const tagMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

export function MotionReveal({
  children,
  variants = revealUp,
  as = "div",
  className = "",
  viewportMargin = "-10% 0px",
}: {
  children: ReactNode;
  variants?: Variants;
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
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
