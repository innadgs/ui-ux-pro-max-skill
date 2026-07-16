import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export function TextLink({
  href,
  children,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-accent-text underline decoration-accent/40 decoration-1 underline-offset-4 hover:decoration-accent-text transition-colors duration-200 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
