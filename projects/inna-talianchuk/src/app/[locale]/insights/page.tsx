import { getTranslations } from "next-intl/server";
import { generateStubMetadata } from "@/lib/stubPage";
import { StubPage } from "@/components/patterns/StubPage";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  return generateStubMetadata(locale, "insights", "/insights");
}

export default async function InsightsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.insights" });
  return <StubPage pageKey="insights" breadcrumbLabel={t("title")} />;
}
