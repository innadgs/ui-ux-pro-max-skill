import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { serif, sans } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { buildPersonSchema, buildProfessionalServiceSchema, buildWebSiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReducedMotionProvider } from "@/components/motion/ReducedMotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

type Params = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale: locale as Locale,
    title: `${t("siteName")} — ${t("positioning")}`,
    description: t("positioning"),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-background text-text">
        <NextIntlClientProvider messages={messages}>
          <ReducedMotionProvider>
            <a href="#main-content" className="skip-link">
              {t("skipToContent")}
            </a>
            <JsonLd data={buildPersonSchema(locale as Locale)} />
            <JsonLd data={buildProfessionalServiceSchema(locale as Locale)} />
            <JsonLd data={buildWebSiteSchema(locale as Locale)} />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </ReducedMotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
