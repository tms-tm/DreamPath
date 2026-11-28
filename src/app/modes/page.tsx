'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Flame, HelpCircle, Play, Sparkles, Zap } from 'lucide-react';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { getCareerById, CAREERS } from '@/content/careers';
import { getQuizzesByCareer, QUIZZES } from '@/content/quizzes';
import { getScenariosByCareer, SCENARIOS } from '@/content/scenarios';
import { getStudiesByCareer, STUDY_LESSONS } from '@/content/studies';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function PracticeModesPage() {
  const { profile, totalXp, completedActivityIds } = useProgressionStore();
  const activeCareer = getCareerById(profile.activeCareerId) ?? CAREERS[0];

  const careerStudies = getStudiesByCareer(activeCareer.id);
  const careerQuizzes = getQuizzesByCareer(activeCareer.id);
  const careerScenarios = getScenariosByCareer(activeCareer.id);

  const studyPool = careerStudies.length > 0 ? careerStudies : STUDY_LESSONS;
  const quizPool = careerQuizzes.length > 0 ? careerQuizzes : QUIZZES;
  const scenarioPool = careerScenarios.length > 0 ? careerScenarios : SCENARIOS;

  const completedStudies = studyPool.filter((s) => completedActivityIds.includes(s.id)).length;
  const completedQuizzes = quizPool.filter((q) => completedActivityIds.includes(q.id)).length;
  const completedScenarios = scenarioPool.filter((s) =>
    completedActivityIds.includes(s.id)
  ).length;

  const dailyTargetXp = 250;
  const dailyProgressPct = Math.min(100, Math.round((totalXp / dailyTargetXp) * 100));

  return (
    <div className="flex flex-col w-full gap-7 pb-16 animate-fade-in max-w-7xl mx-auto">
      <PageHeader
        eyebrow="Interactive Learning Hubs · Nebula Tier"
        title="Practice Modes & Skill Labs"
        subtitle={`Learn foundational theory, test your knowledge in 5-question quizzes, or run workplace simulations for ${activeCareer.i18n.en.title}.`}
      />

      {/* Daily Target Tracker */}
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-fixed flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Current Streak
              </span>
              <span className="text-base font-bold text-on-surface">
                {profile.streakDays} Days in a Row
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Total XP Milestone
            </span>
            <p className="text-base font-bold text-on-surface">
              {totalXp.toLocaleString()}{' '}
              <span className="text-xs font-normal text-on-surface-variant">
                / {dailyTargetXp} XP
              </span>
            </p>
          </div>
        </div>

        <ProgressBar value={dailyProgressPct} label="XP milestone progress" />
      </Card>

      {/* 3 Primary Game Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Study Mode */}
        <Card className="flex flex-col justify-between hover:shadow-card transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-fixed shrink-0">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>
              <Badge variant="sky">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                +30 XP / Lesson
              </Badge>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Theory &amp; Context
              </span>
              <h2 className="text-xl font-bold text-on-surface">Study Mode</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Read bite-sized bilingual lessons, explore key terms, and listen with read-aloud narration.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-semibold">Completed</span>
                <span className="text-primary font-bold">
                  {completedStudies} / {studyPool.length} lessons
                </span>
              </div>
              <ProgressBar
                value={completedStudies}
                max={studyPool.length || 1}
                label="Study lessons completed"
              />
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/modes/study"
              className="w-full py-3 px-4 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Read Study Notes</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>

        {/* Quiz Mode */}
        <Card className="flex flex-col justify-between hover:shadow-card transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
                <HelpCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <Badge variant="sage">+20–60 XP · 5 Qs</Badge>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Knowledge Checkpoint
              </span>
              <h2 className="text-xl font-bold text-on-surface">Quiz Mode</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                5-question checkpoints tailored to Nebula tier (Ages 13–15) with instant feedback and star ratings.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-semibold">Completed</span>
                <span className="text-secondary font-bold">
                  {completedQuizzes} / {quizPool.length} quizzes
                </span>
              </div>
              <ProgressBar
                value={completedQuizzes}
                max={quizPool.length || 1}
                label="Quizzes completed"
                tone="secondary"
              />
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/modes/quiz"
              className="w-full py-3 px-4 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Start 5-Question Quiz</span>
              <Play className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>

        {/* Simulation Mode */}
        <Card className="flex flex-col justify-between hover:shadow-card transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-on-tertiary-fixed shrink-0">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>
              <Badge variant="blush">Workplace · up to 120 XP</Badge>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Branching Narrative
              </span>
              <h2 className="text-xl font-bold text-on-surface">Simulation Mode</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Step into realistic workplace scenarios with mentor guidance and see how your choices shape outcomes.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-semibold">Completed</span>
                <span className="text-tertiary font-bold">
                  {completedScenarios} / {scenarioPool.length} scenarios
                </span>
              </div>
              <ProgressBar
                value={completedScenarios}
                max={scenarioPool.length || 1}
                label="Scenarios completed"
                tone="tertiary"
              />
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/simulation"
              className="w-full py-3 px-4 bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Simulation</span>
              <Play className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
