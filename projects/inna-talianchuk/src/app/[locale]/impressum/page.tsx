import { getTranslations } from "next-intl/server";
import { generateStubMetadata } from "@/lib/stubPage";
import { StubPage } from "@/components/patterns/StubPage";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  return generateStubMetadata(locale, "impressum", "/impressum");
}

export default async function ImpressumPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.impressum" });
  return <StubPage pageKey="impressum" breadcrumbLabel={t("title")} />;
}
