import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateStubMetadata(
  locale: string,
  pageKey: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `pages.${pageKey}` });
  return buildMetadata({
    locale: locale as Locale,
    path,
    title: t("title"),
    description: t("intro"),
  });
}
