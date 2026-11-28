'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  MessageSquare,
  RotateCcw,
  Star,
  XCircle,
} from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { getScenariosByCareer, getScenarioById, SCENARIOS } from '@/content/scenarios';
import { getDictionary, pickLocalized, type Locale } from '@/lib/i18n';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import {
  applyScenarioChoice,
  computeScenarioTotalXp,
  createInitialScenarioSession,
  getScenarioNode,
  type ScenarioSessionState,
} from '@/features/practice/logic';

export function ScenarioPlayer() {
  const searchParams = useSearchParams();
  const { profile, completedActivityIds, completeActivity } = useProgressionStore();

  const locale: Locale = searchParams.get('lang') === 'ms' ? 'ms' : 'en';
  const dict = getDictionary(locale);

  const requestedCareer = searchParams.get('career') || profile.activeCareerId;
  const requestedId = searchParams.get('id');

  const availableScenarios = useMemo(() => {
    const byCareer = getScenariosByCareer(requestedCareer);
    return byCareer.length > 0 ? byCareer : SCENARIOS;
  }, [requestedCareer]);

  const [selectedId, setSelectedId] = useState<string | null>(requestedId);
  const scenario =
    (selectedId ? getScenarioById(selectedId) : undefined) ?? availableScenarios[0];

  const [session, setSession] = useState<ScenarioSessionState>(() =>
    scenario
      ? createInitialScenarioSession(scenario)
      : {
          currentNodeId: '',
          visitedChoiceIds: [],
          accumulatedImpacts: [],
          lastChoice: null,
        }
  );
  const [awardedXp, setAwardedXp] = useState<number | null>(null);

  if (!scenario) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <PageHeader title={dict.practice.simulationTitle} />
        <Card className="text-center py-10 space-y-4">
          <p className="text-sm text-on-surface-variant">{dict.practice.emptyState}</p>
          <Link href="/modes" className="text-sm font-bold text-primary hover:underline">
            {dict.practice.backToModes}
          </Link>
        </Card>
      </div>
    );
  }

  const scenarioMeta = pickLocalized(scenario.i18n, locale);
  const currentNode = getScenarioNode(scenario, session.currentNodeId);
  const nodeI18n = currentNode ? pickLocalized(currentNode.i18n, locale) : null;
  const isAlreadyCompleted = completedActivityIds.includes(scenario.id);

  const handleSelectScenario = (nextScenarioId: string) => {
    const nextScenario = getScenarioById(nextScenarioId);
    if (!nextScenario) return;
    setSelectedId(nextScenarioId);
    setSession(createInitialScenarioSession(nextScenario));
    setAwardedXp(null);
  };

  const handleChoose = (choiceId: string) => {
    const nextSession = applyScenarioChoice(session, scenario, choiceId);
    setSession(nextSession);

    const nextNode = getScenarioNode(scenario, nextSession.currentNodeId);
    if (nextNode?.type === 'terminal') {
      const totalXp = computeScenarioTotalXp(nextSession, nextNode);
      const result = completeActivity({
        activityId: scenario.id,
        xpReward: totalXp,
        skillImpacts: nextSession.accumulatedImpacts,
        missionCountDelta: 1,
      });
      setAwardedXp(result.awardedXp);
    }
  };

  const handleReset = () => {
    setSession(createInitialScenarioSession(scenario));
    setAwardedXp(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/modes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{dict.practice.backToModes}</span>
        </Link>

        {availableScenarios.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {availableScenarios.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={item.id === scenario.id ? 'primary' : 'secondary'}
                onClick={() => handleSelectScenario(item.id)}
              >
                {pickLocalized(item.i18n, locale).title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <PageHeader
        eyebrow={scenarioMeta.categoryBadge}
        title={scenarioMeta.title}
        subtitle={scenarioMeta.description}
        action={
          isAlreadyCompleted ? (
            <Badge variant="sage">{dict.practice.completedBadge}</Badge>
          ) : undefined
        }
      />

      {isAlreadyCompleted && awardedXp === null && (
        <Card variant="muted" padding="sm" className="text-xs font-medium text-on-surface-variant">
          {dict.practice.replayNotice}
        </Card>
      )}

      {session.lastChoice && (
        <Card
          variant="muted"
          padding="sm"
          className="flex items-start gap-3 border-primary-fixed-dim"
        >
          {session.lastChoice.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <XCircle className="w-5 h-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-on-surface">
              {pickLocalized(session.lastChoice.i18n, locale).label}
            </p>
            <p className="text-on-surface-variant">
              {pickLocalized(session.lastChoice.i18n, locale).explanation}
            </p>
            {session.lastChoice.skillImpacts.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {session.lastChoice.skillImpacts.map((imp, idx) => (
                  <Badge key={`${imp.skillId}-${idx}`} variant="sky" className="text-[11px]">
                    {imp.skillId}: +{imp.xp} XP
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {currentNode && nodeI18n && currentNode.type !== 'terminal' && (
        <Card className="space-y-5">
          {nodeI18n.npcDialogue && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-hairline">
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-on-surface">
                  {nodeI18n.npcName}
                  {nodeI18n.npcRole ? (
                    <span className="font-normal text-on-surface-variant">
                      {' '}
                      · {nodeI18n.npcRole}
                    </span>
                  ) : null}
                </p>
                <p className="text-sm text-on-surface-variant">{nodeI18n.npcDialogue}</p>
              </div>
            </div>
          )}

          {currentNode.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-hairline bg-inverse-surface text-inverse-on-surface">
              <div className="flex items-center justify-between px-4 py-2 border-b border-outline/30 text-xs">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  {currentNode.codeSnippet.filename}
                </span>
                {currentNode.codeSnippet.badge && (
                  <Badge variant="sage" className="text-[10px]">
                    {currentNode.codeSnippet.badge}
                  </Badge>
                )}
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{currentNode.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-base font-bold text-on-surface">{nodeI18n.prompt}</h2>
            <div className="grid gap-3">
              {(currentNode.choices ?? []).map((choice) => {
                const choiceText = pickLocalized(choice.i18n, locale);
                return (
                  <button
                    key={choice.choiceId}
                    type="button"
                    onClick={() => handleChoose(choice.choiceId)}
                    className="w-full text-left p-4 rounded-xl border border-hairline bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary transition-all cursor-pointer space-y-1.5"
                  >
                    <p className="text-sm font-semibold text-on-surface">{choiceText.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {choice.skillImpacts.map((imp, idx) => (
                        <Badge key={`${choice.choiceId}-${idx}`} variant="neutral">
                          {imp.skillId} +{imp.xp} XP
                        </Badge>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {currentNode && currentNode.type === 'terminal' && currentNode.terminalOutcome && (
        <Card variant="elevated" className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: currentNode.terminalOutcome.stars }).map((_, idx) => (
                <Star
                  key={idx}
                  className="w-5 h-5 text-on-sunshine-container fill-sunshine-container"
                  aria-hidden="true"
                />
              ))}
              <span className="text-xs font-bold text-on-surface-variant ml-1">
                {currentNode.terminalOutcome.stars}/3 {dict.practice.starsEarned}
              </span>
            </div>
            <Badge variant={awardedXp && awardedXp > 0 ? 'sage' : 'neutral'}>
              +{awardedXp ?? 0} {dict.common.xpLabel}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-on-surface">
              {pickLocalized(currentNode.terminalOutcome.i18n, locale).title}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {pickLocalized(currentNode.terminalOutcome.i18n, locale).summary}
            </p>
          </div>

          {awardedXp === 0 && (
            <p className="text-xs text-on-surface-variant">{dict.practice.replayNotice}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button onClick={handleReset} variant="primary">
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{dict.practice.playAgain}</span>
            </Button>
            <Link
              href="/modes"
              className="px-4 py-2.5 rounded-xl border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-sm font-semibold text-on-surface"
            >
              {dict.practice.backToModes}
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
