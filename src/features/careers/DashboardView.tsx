'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Check,
  Clock,
  Code2,
  Flame,
  Map,
  Play,
  Sparkles,
  ThumbsUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { Badge, Button, Card, ProgressBar } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { DAILY_QUEST_XP, XP_PER_LEVEL } from '@/features/progression/math';
import { useProgressionStore } from '@/features/progression/useProgressionStore';

export function DashboardView() {
  const {
    profile,
    totalXp,
    simulatedSalary,
    completedQuests,
    completedActivityIds,
    completeQuest,
    skills,
  } = useProgressionStore();

  const [questStarted, setQuestStarted] = useState(false);
  const isQuestDone =
    completedQuests.includes('quest-btn-1') || completedActivityIds.includes('quest-btn-1');

  const activeCareer = getCareerById(profile.activeCareerId) ?? CAREERS[0];
  const xpIntoCurrentLevel = totalXp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - xpIntoCurrentLevel;
  const levelProgressPct = Math.round((xpIntoCurrentLevel / XP_PER_LEVEL) * 100);

  const skillEntries = [
    { key: 'problem-solving' as const, label: 'Problem Solving', tone: 'primary' as const },
    { key: 'javascript' as const, label: 'JavaScript', tone: 'secondary' as const },
    { key: 'html-css' as const, label: 'HTML & CSS', tone: 'primary' as const },
    { key: 'communication' as const, label: 'Communication', tone: 'tertiary' as const },
    { key: 'accessibility' as const, label: 'Accessibility', tone: 'secondary' as const },
  ];

  const handleStartDailyQuest = () => {
    setQuestStarted(true);
  };

  const handleFinishQuest = () => {
    completeQuest('quest-btn-1', DAILY_QUEST_XP);
    setQuestStarted(false);
  };

  return (
    <div className="space-y-7 max-w-7xl mx-auto w-full animate-fade-in" data-purpose="dashboard-main-content">
      {/* Stat Summary Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5" data-purpose="stat-metrics">
        <Card className="p-5 hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sunshine-container text-on-sunshine-container flex items-center justify-center">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-on-surface">
                {totalXp.toLocaleString()} XP
              </span>
            </div>
            <Badge variant="sky">Lv. {profile.currentLevel}</Badge>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-end text-[11px] font-medium text-on-surface-variant">
              <span>
                {xpToNextLevel} XP to Lv. {profile.currentLevel + 1}
              </span>
            </div>
            <ProgressBar value={levelProgressPct} label="XP progress to next level" />
          </div>
        </Card>

        <Card className="p-5 hover:shadow-card transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
              <Wallet className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-on-surface">
                RM {simulatedSalary.toLocaleString()}{' '}
                <span className="text-xs font-normal text-on-surface-variant">/mo</span>
              </div>
              <p className="text-xs font-medium text-on-surface-variant mt-0.5">
                Estimated (MY)
              </p>
            </div>
          </div>
          <Badge variant="sage">{activeCareer.i18n.en.title}</Badge>
        </Card>

        <Card className="p-5 hover:shadow-card transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary-container text-on-tertiary-fixed flex items-center justify-center">
              <Flame className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold text-on-surface">
                {profile.streakDays}-Day Streak
              </span>
              <p className="text-xs font-medium text-on-surface-variant mt-0.5">
                {profile.missionsCompleted} activities completed
              </p>
            </div>
          </div>
          <Badge variant="sunshine">
            <Zap className="w-3 h-3" aria-hidden="true" />
            Nebula
          </Badge>
        </Card>
      </section>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-tertiary-container/60 via-surface-container-low to-primary-container/60 border border-hairline p-8 md:p-10 shadow-soft"
        data-purpose="hero-banner"
      >
        <div className="relative z-10 max-w-xl">
          <Badge variant="sunshine" className="mb-4 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Nebula Tier · Ages 13–15
          </Badge>

          <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            {activeCareer.i18n.en.title}
          </h2>
          <p className="mt-2 text-sm md:text-base text-on-surface-variant leading-relaxed">
            {activeCareer.i18n.en.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/simulation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed text-sm font-bold shadow-soft transition-all"
            >
              <span>Continue your journey</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/paths"
              className="text-sm font-semibold text-on-surface hover:text-primary inline-flex items-center gap-1 transition-colors"
            >
              <span>Try other careers</span>
              <span className="text-xs font-bold">&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Middle Two Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-purpose="quest-and-roadmap">
        <Card className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="sunshine">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  DAILY QUEST
                </Badge>
                <Badge variant="sky">+{DAILY_QUEST_XP} XP</Badge>
              </div>
              <Badge variant="sage">{isQuestDone ? 'Completed' : 'Ready'}</Badge>
            </div>

            <div>
              <h3 className="text-lg font-bold text-on-surface">Fix the Missing Button</h3>
              <p className="mt-1 text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Inspect a responsive UI layout bug in the frontend simulation sandbox and restore the primary CTA button state.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low border border-hairline text-xs font-medium text-on-surface-variant">
                <Clock className="w-3.5 h-3.5 text-on-surface-variant" aria-hidden="true" />
                +{DAILY_QUEST_XP} XP · ~5 min
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low border border-hairline text-xs font-medium text-on-surface-variant">
                <Code2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                Front-End Sandbox
              </span>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-on-surface mb-1.5">
                <span>Daily Progress</span>
                <span className="text-on-surface-variant font-medium">
                  {isQuestDone ? '1/1 Quests Done' : '0/1 Quest'}
                </span>
              </div>
              <ProgressBar value={isQuestDone ? 100 : 0} label="Daily quest progress" />
            </div>

            {questStarted && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-hairline space-y-3">
                <div className="text-xs font-bold text-primary uppercase">
                  Interactive Front-End Sandbox
                </div>
                <div className="p-3 bg-inverse-surface text-secondary-container font-mono text-xs rounded-lg">
                  &lt;button type=&quot;submit&quot; aria-label=&quot;Join Study Club&quot;&gt;Join Study Club&lt;/button&gt;
                </div>
                <Button onClick={handleFinishQuest} className="w-full" size="sm">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Deploy &amp; Claim +{DAILY_QUEST_XP} XP</span>
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6">
            {isQuestDone ? (
              <div className="w-full py-2.5 rounded-xl bg-secondary-container border border-secondary-fixed-dim text-on-secondary-fixed text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Mission Completed (+{DAILY_QUEST_XP} XP)</span>
              </div>
            ) : !questStarted ? (
              <Button onClick={handleStartDailyQuest} className="w-full">
                <Play className="w-4 h-4" aria-hidden="true" />
                <span>Start Quest</span>
              </Button>
            ) : null}
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-fixed flex items-center justify-center">
                  <Map className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-on-surface">Your Career Roadmap</h3>
              </div>
              <Badge variant="sky">{activeCareer.i18n.en.title}</Badge>
            </div>

            <div className="bg-surface-container-low border border-hairline rounded-xl p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-on-surface-variant">Completed Activities</span>
                <span className="text-primary font-bold text-sm">
                  {completedActivityIds.length} done
                </span>
              </div>
              <ProgressBar
                value={Math.min(100, completedActivityIds.length * 10)}
                label="Career roadmap completion"
              />
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary-container border border-secondary-fixed-dim flex items-center justify-center text-on-secondary-fixed flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Key SPM Subjects
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-on-surface">
                    {activeCareer.i18n.en.spmSubjects.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-container border border-primary-fixed-dim flex items-center justify-center text-on-primary-fixed flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Malaysian Universities
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-on-surface">
                    {activeCareer.i18n.en.uniExamples.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/paths"
              className="w-full py-2.5 rounded-xl border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
              <span>View Full Roadmap</span>
            </Link>
          </div>
        </Card>
      </section>

      {/* Bottom Two Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-purpose="skills-and-recommendations">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-sunshine-container text-on-sunshine-container flex items-center justify-center">
                <BarChart3 className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-on-surface">Your Skill Progress</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-6">
              Track the skills you&apos;re developing across study lessons, quizzes, and scenarios.
            </p>

            <div className="space-y-4">
              {skillEntries.map((item) => {
                const progress = skills[item.key] ?? { xp: 0, competency: 0 };
                return (
                  <div key={item.key}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-on-surface">{item.label}</span>
                      <span className="text-primary font-bold">
                        {progress.competency}% ({progress.xp} XP)
                      </span>
                    </div>
                    <ProgressBar
                      value={progress.competency}
                      label={`${item.label} competency`}
                      tone={item.tone}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 text-center border-t border-hairline">
            <Link
              href="/profile"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Skills</span>
              <span className="text-xs">&gt;</span>
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
                <ThumbsUp className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-on-surface">Recommended for You</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              Core loop activities for {activeCareer.i18n.en.title}.
            </p>

            <div className="space-y-2.5">
              <div className="bg-surface-container-low border border-hairline rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-on-surface truncate">
                      Read a Study Lesson
                    </h4>
                    <Badge variant="sky" className="text-[10px] px-2 py-0.5">
                      Study · +30 XP
                    </Badge>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                    Short bilingual notes with key terms and read-aloud
                  </p>
                </div>
                <Link
                  href="/modes/study"
                  className="px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed text-xs font-bold flex-shrink-0 transition-colors"
                >
                  Study
                </Link>
              </div>

              <div className="bg-surface-container-low border border-hairline rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-on-surface truncate">
                      Take a 5-Question Quiz
                    </h4>
                    <Badge variant="sage" className="text-[10px] px-2 py-0.5">
                      Quiz · +20–60 XP
                    </Badge>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                    Instant feedback and star ratings
                  </p>
                </div>
                <Link
                  href="/modes/quiz"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-hairline hover:bg-surface-container text-on-surface text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Quiz
                </Link>
              </div>

              <div className="bg-surface-container-low border border-hairline rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-on-surface truncate">
                      Run a Workplace Scenario
                    </h4>
                    <Badge variant="blush" className="text-[10px] px-2 py-0.5">
                      Simulation · up to 120 XP
                    </Badge>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                    Make branching decisions with mentor feedback
                  </p>
                </div>
                <Link
                  href="/simulation"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-hairline hover:bg-surface-container text-on-surface text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Simulate
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 text-center border-t border-hairline">
            <Link
              href="/modes"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 transition-colors"
            >
              <span>View Practice Modes</span>
              <span className="text-xs">&gt;</span>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
