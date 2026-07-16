import type { ServiceKey } from "@/lib/services";
import { AligningCardsVisual } from "./visuals/AligningCardsVisual";
import { JourneyStagesVisual } from "./visuals/JourneyStagesVisual";
import { AutomationFlowVisual } from "./visuals/AutomationFlowVisual";
import { MilestonePathVisual } from "./visuals/MilestonePathVisual";
import { WebsiteAssemblyVisual } from "./visuals/WebsiteAssemblyVisual";

export function ServiceVisual({
  serviceKey,
  included,
  deliverables,
  journeyStages,
  layers,
}: {
  serviceKey: ServiceKey;
  included: string[];
  deliverables: string[];
  journeyStages?: string[];
  layers?: string[];
}) {
  switch (serviceKey) {
    case "businessSystemsDesign":
      return <AligningCardsVisual items={included.slice(0, 6)} />;
    case "marketingSystems":
      return <JourneyStagesVisual stages={journeyStages ?? []} />;
    case "aiAutomation":
      return <AutomationFlowVisual items={included.slice(0, 3)} />;
    case "projectManagementOperations":
      return <MilestonePathVisual items={deliverables.slice(0, 5)} />;
    case "premiumWebsitesDigitalExperience":
      return <WebsiteAssemblyVisual layers={layers ?? []} />;
    default:
      return null;
  }
}
