"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Wraps the app so every `motion.*` component automatically honors
 * `prefers-reduced-motion` (Motion's built-in "user" mode) without each
 * component needing its own guard. Backed up by the CSS-level kill-switch
 * in globals.css for anything animated outside Motion (e.g. CSS transitions).
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
