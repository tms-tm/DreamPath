'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Compass, Flame, RotateCcw, Shield, Wallet } from 'lucide-react';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { XP_PER_LEVEL } from '@/features/progression/math';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { useProfileStore } from '@/features/profile/useProfileStore';

export default function ProfilePage() {
  const { profile, totalXp, simulatedSalary, skills, completedActivityIds } = useProgressionStore();
  const { nickname, activeCareerId } = useProfileStore();
  const activeCareer = getCareerById(activeCareerId) ?? CAREERS[0];

  const xpIntoLevel = totalXp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - xpIntoLevel;
  const levelPct = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100);

  const skillEntries = [
    { key: 'problem-solving' as const, name: 'Problem Solving' },
    { key: 'html-css' as const, name: 'HTML & CSS' },
    { key: 'communication' as const, name: 'Communication' },
    { key: 'javascript' as const, name: 'JavaScript' },
    { key: 'accessibility' as const, name: 'Accessibility' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 pb-24 flex flex-col gap-7 animate-fade-in">
      <PageHeader
        eyebrow={`Nebula Tier · Lv. ${profile.currentLevel}`}
        title={nickname}
        subtitle={`Target career: ${activeCareer.i18n.en.title}`}
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/onboarding/quiz"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retake Personality Quiz</span>
            </Link>
            <Link
              href="/paths"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed transition-colors"
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Switch Career</span>
            </Link>
          </div>
        }
      />

      {/* Stat Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
            <span>TOTAL XP</span>
            <Award className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-on-surface">{totalXp.toLocaleString()} XP</div>
          <ProgressBar value={levelPct} label="XP to next level" />
          <p className="text-xs text-on-surface-variant">
            {xpToNextLevel} XP to Level {profile.currentLevel + 1}
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
            <span>SIMULATED SALARY</span>
            <Wallet className="w-4 h-4 text-secondary" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-on-surface">
            RM {simulatedSalary.toLocaleString()}{' '}
            <span className="text-sm font-normal text-on-surface-variant">/mo</span>
          </div>
          <Badge variant="sage">Estimated (MY)</Badge>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
            <span>ACTIVITIES DONE</span>
            <Shield className="w-4 h-4 text-tertiary" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-on-surface">
            {completedActivityIds.length}
          </div>
          <p className="text-xs text-on-surface-variant">Lessons, quizzes &amp; scenarios</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
            <span>LEARNING STREAK</span>
            <Flame className="w-4 h-4 text-on-sunshine-container" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-on-surface">{profile.streakDays} days</div>
          <p className="text-xs text-on-surface-variant">Keep exploring daily</p>
        </Card>
      </section>

      {/* Skills Breakdown */}
      <Card className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Skills Developed in DreamPath</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Synced automatically from your completed lessons, quizzes, and scenarios.
          </p>
        </div>
        <div className="space-y-4">
          {skillEntries.map((item) => {
            const s = skills[item.key] ?? { xp: 0, competency: 0 };
            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-on-surface">{item.name}</span>
                  <span className="text-on-surface-variant">
                    {s.competency}% · {s.xp} XP
                  </span>
                </div>
                <ProgressBar value={s.competency} label={`${item.name} competency`} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
