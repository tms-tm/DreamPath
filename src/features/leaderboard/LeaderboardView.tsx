'use client';

import React, { useMemo, useState } from 'react';
import { Trophy, Wallet } from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { LEADERBOARD_ENTRIES, type LeaderboardEntry } from '@/data/leaderboard';
import { useProgressionStore } from '@/features/progression/useProgressionStore';

export function LeaderboardView() {
  const { profile, totalXp, simulatedSalary } = useProgressionStore();
  const [selectedCareerId, setSelectedCareerId] = useState<string>('all');

  const rankedEntries = useMemo(() => {
    const currentUserEntry: LeaderboardEntry = {
      username: profile.handle || profile.name,
      avatarChar: profile.avatarChar || 'D',
      totalXp,
      simulatedSalary,
      activeCareerId: profile.activeCareerId,
      isCurrentUser: true,
    };

    const combined = [...LEADERBOARD_ENTRIES, currentUserEntry];
    const filtered =
      selectedCareerId === 'all'
        ? combined
        : combined.filter((entry) => entry.activeCareerId === selectedCareerId);

    return filtered.sort((a, b) => b.totalXp - a.totalXp);
  }, [profile.handle, profile.name, profile.avatarChar, profile.activeCareerId, totalXp, simulatedSalary, selectedCareerId]);

  const userRank = rankedEntries.findIndex((e) => e.isCurrentUser) + 1;

  return (
    <div className="flex flex-col w-full gap-7 animate-fade-in max-w-7xl mx-auto pb-12">
      <PageHeader
        eyebrow="Virtual Salary Benchmark · Nebula Tier"
        title="Dreamers Leaderboard"
        subtitle="Anonymized usernames and virtual monthly RM earnings across all 5 DreamPath career tracks."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
              Your Current Rank
            </span>
            <p className="text-2xl font-bold text-on-surface mt-0.5">
              {userRank > 0 ? `#${userRank}` : '—'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-container text-on-primary-fixed flex items-center justify-center">
            <Trophy className="w-5 h-5" aria-hidden="true" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
              Virtual Monthly Salary
            </span>
            <p className="text-2xl font-bold text-secondary mt-0.5">
              RM {simulatedSalary.toLocaleString()}{' '}
              <span className="text-xs font-normal text-on-surface-variant">/mo</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
            <Wallet className="w-5 h-5" aria-hidden="true" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
              Total XP
            </span>
            <p className="text-2xl font-bold text-on-surface mt-0.5">
              {totalXp.toLocaleString()} XP
            </p>
          </div>
          <Badge variant="sunshine">Estimated (MY)</Badge>
        </Card>
      </div>

      {/* Career Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedCareerId === 'all' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCareerId('all')}
        >
          All Careers
        </Button>
        {CAREERS.map((career) => (
          <Button
            key={career.id}
            size="sm"
            variant={selectedCareerId === career.id ? 'primary' : 'secondary'}
            onClick={() => setSelectedCareerId(career.id)}
          >
            {career.i18n.en.title}
          </Button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface-container-low text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-5">Rank</th>
                <th className="py-3.5 px-5">Dreamer</th>
                <th className="py-3.5 px-5">Career Track</th>
                <th className="py-3.5 px-5 text-right">Total XP</th>
                <th className="py-3.5 px-5 text-right">Virtual Salary (RM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline text-sm">
              {rankedEntries.map((entry, idx) => {
                const career = getCareerById(entry.activeCareerId);
                return (
                  <tr
                    key={`${entry.username}-${idx}`}
                    className={
                      entry.isCurrentUser
                        ? 'bg-primary-container/35 font-semibold'
                        : 'hover:bg-surface-container-low/60 transition-colors'
                    }
                  >
                    <td className="py-3.5 px-5 font-bold text-on-surface">#{idx + 1}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-xs flex items-center justify-center shrink-0">
                          {entry.avatarChar}
                        </div>
                        <span className="text-on-surface">{entry.username}</span>
                        {entry.isCurrentUser && <Badge variant="sky">You</Badge>}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-on-surface-variant">
                      {career?.i18n.en.title ?? entry.activeCareerId}
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-on-surface">
                      {entry.totalXp.toLocaleString()} XP
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-secondary">
                      RM {entry.simulatedSalary.toLocaleString()} /mo
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
