import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const SERVICE_LINKS = [
  { key: "businessSystemsDesign", slug: "business-systems-design" },
  { key: "marketingSystems", slug: "marketing-systems" },
  { key: "aiAutomation", slug: "ai-automation" },
  { key: "projectManagementOperations", slug: "project-management-operations" },
  { key: "premiumWebsitesDigitalExperience", slug: "premium-websites-digital-experience" },
] as const;

const PAGE_LINKS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "approach", href: "/approach" },
  { key: "about", href: "/about" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { key: "impressum", href: "/impressum" },
  { key: "privacy", href: "/privacy" },
  { key: "accessibility", href: "/accessibility" },
] as const;

const CONTACT_EMAIL = "hello@inna-talianchuk.example.com";

export async function Footer() {
  const tServices = await getTranslations("services");
  const tNav = await getTranslations("common.nav");
  const tFooter = await getTranslations("common.footer");
  const locale = (await getLocale()) as Locale;

  const pageLabel = (key: (typeof PAGE_LINKS)[number]["key"]) =>
    key === "about" || key === "caseStudies" ? tFooter(key) : tNav(key);

  return (
    <footer className="border-t border-card-border bg-background-secondary">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
        <p className="font-serif text-xl text-text max-w-md mb-12">
          {tFooter("positioning")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <nav aria-label={tFooter("servicesHeading")}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
              {tFooter("servicesHeading")}
            </h2>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-text hover:text-accent-text transition-colors duration-150"
                  >
                    {tServices(`${service.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={tFooter("pagesHeading")}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
              {tFooter("pagesHeading")}
            </h2>
            <ul className="space-y-2.5">
              {PAGE_LINKS.map((page) => (
                <li key={page.key}>
                  <Link
                    href={page.href}
                    className="text-sm text-text hover:text-accent-text transition-colors duration-150"
                  >
                    {pageLabel(page.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={tFooter("legalHeading")}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
              {tFooter("legalHeading")}
            </h2>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((legal) => (
                <li key={legal.key}>
                  <Link
                    href={legal.href}
                    className="text-sm text-text hover:text-accent-text transition-colors duration-150"
                  >
                    {tFooter(legal.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={tFooter("languageHeading")}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
              {tFooter("languageHeading")}
            </h2>
            <ul className="space-y-2.5">
              {locales.map((loc) => (
                <li key={loc}>
                  <a
                    href={getPathname({ href: "/", locale: loc })}
                    aria-current={loc === locale ? "true" : undefined}
                    className={`text-sm hover:text-accent-text transition-colors duration-150 ${
                      loc === locale ? "font-semibold text-accent-text" : "text-text"
                    }`}
                  >
                    {localeNames[loc]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 pt-8 border-t border-card-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={tFooter("emailLabel")}
            className="text-sm text-text hover:text-accent-text transition-colors duration-150"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-text-secondary">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
