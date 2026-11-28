'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { DREAMY_KB } from '@/content/dreamy-kb';
import { useProfileStore } from '@/features/profile/useProfileStore';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { useSettingsStore } from '@/features/settings/useSettingsStore';

interface CareerMatchesCardProps {
  onSelectRoute?: (careerId: string) => void;
}

export function CareerMatchesCard({ onSelectRoute }: CareerMatchesCardProps) {
  const { skills } = useProgressionStore();
  const { activeCareerId } = useProfileStore();
  const { locale } = useSettingsStore();

  // Score each career by how developed the user's competency is in its core skills
  const scored = CAREERS.map((career) => {
    const totalCompetency = career.coreSkills.reduce((sum, skillId) => {
      return sum + (skills[skillId]?.competency ?? 0);
    }, 0);
    const avgCompetency = totalCompetency / career.coreSkills.length;
    // Boost active career slightly for relevance
    const boost = career.id === activeCareerId ? 15 : 0;
    const score = Math.round(avgCompetency + boost);
    const activeSkillsCount = career.coreSkills.filter(
      (s) => (skills[s]?.competency ?? 0) > 0 || (skills[s]?.xp ?? 0) > 0
    ).length;

    return {
      career,
      score,
      matchedSkillsCount: Math.max(1, Math.min(career.coreSkills.length, activeSkillsCount || 2)),
      totalSkillsCount: career.coreSkills.length,
    };
  });

  // Sort descending by score, take top 3
  const top3 = [...scored].sort((a, b) => b.score - a.score).slice(0, 3);

  const t = {
    en: {
      header: 'Your top 3 career matches',
      badge: 'Based on your Practice skills',
      skillsLabel: (matched: number, total: number) => `${matched} of ${total} skills developed`,
      seeRoute: 'See pathway',
    },
    ms: {
      header: '3 padanan kerjaya terbaik anda',
      badge: 'Berdasarkan kemahiran Latihan anda',
      skillsLabel: (matched: number, total: number) => `${matched} daripada ${total} kemahiran dipelajari`,
      seeRoute: 'Lihat laluan',
    },
  }[locale];

  return (
    <div className="bg-surface-container-lowest border border-hairline rounded-2xl p-5 shadow-soft space-y-4 max-w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-hairline">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-base font-bold text-on-surface">{t.header}</h3>
        </div>
        <Badge variant="sky">{t.badge}</Badge>
      </div>

      {/* 3 Match Rows */}
      <div className="divide-y divide-hairline">
        {top3.map(({ career, matchedSkillsCount, totalSkillsCount }, index) => {
          const rank = index + 1;
          const dreamyEntry = DREAMY_KB[career.id];
          const title = career.i18n[locale].title;
          const reason =
            dreamyEntry?.i18n[locale].matchReason ?? career.i18n[locale].subtitle;

          return (
            <div
              key={career.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-1 last:pb-1"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Rank badge */}
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    rank === 1
                      ? 'bg-primary text-on-primary'
                      : 'bg-primary-container text-on-primary-fixed'
                  }`}
                >
                  {rank}
                </span>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-on-surface">{title}</h4>
                    {career.id === activeCareerId && (
                      <Badge variant="sage">Active Track</Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {reason}
                  </p>
                </div>
              </div>

              {/* Meter & Link */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-2 h-2 rounded-full ${
                          dotIdx < matchedSkillsCount ? 'bg-primary' : 'bg-hairline'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">
                    {t.skillsLabel(matchedSkillsCount, totalSkillsCount)}
                  </span>
                </div>

                {onSelectRoute && (
                  <button
                    type="button"
                    onClick={() => onSelectRoute(career.id)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer pt-0.5"
                  >
                    <span>{t.seeRoute}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
