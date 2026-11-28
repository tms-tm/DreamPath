import type { ScenarioContent } from "@/content/schemas";
import { FUTURE_DOCTOR_SCENARIOS } from "./future-doctor";
import { JUNIOR_LAWYER_SCENARIOS } from "./junior-lawyer";
import { MASTER_CHEF_SCENARIOS } from "./master-chef";
import { PRODUCT_DESIGNER_SCENARIOS } from "./product-designer";
import { SOFTWARE_ENGINEER_SCENARIOS } from "./software-engineer";

export const SCENARIOS: ScenarioContent[] = [
  ...SOFTWARE_ENGINEER_SCENARIOS,
  ...JUNIOR_LAWYER_SCENARIOS,
  ...FUTURE_DOCTOR_SCENARIOS,
  ...PRODUCT_DESIGNER_SCENARIOS,
  ...MASTER_CHEF_SCENARIOS,
];

export function getScenariosByCareer(careerId: string): ScenarioContent[] {
  return SCENARIOS.filter((scenario) => scenario.careerId === careerId);
}

export function getScenarioById(id: string): ScenarioContent | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
