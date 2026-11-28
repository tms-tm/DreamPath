import { describe, expect, it } from "vitest";
import { SCENARIOS } from "@/content/scenarios";
import { QUIZZES } from "@/content/quizzes";
import { STUDY_LESSONS } from "@/content/studies";
import { QuizSchema, ScenarioSchema, StudyLessonSchema } from "@/content/schemas";
import {
  applyScenarioChoice,
  computeScenarioTotalXp,
  createInitialScenarioSession,
  getScenarioNode,
  scoreQuizSubmission,
  validateScenarioGraph,
} from "@/features/practice/logic";

describe("scenario graph & practice registries", () => {
  it("validates every registered scenario with Zod and graph integrity checks", () => {
    expect(SCENARIOS.length).toBeGreaterThan(0);

    for (const scenario of SCENARIOS) {
      const schemaResult = ScenarioSchema.safeParse(scenario);
      expect(schemaResult.success, `Scenario ${scenario.id} failed Zod`).toBe(true);

      const graphResult = validateScenarioGraph(scenario);
      expect(
        graphResult.valid,
        `Scenario ${scenario.id} graph errors: ${graphResult.errors.join("; ")}`
      ).toBe(true);
      expect(graphResult.reachableNodeIds).toContain(scenario.startNodeId);
    }
  });

  it("detects dangling nextNodeId in malformed scenario graphs", () => {
    const broken = {
      ...SCENARIOS[0],
      nodes: [
        {
          ...SCENARIOS[0].nodes[0],
          choices: [
            {
              ...SCENARIOS[0].nodes[0].choices![0],
              nextNodeId: "non-existent-node",
            },
          ],
        },
      ],
    };

    const result = validateScenarioGraph(broken);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("non-existent-node"))).toBe(true);
  });

  it("traverses scenario choices and sums unique choice XP + terminal XP", () => {
    const scenario = SCENARIOS[0];
    let session = createInitialScenarioSession(scenario);

    session = applyScenarioChoice(session, scenario, "choice-param");
    expect(session.currentNodeId).toBe("node-2");

    session = applyScenarioChoice(session, scenario, "choice-hash");
    expect(session.currentNodeId).toBe("node-win");

    const terminalNode = getScenarioNode(scenario, session.currentNodeId);
    const totalXp = computeScenarioTotalXp(session, terminalNode);
    // 30 + 20 (choice-param) + 30 + 10 (choice-hash) + 30 (node-win) = 120 XP
    expect(totalXp).toBe(120);
  });

  it("validates registered quizzes and studies and scores quiz submissions", () => {
    for (const quiz of QUIZZES) {
      expect(QuizSchema.safeParse(quiz).success).toBe(true);
    }
    for (const study of STUDY_LESSONS) {
      expect(StudyLessonSchema.safeParse(study).success).toBe(true);
    }

    const quiz = QUIZZES[0];
    const allCorrect = Object.fromEntries(quiz.questions.map((q) => [q.id, q.correctLabel]));
    const score = scoreQuizSubmission(quiz, allCorrect);
    expect(score.correctCount).toBe(5);
    expect(score.xpAwarded).toBe(60);
    expect(score.stars).toBe(3);
  });
});
