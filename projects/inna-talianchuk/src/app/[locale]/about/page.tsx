import { getTranslations } from "next-intl/server";
import { generateStubMetadata } from "@/lib/stubPage";
import { StubPage } from "@/components/patterns/StubPage";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  return generateStubMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return <StubPage pageKey="about" breadcrumbLabel={t("title")} />;
}
