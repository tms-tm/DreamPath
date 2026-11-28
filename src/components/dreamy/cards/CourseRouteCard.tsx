'use client';

import React, { useState } from 'react';
import { Check, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { DREAMY_KB, getDreamyCareer } from '@/content/dreamy-kb';
import { useSettingsStore } from '@/features/settings/useSettingsStore';

interface CourseRouteCardProps {
  careerKey?: string;
  initialUni?: string;
}

export function CourseRouteCard({
  careerKey = 'software-engineer',
  initialUni,
}: CourseRouteCardProps) {
  const { locale } = useSettingsStore();

  const activeCareer = getCareerById(careerKey) ?? CAREERS[0];
  const dreamyEntry = getDreamyCareer(activeCareer.id) ?? DREAMY_KB['software-engineer'];

  const routes = dreamyEntry.routes;
  const initialKey =
    initialUni && routes.some((r) => r.uniKey === initialUni)
      ? initialUni
      : routes[0]?.uniKey ?? 'um';

  const [selectedUniKey, setSelectedUniKey] = useState(initialKey);

  const selectedRoute =
    routes.find((r) => r.uniKey === selectedUniKey) ?? routes[0];

  const t = {
    en: {
      title: (name: string) => `How to become a ${name}`,
      public: 'Public University',
      private: 'Private University',
      spmTitle: "From SPM, you'll usually need:",
      pathwayTitle: 'Study Pathway',
      step1: 'Step 1: Pre-U / Foundation',
      step2: 'Step 2: University Degree',
      duration: 'Duration:',
    },
    ms: {
      title: (name: string) => `Laluan menjadi seorang ${name}`,
      public: 'Universiti Awam',
      private: 'Universiti Swasta',
      spmTitle: 'Kelayakan lazim lepasan SPM:',
      pathwayTitle: 'Laluan Pengajian',
      step1: 'Langkah 1: Pra-U / Asasi / Diploma',
      step2: 'Langkah 2: Ijazah Sarjana Muda',
      duration: 'Tempoh:',
    },
  }[locale];

  if (!selectedRoute) return null;

  return (
    <div className="bg-surface-container-lowest border border-hairline rounded-2xl p-5 shadow-soft space-y-4 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-hairline">
        <h3 className="text-base font-bold text-on-surface">
          {t.title(activeCareer.i18n[locale].title)}
        </h3>
        <Badge variant={selectedRoute.uniType === 'public' ? 'sky' : 'sage'}>
          {selectedRoute.uniType === 'public' ? t.public : t.private}
        </Badge>
      </div>

      {/* University Tabs */}
      <div className="flex flex-wrap gap-2">
        {routes.map((route) => {
          const isSelected = route.uniKey === selectedRoute.uniKey;
          return (
            <button
              key={route.uniKey}
              type="button"
              onClick={() => setSelectedUniKey(route.uniKey)}
              className={`py-1.5 px-3 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-container text-on-primary-fixed border border-primary/20 shadow-soft'
                  : 'bg-surface-container-low text-on-surface-variant border border-hairline hover:bg-surface-container'
              }`}
            >
              {route.uniName}
            </button>
          );
        })}
      </div>

      {/* University Note Line */}
      <div className="text-xs text-on-surface bg-surface-container-low p-3 rounded-xl border border-hairline flex items-start gap-2.5">
        <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <span>{selectedRoute.i18n[locale].applicationNote}</span>
      </div>

      {/* SPM Requirements */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          {t.spmTitle}
        </h4>
        <div className="space-y-1.5 text-xs sm:text-sm text-on-surface">
          {selectedRoute.i18n[locale].spmRequirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway Steps (Pre-U and Degree) */}
      <div className="space-y-2 pt-2 border-t border-hairline">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          {t.pathwayTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-hairline flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                {t.step1}
              </span>
              <p className="text-xs sm:text-sm font-bold text-on-surface mt-1">
                {selectedRoute.i18n[locale].preU.name}
              </p>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              {t.duration} {selectedRoute.i18n[locale].preU.duration}
            </span>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-hairline flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wide">
                {t.step2}
              </span>
              <p className="text-xs sm:text-sm font-bold text-on-surface mt-1">
                {selectedRoute.i18n[locale].degree.name}
              </p>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              {t.duration} {selectedRoute.i18n[locale].degree.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
