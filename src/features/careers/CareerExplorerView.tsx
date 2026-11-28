'use client';

import React from 'react';
import Link from 'next/link';
import { Check, FileText, Lock, Play, Sparkles } from 'lucide-react';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { CAREER_PATHS } from '@/types/career';

export function CareerExplorerView() {
  const { profile, setActiveCareer } = useProgressionStore();
  const activeCareer =
    CAREER_PATHS.find((c) => c.id === profile.activeCareerId) ?? CAREER_PATHS[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full animate-fade-in" data-purpose="dashboard-content-body">
      <PageHeader
        eyebrow="Malaysia Career Navigator · Nebula Tier (Form 1–3)"
        title="Explore Careers"
        subtitle="Discover pathways, local Malaysian industry trends, required skills, and estimated salary ranges."
      />

      {/* Section 1: Active Career Roadmap */}
      <Card data-purpose="active-career-roadmap">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-hairline gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-on-surface">
                Explore Career: Active Roadmap
              </span>
              <Badge variant="blush">Current Goal: {activeCareer.title}</Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Track your verified progression from secondary school foundations to entry-level readiness.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-outline">
              {activeCareer.stageInfo}
            </span>
            <span className="text-xs font-bold text-primary">
              {activeCareer.progressPercent}% Roadmap Mastered
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={activeCareer.progressPercent} label="Roadmap progress" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-surface p-4 rounded-xl border border-secondary-container">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-on-secondary-fixed uppercase tracking-wider">
                Step 01
              </span>
              <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
                <Check className="w-3 h-3" aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-sm font-bold text-on-surface">Foundations</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Lower-secondary core subjects and introductory career concepts.
            </p>
            <Badge variant="sage" className="mt-3 rounded">
              Completed
            </Badge>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-primary shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Step 02
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Core Skills &amp; Practice</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Interactive study notes, 5-question quizzes, and branching scenarios.
            </p>
            <Badge variant="sky" className="mt-3 rounded">
              In Progress
            </Badge>
          </div>

          <div className="bg-surface p-4 rounded-xl border border-hairline opacity-80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Step 03
              </span>
              <Lock className="w-3.5 h-3.5 text-outline" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-on-surface">SPM Subject Alignment</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Map Form 4–5 stream choices and Malaysian university pathways.
            </p>
            <Badge variant="neutral" className="mt-3 rounded">
              Locked
            </Badge>
          </div>

          <div className="bg-surface p-4 rounded-xl border border-hairline opacity-80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Step 04
              </span>
              <Lock className="w-3.5 h-3.5 text-outline" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Capstone Simulation</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Complete real-world Malaysian workplace scenarios for your portfolio.
            </p>
            <Badge variant="neutral" className="mt-3 rounded">
              Final Gateway
            </Badge>
          </div>
        </div>
      </Card>

      {/* Section 2: Try Other Careers */}
      <Card data-purpose="explore-alternative-careers">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-on-surface">Try Other Careers</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Switch your active track to explore any of the 5 DreamPath career journeys.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CAREER_PATHS.map((career) => {
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
                  <h3 className="text-sm font-bold text-on-surface">{career.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{career.description}</p>
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

      {/* Section 3: Active Mission Simulation Banner */}
      <Card data-purpose="active-mission-banner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="sky" className="uppercase tracking-wider">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              Interactive Career Simulator
            </Badge>
          </div>
          <Badge variant="blush">+120 XP Reward</Badge>
        </div>

        <div className="bg-gradient-to-r from-primary-container/40 via-surface-container/60 to-secondary-container/40 rounded-xl p-6 border border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold text-on-surface">
              Workplace Simulation: {activeCareer.title}
            </h3>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              {activeCareer.subtitle}
            </p>
          </div>
          <Link
            href="/simulation"
            className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:opacity-90 transition-all shadow-soft shrink-0 flex items-center gap-2"
          >
            <span>Launch Simulation</span>
            <Play className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Card>

      {/* Section 4: Career Details & Resume Sync */}
      <Card data-purpose="career-deep-dive">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-on-surface">
                Career Details &amp; Required Skills
              </h2>
              <Badge variant="sky">Focus: {activeCareer.title}</Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Benchmarked skills and lower-secondary milestones for Malaysian students.
            </p>
          </div>
          <Link
            href="/resume-builder"
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Sync to Resume Builder</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {activeCareer.tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
