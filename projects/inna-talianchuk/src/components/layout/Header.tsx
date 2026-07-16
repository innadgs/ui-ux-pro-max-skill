import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { PrimaryButton } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "approach", href: "/approach" },
  { key: "experience", href: "/case-studies" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
] as const;

export async function Header() {
  const t = await getTranslations("common");
  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    label: t(`nav.${item.key}`),
  }));

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-card-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-text">
          Inna Talianchuk
        </Link>

        <nav aria-label={t("nav.home")} className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <PrimaryButton href="/contact">{t("cta.primary")}</PrimaryButton>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <MobileNav navItems={navItems} ctaLabel={t("cta.primary")} openLabel={t("nav.openMenu")} closeLabel={t("nav.closeMenu")} />
        </div>
      </div>
    </header>
  );
}
