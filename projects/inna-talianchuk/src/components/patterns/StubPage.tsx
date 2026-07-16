import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export async function StubPage({
  pageKey,
  breadcrumbLabel,
}: {
  pageKey: string;
  breadcrumbLabel: string;
}) {
  const tPages = await getTranslations("pages");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("common.nav");

  return (
    <Section className="pt-12 md:pt-16">
      <Breadcrumbs
        items={[{ label: tNav("home"), href: "/" }, { label: breadcrumbLabel }]}
      />
      <div className="mt-8">
        <SectionHeader level={1} heading={tPages(`${pageKey}.title`)}>
          <p>{tPages(`${pageKey}.intro`)}</p>
        </SectionHeader>
        <p className="mt-10 text-text-secondary max-w-prose">
          <strong className="block text-text mb-2">
            {tCommon("comingSoon.title")}
          </strong>
          {tCommon("comingSoon.body")}
        </p>
      </div>
    </Section>
  );
}
