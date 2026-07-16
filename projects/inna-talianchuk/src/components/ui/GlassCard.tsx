import { createElement, type ReactNode } from "react";

type Tag = "div" | "article" | "li" | "section";

export function GlassCard({
  children,
  as = "div",
  variant = "light",
  className = "",
}: {
  children: ReactNode;
  as?: Tag;
  variant?: "light" | "dark";
  className?: string;
}) {
  const surface =
    variant === "dark"
      ? "bg-glass-dark border-card-border-dark shadow-soft-dark"
      : "bg-glass-light border-card-border shadow-soft";

  return createElement(
    as,
    {
      className: `rounded-[var(--radius-card)] border backdrop-blur-md ${surface} ${className}`,
    },
    children,
  );
}
