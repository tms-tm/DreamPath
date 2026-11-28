'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function SimulationPage() {
  const { profile, applyReward, applySkillImpacts } = useProgressionStore();
  const [selectedDecision, setSelectedDecision] = useState<number | null>(null);
  const [outcomeRevealed, setOutcomeRevealed] = useState(false);

  const decisions = [
    {
      id: 1,
      title: 'Option A: Hotfix Rollback & Immediate Secret Rotation',
      desc: 'Roll back the production release to the previous commit immediately, rotate the compromised environment credentials, and trigger an automated incident report.',
      tag: 'Best Practice',
      tagColor: 'bg-secondary-fixed text-on-secondary-fixed',
      salaryImpact: '+RM 150/mo',
      xpImpact: '+120 XP',
      feedback: 'Excellent response! Reverting the deployment stopped the active token leak within 4 minutes. Your proactive secret rotation protected customer session data from secondary breaches.',
      isOptimal: true,
    },
    {
      id: 2,
      title: 'Option B: Live-Patch the Production Console Logging',
      desc: 'Attempt to modify the live server environment variables directly without rolling back the whole release, keeping the service online during peak user hours.',
      tag: 'High Risk',
      tagColor: 'bg-error-container text-on-error-container',
      salaryImpact: '-RM 50/mo',
      xpImpact: '+40 XP',
      feedback: 'Patching production directly left token logs visible for an additional 25 minutes. While uptime was preserved, security auditing flagged the delayed containment.',
      isOptimal: false,
    },
    {
      id: 3,
      title: 'Option C: Escalate and Await Senior Staff Return',
      desc: 'Draft an urgent email notification to the Lead Architect and wait for their confirmation before making any infrastructure alterations.',
      tag: 'Delayed Action',
      tagColor: 'bg-surface-container-high text-on-surface-variant',
      salaryImpact: 'RM 0',
      xpImpact: '+20 XP',
      feedback: 'Waiting delayed remediation until after business hours. In high-severity security incidents, frontline engineers must take authorized containment steps.',
      isOptimal: false,
    },
  ];

  const handleConfirmDecision = () => {
    if (selectedDecision === null) return;
    const choice = decisions.find((d) => d.id === selectedDecision);
    if (!choice) return;

    setOutcomeRevealed(true);
    if (choice.isOptimal) {
      applyReward({ xp: 120, salaryDelta: 150, missionCountDelta: 1 });
      applySkillImpacts([
        { skillId: 'problem-solving', xp: 50, competencyDelta: 4 },
        { skillId: 'communication', xp: 30, competencyDelta: 3 },
      ]);
    } else {
      applyReward({ xp: 40, salaryDelta: 0, missionCountDelta: 1 });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-8 pb-16 animate-fade-in" data-purpose="simulation-container">
      {/* Section 1: Header & Navigation */}
      <div className="flex flex-col gap-2">
        <Link
          href="/modes"
          className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary text-xs font-semibold transition-colors w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Practice Hub</span>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold uppercase tracking-wider">
            Branching Narrative · Simulation Mode
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Software Engineer: Stop the Silent Breach
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Step into the shoes of a Junior Software Engineer at a Kuala Lumpur fintech startup facing an unexpected database leakage alert.
          </p>
        </div>
      </div>

      {/* Section 2: Case Brief Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
            <h2 className="text-base font-bold text-on-surface">Case Brief: Incident #42 — Unusual Outbound Traffic</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-error text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            Critical Priority
          </span>
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          It is 4:15 PM on a Friday. Your cloud monitoring dashboard triggers a high-severity alert: confidential user session tokens are appearing in public client-side browser console logs after the latest production release. Senior engineers are offline on a field client visit. Customer data could be accessed if the misconfigured logging endpoint remains open.
        </p>

        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            <span>Role: <strong className="text-on-surface">Junior Front-End Engineer</strong></span>
            <span>•</span>
            <span>Impact: <strong className="text-emerald-600">Simulated Salary &amp; Reliability</strong></span>
          </div>
          <span className="text-xs font-bold text-primary">Time Budget: 5 Mins</span>
        </div>
      </div>

      {/* Section 3: Interactive Decision Engine */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface">Your Tactical Decision</h3>
          <span className="text-xs text-on-surface-variant font-medium">Select one strategy to execute:</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {decisions.map((d) => {
            const isSelected = selectedDecision === d.id;
            return (
              <div
                key={d.id}
                onClick={() => !outcomeRevealed && setSelectedDecision(d.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/30 bg-surface-container-low'
                    : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface">{d.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.tagColor}`}>{d.tag}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-emerald-600">{d.salaryImpact}</span>
                    <span className="text-primary">{d.xpImpact}</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Button & Feedback */}
        <div className="pt-2 flex flex-col gap-4">
          {!outcomeRevealed ? (
            <button
              onClick={handleConfirmDecision}
              disabled={selectedDecision === null}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                selectedDecision !== null
                  ? 'bg-primary text-white hover:bg-primary/90 cursor-pointer'
                  : 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed'
              }`}
            >
              <span>Commit Decision &amp; Run Simulation</span>
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-surface-container-low border border-primary/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Simulation Debrief</span>
                <span className="text-xs font-bold text-emerald-600">+120 XP Awarded</span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {decisions.find((d) => d.id === selectedDecision)?.feedback}
              </p>
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <Link
                  href="/modes"
                  className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-semibold hover:bg-surface-container transition-colors"
                >
                  Return to Hub
                </Link>
                <Link
                  href="/resume-builder"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Sync Skill to Resume</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
