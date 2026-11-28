import type {
  QuizContent,
  ScenarioChoiceContent,
  ScenarioContent,
  ScenarioNodeContent,
  SkillIdSchema,
} from "@/content/schemas";
import {
  computeQuizStars,
  computeQuizXp,
  type SkillImpact,
} from "@/features/progression/math";
import type { z } from "zod";

export type PracticeSkillId = z.infer<typeof SkillIdSchema>;

export interface GraphValidationResult {
  valid: boolean;
  errors: string[];
  reachableNodeIds: string[];
}

/**
 * Validates scenario graph integrity:
 * - startNodeId exists
 * - every choice nextNodeId points to an existing node
 * - non-terminal nodes have at least 1 choice
 * - terminal nodes have terminalOutcome
 * - at least one terminal node is reachable from startNodeId
 */
export function validateScenarioGraph(scenario: ScenarioContent): GraphValidationResult {
  const errors: string[] = [];
  const nodeMap = new Map<string, ScenarioNodeContent>(
    scenario.nodes.map((node) => [node.nodeId, node])
  );

  if (!nodeMap.has(scenario.startNodeId)) {
    errors.push(`startNodeId "${scenario.startNodeId}" does not exist in nodes.`);
    return { valid: false, errors, reachableNodeIds: [] };
  }

  for (const node of scenario.nodes) {
    if (node.type === "terminal") {
      if (!node.terminalOutcome) {
        errors.push(`Terminal node "${node.nodeId}" is missing terminalOutcome.`);
      }
    } else if (!node.choices || node.choices.length === 0) {
      errors.push(`Non-terminal node "${node.nodeId}" must define at least one choice.`);
    }

    for (const choice of node.choices ?? []) {
      if (!nodeMap.has(choice.nextNodeId)) {
        errors.push(
          `Choice "${choice.choiceId}" on node "${node.nodeId}" points to missing nextNodeId "${choice.nextNodeId}".`
        );
      }
    }
  }

  // BFS reachability from startNodeId
  const visited = new Set<string>();
  const queue: string[] = [scenario.startNodeId];
  let reachableTerminalCount = 0;

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = nodeMap.get(currentId);
    if (!node) continue;

    if (node.type === "terminal") {
      reachableTerminalCount += 1;
    }

    for (const choice of node.choices ?? []) {
      if (nodeMap.has(choice.nextNodeId) && !visited.has(choice.nextNodeId)) {
        queue.push(choice.nextNodeId);
      }
    }
  }

  if (reachableTerminalCount === 0) {
    errors.push(`Scenario "${scenario.id}" has no reachable terminal node from startNodeId.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    reachableNodeIds: Array.from(visited),
  };
}

export interface ScenarioSessionState {
  currentNodeId: string;
  visitedChoiceIds: string[];
  accumulatedImpacts: SkillImpact[];
  lastChoice: ScenarioChoiceContent | null;
}

export function createInitialScenarioSession(scenario: ScenarioContent): ScenarioSessionState {
  return {
    currentNodeId: scenario.startNodeId,
    visitedChoiceIds: [],
    accumulatedImpacts: [],
    lastChoice: null,
  };
}

export function getScenarioNode(
  scenario: ScenarioContent,
  nodeId: string
): ScenarioNodeContent | undefined {
  return scenario.nodes.find((n) => n.nodeId === nodeId);
}

export function applyScenarioChoice(
  session: ScenarioSessionState,
  scenario: ScenarioContent,
  choiceId: string
): ScenarioSessionState {
  const currentNode = getScenarioNode(scenario, session.currentNodeId);
  const choice = currentNode?.choices?.find((c) => c.choiceId === choiceId);
  if (!choice) return session;

  const isFirstVisit = !session.visitedChoiceIds.includes(choice.choiceId);
  return {
    currentNodeId: choice.nextNodeId,
    visitedChoiceIds: isFirstVisit
      ? [...session.visitedChoiceIds, choice.choiceId]
      : session.visitedChoiceIds,
    accumulatedImpacts: isFirstVisit
      ? [...session.accumulatedImpacts, ...choice.skillImpacts]
      : session.accumulatedImpacts,
    lastChoice: choice,
  };
}

export function computeScenarioTotalXp(
  session: ScenarioSessionState,
  terminalNode?: ScenarioNodeContent
): number {
  const choiceXp = session.accumulatedImpacts.reduce((sum, imp) => sum + Math.max(0, imp.xp), 0);
  const terminalXp = terminalNode?.terminalOutcome?.xpReward ?? 0;
  return choiceXp + terminalXp;
}

export interface QuizScoreResult {
  correctCount: number;
  totalQuestions: number;
  xpAwarded: number;
  stars: 1 | 2 | 3;
  skillImpacts: SkillImpact[];
}

export function scoreQuizSubmission(
  quiz: QuizContent,
  selectedAnswers: Record<string, string>
): QuizScoreResult {
  let correctCount = 0;
  const skillImpacts: SkillImpact[] = [];

  for (const question of quiz.questions) {
    const picked = selectedAnswers[question.id];
    const isCorrect = picked === question.correctLabel;
    if (isCorrect) {
      correctCount += 1;
      skillImpacts.push({
        skillId: question.skillId,
        xp: 8,
        competencyDelta: 3,
      });
    }
  }

  const totalQuestions = quiz.questions.length;
  return {
    correctCount,
    totalQuestions,
    xpAwarded: computeQuizXp(correctCount, totalQuestions),
    stars: computeQuizStars(correctCount, totalQuestions),
    skillImpacts,
  };
}
