import type { StudyLessonContent } from "@/content/schemas";
import { FUTURE_DOCTOR_STUDIES } from "./future-doctor";
import { JUNIOR_LAWYER_STUDIES } from "./junior-lawyer";
import { MASTER_CHEF_STUDIES } from "./master-chef";
import { PRODUCT_DESIGNER_STUDIES } from "./product-designer";
import { SOFTWARE_ENGINEER_STUDIES } from "./software-engineer";

export const STUDY_LESSONS: StudyLessonContent[] = [
  ...SOFTWARE_ENGINEER_STUDIES,
  ...JUNIOR_LAWYER_STUDIES,
  ...FUTURE_DOCTOR_STUDIES,
  ...PRODUCT_DESIGNER_STUDIES,
  ...MASTER_CHEF_STUDIES,
];

export function getStudiesByCareer(careerId: string): StudyLessonContent[] {
  return STUDY_LESSONS.filter((lesson) => lesson.careerId === careerId);
}

export function getStudyById(id: string): StudyLessonContent | undefined {
  return STUDY_LESSONS.find((lesson) => lesson.id === id);
}
