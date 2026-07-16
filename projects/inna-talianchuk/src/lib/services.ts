export const SERVICE_KEYS = [
  "businessSystemsDesign",
  "marketingSystems",
  "aiAutomation",
  "projectManagementOperations",
  "premiumWebsitesDigitalExperience",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_SLUGS: Record<ServiceKey, string> = {
  businessSystemsDesign: "business-systems-design",
  marketingSystems: "marketing-systems",
  aiAutomation: "ai-automation",
  projectManagementOperations: "project-management-operations",
  premiumWebsitesDigitalExperience: "premium-websites-digital-experience",
};

/** Two related services shown at the bottom of each service detail page. */
export const RELATED_SERVICES: Record<ServiceKey, [ServiceKey, ServiceKey]> = {
  businessSystemsDesign: ["projectManagementOperations", "aiAutomation"],
  marketingSystems: ["premiumWebsitesDigitalExperience", "businessSystemsDesign"],
  aiAutomation: ["businessSystemsDesign", "projectManagementOperations"],
  projectManagementOperations: ["businessSystemsDesign", "aiAutomation"],
  premiumWebsitesDigitalExperience: ["marketingSystems", "businessSystemsDesign"],
};

export function getServiceKeyFromSlug(slug: string): ServiceKey | undefined {
  return SERVICE_KEYS.find((key) => SERVICE_SLUGS[key] === slug);
}
