'use client';

import React from 'react';
import { Wallet } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { DREAMY_KB, getDreamyCareer } from '@/content/dreamy-kb';
import { useSettingsStore } from '@/features/settings/useSettingsStore';

interface SalaryCardProps {
  careerKey?: string;
  onCompareCareer?: (careerKey: string) => void;
}

export function SalaryCard({
  careerKey = 'software-engineer',
  onCompareCareer,
}: SalaryCardProps) {
  const { locale } = useSettingsStore();

  const activeCareer = getCareerById(careerKey) ?? CAREERS[0];
  const dreamyEntry = getDreamyCareer(activeCareer.id) ?? DREAMY_KB['software-engineer'];

  const s = dreamyEntry.salaryRange;
  const MAX_SCALE = 22000;

  const rm = ([a, b]: [number, number]) =>
    `RM ${a.toLocaleString('en-MY')} – RM ${b.toLocaleString('en-MY')}`;
  const rmShort = ([a, b]: [number, number]) =>
    `RM ${Math.round(a / 1000)}k – ${Math.round(b / 1000)}k`;

  const t = {
    en: {
      title: (name: string) => `Starting salary: ${name}`,
      badge: 'Fresh graduate',
      perMonth: 'per month, estimated base pay',
      entry: 'Entry Level',
      entryYears: '0–2 years',
      mid: 'Mid Level',
      midYears: '3–5 years',
      senior: 'Senior Level',
      seniorYears: '6+ years',
      compareLabel: 'Compare with another track:',
      sourcePrefix: 'Source:',
    },
    ms: {
      title: (name: string) => `Gaji permulaan: ${name}`,
      badge: 'Graduan baharu',
      perMonth: 'sebulan, anggaran gaji asas',
      entry: 'Peringkat Permulaan',
      entryYears: '0–2 tahun',
      mid: 'Peringkat Pertengahan',
      midYears: '3–5 tahun',
      senior: 'Peringkat Kanan',
      seniorYears: '6+ tahun',
      compareLabel: 'Bandingkan dengan laluan lain:',
      sourcePrefix: 'Sumber:',
    },
  }[locale];

  const ranges = [
    {
      label: t.entry,
      years: t.entryYears,
      range: s.entry,
      widthPct: Math.min(100, Math.round((s.entry[1] / MAX_SCALE) * 100)),
      colorClass: 'bg-primary-container',
    },
    {
      label: t.mid,
      years: t.midYears,
      range: s.mid,
      widthPct: Math.min(100, Math.round((s.mid[1] / MAX_SCALE) * 100)),
      colorClass: 'bg-primary',
    },
    {
      label: t.senior,
      years: t.seniorYears,
      range: s.senior,
      widthPct: Math.min(100, Math.round((s.senior[1] / MAX_SCALE) * 100)),
      colorClass: 'bg-secondary',
    },
  ];

  const otherCareers = CAREERS.filter((c) => c.id !== activeCareer.id);

  return (
    <div className="bg-surface-container-lowest border border-hairline rounded-2xl p-5 shadow-soft space-y-5 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-hairline">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-secondary" aria-hidden="true" />
          <h3 className="text-base font-bold text-on-surface">
            {t.title(activeCareer.i18n[locale].title)}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="sage">{dreamyEntry.estimatedBadge}</Badge>
          <Badge variant="sky">{t.badge}</Badge>
        </div>
      </div>

      {/* Main Salary Callout */}
      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          {rm(s.entry)}
        </div>
        <p className="text-xs text-on-surface-variant mt-1">{t.perMonth}</p>
      </div>

      {/* 3 Salary Progression Tiers */}
      <div className="space-y-4 pt-1">
        {ranges.map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-on-surface">
                {row.label}{' '}
                <span className="font-normal text-on-surface-variant text-xs">
                  ({row.years})
                </span>
              </span>
              <span className="font-bold text-on-surface">{rmShort(row.range)}</span>
            </div>
            <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${row.colorClass}`}
                style={{ width: `${row.widthPct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Source Citation */}
      <div className="pt-2 text-[11px] text-outline flex items-center justify-between flex-wrap gap-2 border-t border-hairline">
        <span>
          {t.sourcePrefix} {dreamyEntry.salarySource}
        </span>
      </div>

      {/* Career switcher buttons */}
      {onCompareCareer && (
        <div className="space-y-2 pt-1 border-t border-hairline">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
            {t.compareLabel}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {otherCareers.map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant="secondary"
                onClick={() => onCompareCareer(c.id)}
                className="text-xs py-1 px-2.5 h-auto"
              >
                {c.i18n[locale].title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
