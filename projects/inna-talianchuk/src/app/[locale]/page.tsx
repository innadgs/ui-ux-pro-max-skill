import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { ChaosHero } from "@/components/home/ChaosHero";
import { BusinessProblem } from "@/components/home/BusinessProblem";
import { ConnectedSystem } from "@/components/home/ConnectedSystem";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PremiumWebsitesSpotlight } from "@/components/home/PremiumWebsitesSpotlight";
import { ApproachPreview } from "@/components/home/ApproachPreview";
import { ExperienceCompetence } from "@/components/home/ExperienceCompetence";
import { SelectedWork } from "@/components/home/SelectedWork";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FinalCta } from "@/components/home/FinalCta";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "home.hero" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/",
    title: `${t("siteName")} — ${t("positioning")}`,
    description: tHero("supporting"),
  });
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ChaosHero />
      <BusinessProblem />
      <ConnectedSystem />
      <ServicesOverview />
      <PremiumWebsitesSpotlight />
      <ApproachPreview />
      <ExperienceCompetence />
      <SelectedWork />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
