import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  id,
  dark = false,
  className = "",
  containerClassName = "",
  ariaLabelledby,
}: {
  children: ReactNode;
  id?: string;
  dark?: boolean;
  className?: string;
  containerClassName?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`scroll-mt-24 py-24 md:py-32 ${dark ? "bg-dark-section text-background" : ""} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
