"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, getPathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("common.languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-switcher-menu"
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
        className="min-h-11 min-w-11 rounded-full border border-card-border px-4 text-sm font-medium text-text hover:border-accent transition-colors duration-200"
      >
        {locale.toUpperCase()}
      </button>

      {open ? (
        <ul
          id="language-switcher-menu"
          className="absolute right-0 mt-2 min-w-40 rounded-2xl border border-card-border bg-glass-light backdrop-blur-md shadow-soft py-2 z-50"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <a
                href={getPathname({ href: pathname, locale: loc })}
                aria-current={loc === locale ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  router.replace(pathname, { locale: loc });
                }}
                className={`block px-4 py-2.5 text-sm hover:bg-background-secondary transition-colors duration-150 ${
                  loc === locale ? "font-semibold text-accent-text" : "text-text"
                }`}
              >
                {localeNames[loc]}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
