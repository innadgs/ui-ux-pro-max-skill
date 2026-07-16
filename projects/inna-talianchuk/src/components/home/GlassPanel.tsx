"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { glassFloat, easeEnter } from "@/lib/motion";

export function GlassPanel({
  label,
  icon: Icon,
  className = "",
  seed = 0,
  pointerX,
  pointerY,
  parallaxStrength = 1,
}: {
  label: string;
  icon: LucideIcon;
  className?: string;
  seed?: number;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
  parallaxStrength?: number;
}) {
  const float = glassFloat(seed);

  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const x = useTransform(springX, (value) => value * parallaxStrength);
  const y = useTransform(springY, (value) => value * parallaxStrength);

  return (
    // Position layer: plain absolute placement, no motion.
    <div className={`absolute pointer-events-none ${className}`}>
      {/* Parallax layer: subtle cursor response (desktop/pointer:fine only). */}
      <motion.div style={{ x, y }}>
        {/* Entrance layer: one-time fade + scale 0.97 -> 1 + slight upward move. */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: seed * 0.06, ease: easeEnter }}
        >
          {/* Float layer: continuous slow loop, independent of entrance/parallax. */}
          <motion.div
            className="flex items-center gap-2 rounded-2xl border border-card-border bg-glass-light px-4 py-2.5 backdrop-blur-md shadow-soft"
            animate={float.animate}
            transition={float.transition}
          >
            <Icon aria-hidden="true" focusable="false" size={16} className="text-accent-text shrink-0" />
            <span className="text-xs md:text-sm font-medium text-text whitespace-nowrap">
              {label}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
