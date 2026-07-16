"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Wraps a sequence of sections with a thin vertical line that fills in as
 * the visitor scrolls through them — a continuous path whose progress is
 * tied to real scroll position rather than a one-off entrance animation.
 * Used on the Services and Approach pages to connect their step sequences.
 */
export function ScrollConnector({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-0 bottom-0 hidden w-px bg-card-border md:block"
      >
        <motion.div
          className="w-full bg-accent origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      {children}
    </div>
  );
}
