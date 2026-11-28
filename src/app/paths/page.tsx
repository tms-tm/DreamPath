'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, Play, Sparkles, Wallet } from 'lucide-react';
import { Badge, Card, PageHeader } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function ExploreCareersPage() {
  const { profile, setActiveCareer } = useProgressionStore();
  const activeCareer = getCareerById(profile.activeCareerId) ?? CAREERS[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full animate-fade-in" data-purpose="dashboard-content-body">
      <PageHeader
        eyebrow="Malaysia Career Navigator · Nebula Tier (Form 1–3)"
        title="Explore Careers"
        subtitle="Compare all 5 DreamPath career tracks, Malaysian SPM subjects, university routes, and estimated monthly salaries."
      />

      {/* Active Career Summary */}
      <Card className="space-y-5" data-purpose="active-career-roadmap">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-hairline gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-on-surface">{activeCareer.i18n.en.title}</h2>
              <Badge variant="sky">Active Track</Badge>
              <Badge variant="sage">Estimated (MY)</Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              {activeCareer.i18n.en.description}
            </p>
          </div>
          <Link
            href="/simulation"
            className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed text-xs font-bold transition-all inline-flex items-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>Launch Simulation</span>
          </Link>
        </div>

        {/* Salary Bands */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-hairline">
            <span className="text-xs font-medium text-on-surface-variant">Entry Level (MY)</span>
            <div className="text-lg font-bold text-on-surface mt-1">
              RM {activeCareer.salaryRange.entry[0].toLocaleString()} – RM{' '}
              {activeCareer.salaryRange.entry[1].toLocaleString()} /mo
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-hairline">
            <span className="text-xs font-medium text-on-surface-variant">Mid Level (MY)</span>
            <div className="text-lg font-bold text-on-surface mt-1">
              RM {activeCareer.salaryRange.mid[0].toLocaleString()} – RM{' '}
              {activeCareer.salaryRange.mid[1].toLocaleString()} /mo
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-hairline">
            <span className="text-xs font-medium text-on-surface-variant">Senior Level (MY)</span>
            <div className="text-lg font-bold text-on-surface mt-1">
              RM {activeCareer.salaryRange.senior[0].toLocaleString()} – RM{' '}
              {activeCareer.salaryRange.senior[1].toLocaleString()} /mo
            </div>
          </div>
        </div>
        <p className="text-[11px] text-outline flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Source: {activeCareer.salarySource}</span>
        </p>

        {/* Malaysian Education Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Key SPM Subjects</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeCareer.i18n.en.spmSubjects.map((sub) => (
                <Badge key={sub} variant="neutral">
                  {sub}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
              <span>Pre-U / Post-SPM Routes</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeCareer.i18n.en.preUPaths.map((path) => (
                <Badge key={path} variant="sage">
                  {path}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-hairline space-y-2">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
              <span>Malaysian Universities</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeCareer.i18n.en.uniExamples.map((uni) => (
                <Badge key={uni} variant="sky">
                  {uni}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* All 5 Careers Grid */}
      <Card data-purpose="explore-alternative-careers">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-on-surface">All 5 Career Tracks</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Switch your active career track anytime to practice lessons, quizzes, and scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CAREERS.map((career) => {
            const isActive = career.id === activeCareer.id;
            return (
              <div
                key={career.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-primary bg-surface-container-lowest shadow-soft'
                    : 'border-hairline bg-surface hover:bg-surface-container-lowest hover:border-primary'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="sage">{career.family}</Badge>
                    <span className="text-xs font-bold text-secondary">
                      Est. RM {career.baseSalary.toLocaleString()}/mo
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-on-surface">{career.i18n.en.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {career.i18n.en.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between">
                  <span className="text-[11px] text-outline">Estimated (MY)</span>
                  <button
                    type="button"
                    onClick={() => setActiveCareer(career.id)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    {isActive ? 'Active Track ✓' : 'Switch Track →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
