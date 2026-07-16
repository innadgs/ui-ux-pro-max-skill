import { getTranslations } from "next-intl/server";
import { ChaosHeroClient, type ChaosChapter } from "./ChaosHeroClient";

export async function ChaosHero() {
  const tHero = await getTranslations("home.hero");
  const t = await getTranslations("home.chaosHero");

  const chapters = t.raw("chapters") as ChaosChapter[];

  return (
    <ChaosHeroClient
      content={{
        tagline: t("tagline"),
        headline: tHero("headline"),
        supporting: tHero("supporting"),
        primaryCta: tHero("primaryCta"),
        secondaryCta: tHero("secondaryCta"),
        microText: tHero("microText"),
        scrollHint: t("scrollHint"),
        chapters,
      }}
    />
  );
}
