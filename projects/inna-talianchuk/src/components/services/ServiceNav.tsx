import { getTranslations } from "next-intl/server";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionGroup } from "@/components/motion/MotionGroup";
import { MotionCard } from "@/components/motion/MotionCard";
import { revealUp } from "@/lib/motion";

const SERVICE_KEYS = [
  "businessSystemsDesign",
  "marketingSystems",
  "aiAutomation",
  "projectManagementOperations",
  "premiumWebsitesDigitalExperience",
] as const;

const ANCHOR_IDS: Record<(typeof SERVICE_KEYS)[number], string> = {
  businessSystemsDesign: "business-systems-design",
  marketingSystems: "marketing-systems",
  aiAutomation: "ai-automation",
  projectManagementOperations: "project-management-operations",
  premiumWebsitesDigitalExperience: "premium-websites-digital-experience",
};

export async function ServiceNav() {
  const t = await getTranslations("services");
  const tPage = await getTranslations("servicesPage");

  return (
    <nav aria-label={tPage("navHeading")} className="mt-16">
      <h2 className="sr-only">{tPage("navHeading")}</h2>
      <MotionGroup as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SERVICE_KEYS.map((key) => (
          <MotionCard as="li" key={key} variants={revealUp}>
            <a href={`#${ANCHOR_IDS[key]}`} className="block h-full focus-within:-translate-y-1 transition-transform duration-200">
              <GlassCard as="article" className="h-full p-5">
                <p className="font-serif text-base text-text leading-snug">
                  {t(`${key}.name`)}
                </p>
              </GlassCard>
            </a>
          </MotionCard>
        ))}
      </MotionGroup>
    </nav>
  );
}

export { SERVICE_KEYS, ANCHOR_IDS };
