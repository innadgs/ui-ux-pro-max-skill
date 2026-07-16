"use client";

import { useEffect, useRef, useState } from "react";
import { X, Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PrimaryButton } from "@/components/ui/Button";

type NavItem = { key: string; href: string; label: string };

export function MobileNav({
  navItems,
  ctaLabel,
  openLabel,
  closeLabel,
}: {
  navItems: NavItem[];
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      setOpen(false);
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-card-border text-text"
      >
        <Menu aria-hidden="true" focusable="false" size={20} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={openLabel}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 backdrop:bg-text/40"
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => dialogRef.current?.close()}
              className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-card-border text-text"
            >
              <X aria-hidden="true" focusable="false" size={20} />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-2" aria-label={openLabel}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => dialogRef.current?.close()}
                className="rounded-xl px-3 py-3.5 font-serif text-2xl text-text hover:bg-background-secondary transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <PrimaryButton href="/contact" className="w-full" onClick={() => dialogRef.current?.close()}>
              {ctaLabel}
            </PrimaryButton>
          </div>
        </div>
      </dialog>
    </>
  );
}
