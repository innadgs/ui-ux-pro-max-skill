import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = AsLink | AsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm md:text-base font-medium font-sans transition-colors duration-200 min-h-11";

function renderButton(variantClassName: string, props: ButtonProps) {
  const className = `${base} ${variantClassName} ${props.className ?? ""}`;
  const { children, href } = props;

  if (href) {
    return (
      <Link {...props} href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(props as AsButton)} className={className}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return renderButton("bg-text text-background hover:bg-accent-text", props);
}

export function SecondaryButton(props: ButtonProps) {
  return renderButton(
    "border border-card-border text-text hover:border-accent hover:text-accent-text",
    props,
  );
}
