import { getTranslations } from "next-intl/server";
import { generateStubMetadata } from "@/lib/stubPage";
import { StubPage } from "@/components/patterns/StubPage";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  return generateStubMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return <StubPage pageKey="contact" breadcrumbLabel={t("title")} />;
}
