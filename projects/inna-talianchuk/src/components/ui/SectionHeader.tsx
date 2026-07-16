import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3;

export function SectionHeader({
  eyebrow,
  heading,
  level = 2,
  id,
  align = "left",
  invert = false,
  children,
}: {
  eyebrow?: string;
  heading: ReactNode;
  level?: HeadingLevel;
  id?: string;
  align?: "left" | "center";
  invert?: boolean;
  children?: ReactNode;
}) {
  const Heading = `h${level}` as const;

  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow ? (
        <p
          className={`text-xs md:text-sm tracking-[0.2em] uppercase mb-4 ${
            invert ? "text-background/70" : "text-text-secondary"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={`font-serif text-3xl md:text-5xl leading-tight ${
          invert ? "text-background" : "text-text"
        }`}
      >
        {heading}
      </Heading>
      {children ? (
        <div
          className={`mt-6 text-base md:text-lg leading-relaxed ${
            invert ? "text-background/70" : "text-text-secondary"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
