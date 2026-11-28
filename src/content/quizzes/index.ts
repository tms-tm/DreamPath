import type { QuizContent } from "../schemas";
import { FUTURE_DOCTOR_QUIZZES } from "./future-doctor";
import { JUNIOR_LAWYER_QUIZZES } from "./junior-lawyer";
import { MASTER_CHEF_QUIZZES } from "./master-chef";
import { PRODUCT_DESIGNER_QUIZZES } from "./product-designer";
import { SOFTWARE_ENGINEER_QUIZZES } from "./software-engineer";

export const QUIZZES: QuizContent[] = [
  ...SOFTWARE_ENGINEER_QUIZZES,
  ...JUNIOR_LAWYER_QUIZZES,
  ...FUTURE_DOCTOR_QUIZZES,
  ...PRODUCT_DESIGNER_QUIZZES,
  ...MASTER_CHEF_QUIZZES,
];

export function getQuizzesByCareer(careerId: string): QuizContent[] {
  return QUIZZES.filter((q) => q.careerId === careerId);
}

export function getQuizById(id: string): QuizContent | undefined {
  return QUIZZES.find((q) => q.id === id);
}
