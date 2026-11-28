'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function HomePage() {
  const {
    profile,
    totalXp,
    simulatedSalary,
    completedQuests,
    completeQuest,
    skills
  } = useProgressionStore();

  const [questStarted, setQuestStarted] = useState(false);
  const isQuestDone = completedQuests.includes('quest-btn-1');

  const handleStartDailyQuest = () => {
    setQuestStarted(true);
  };

  const handleFinishQuest = () => {
    completeQuest('quest-btn-1', 80);
    setQuestStarted(false);
  };

  return (
    <div className="space-y-7 max-w-7xl mx-auto w-full animate-fade-in" data-purpose="dashboard-main-content">
      {/* BEGIN: StatSummaryRow */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5" data-purpose="stat-metrics">
        {/* Metric Card 1: XP Progress */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#1E232A]">1,280 XP</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
              Lv. 4
            </span>
          </div>
          {/* Progress Bar to Lv 5 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-end text-[11px] font-medium text-charcoal-muted">
              <span>to Lv. 5</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#60A5FA] to-[#0E86D4] rounded-full transition-all duration-500"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        </div>

        {/* Metric Card 2: Estimated Salary */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] text-[#059669] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <rect height="14" rx="2" width="20" x="2" y="5" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-[#1E232A]">
                RM 2,160 <span className="text-xs font-normal text-charcoal-muted">/mo</span>
              </div>
              <p className="text-xs font-medium text-charcoal-muted mt-0.5">Estimated Entry</p>
            </div>
          </div>
          {/* Badge pill */}
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
            +RM 120
          </span>
        </div>

        {/* Metric Card 3: Streak */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.87 2.08a.75.75 0 0 0-.82.16C10.74 3.5 6.5 8.1 6.5 13.25a6.5 6.5 0 1 0 13 0c0-3.3-1.63-6.66-3.8-9.06a.75.75 0 0 0-1.12.08 7.9 7.9 0 0 1-1.71 1.81z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-[#1E232A]">7-Day Streak</span>
              <p className="text-xs font-medium text-charcoal-muted mt-0.5">Keep learning daily</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Active
          </span>
        </div>
      </section>
      {/* END: StatSummaryRow */}

      {/* BEGIN: HeroBanner */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FDE8E1] via-[#FCEAE3] to-[#F1F5FD] border border-[#EBE1D8] p-8 md:p-10 shadow-soft"
        data-purpose="hero-banner"
      >
        <div className="relative z-10 max-w-xl">
          {/* Galaxy Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-[#C2410C] tracking-wide uppercase border border-[#FCD9C8] mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
            Job Galaxy
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E232A] tracking-tight">
            Explore Your Future Job
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#57534E] leading-relaxed">
            View detailed career insights, required candidate skills, and your real-time job market match.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/simulation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E86D4] hover:bg-[#0269B3] text-white text-sm font-semibold shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Continue your journey</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/paths"
              className="text-sm font-semibold text-[#1E232A] hover:text-[#0E86D4] inline-flex items-center gap-1 transition-colors"
            >
              <span>Try other careers</span>
              <span className="text-xs font-bold">&gt;</span>
            </Link>
          </div>
        </div>

        {/* Right Side Planet Illustration (Inline SVG from Stitch prototype) */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 pointer-events-none hidden sm:flex items-center justify-center animate-float">
          <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 280 280">
            <defs>
              <linearGradient id="planetGrad" x1="20%" x2="80%" y1="20%" y2="80%">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#F87171" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <circle cx="140" cy="140" fill="#FFF6F1" filter="blur(16px)" opacity="0.6" r="85" />
            <ellipse
              cx="140"
              cy="140"
              fill="none"
              rx="125"
              ry="38"
              stroke="url(#ringGrad)"
              strokeDasharray="190 600"
              strokeLinecap="round"
              strokeWidth="11"
              transform="rotate(-26 140 140)"
            />
            <circle cx="140" cy="140" fill="url(#planetGrad)" r="56" />
            <ellipse
              cx="140"
              cy="140"
              fill="none"
              rx="125"
              ry="38"
              stroke="url(#ringGrad)"
              strokeDashoffset="-200"
              strokeLinecap="round"
              strokeWidth="11"
              transform="rotate(-26 140 140)"
            />
            <path d="M70 70 L73 78 L81 81 L73 84 L70 92 L67 84 L59 81 L67 78 Z" fill="#FBBF24" opacity="0.8" />
            <path d="M220 50 L222 55 L227 57 L222 59 L220 64 L218 59 L213 57 L218 55 Z" fill="#60A5FA" opacity="0.9" />
            <path d="M225 200 L226.5 204 L230.5 205.5 L226.5 207 L225 211 L223.5 207 L219.5 205.5 L223.5 204 Z" fill="#F472B6" opacity="0.85" />
          </svg>
        </div>
      </section>
      {/* END: HeroBanner */}

      {/* BEGIN: MiddleTwoColumnGrid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-purpose="quest-and-roadmap">
        {/* Left Card: Daily Quest */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-6 shadow-soft flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  DAILY QUEST
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1E40AF]">#42</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                Easy
              </span>
            </div>

            {/* Quest Title & Description */}
            <div>
              <h3 className="text-lg font-bold text-[#1E232A]">Fix the Missing Button</h3>
              <p className="mt-1 text-xs md:text-sm text-charcoal-muted leading-relaxed">
                Inspect a responsive UI layout bug in the frontend simulation engine and restore the primary CTA button state.
              </p>
            </div>

            {/* Quest Meta Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC] text-xs font-medium text-[#4A5568]">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" />
                </svg>
                +80 XP · ~10 min
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC] text-xs font-medium text-[#4A5568]">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M8 9l-4 3 4 3m8-6l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Front-End Sandbox
              </span>
            </div>

            {/* Daily Progress Counter */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1E232A] mb-1.5">
                <span>Daily Progress</span>
                <span className="text-charcoal-muted font-medium">
                  {isQuestDone ? '1/1 Quests Done' : '1/3 Quests'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                <div
                  className="h-full bg-[#0E86D4] rounded-full transition-all duration-500"
                  style={{ width: isQuestDone ? '100%' : '33.3%' }}
                />
              </div>
            </div>

            {questStarted && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DE] space-y-3">
                <div className="text-xs font-bold text-[#0E86D4] uppercase">Interactive Front-End Sandbox</div>
                <div className="p-3 bg-[#1E232A] text-emerald-400 font-mono text-xs rounded-lg">
                  &lt;button type="submit" aria-label="Join Study Club"&gt;Join Study Club&lt;/button&gt;
                </div>
                <button
                  onClick={handleFinishQuest}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Deploy & Claim +80 XP</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6">
            {isQuestDone ? (
              <div className="w-full py-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-sm font-bold flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Mission Completed (+80 XP)</span>
              </div>
            ) : !questStarted ? (
              <button
                onClick={handleStartDailyQuest}
                className="w-full py-2.5 rounded-xl bg-[#0E86D4] hover:bg-[#0269B3] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Start Quest</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Right Card: Career Roadmap */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-6 shadow-soft flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#0E86D4] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#1E232A]">Your Career Roadmap</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F7FF] text-[#0269B3] border border-[#BAE0FD]">
                Software Engineer
              </span>
            </div>

            {/* Overall Completion Bar */}
            <div className="bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-[#4A5568]">Overall Completion</span>
                <span className="text-[#0E86D4] font-bold text-sm">35%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E5DFD5] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#60A5FA] to-[#0E86D4] rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            {/* Milestones List */}
            <div className="space-y-3.5 pt-1">
              {/* Completed/Current Milestone */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
                    Current Milestone
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-[#1E232A]">
                    Building Programming Foundations
                  </p>
                </div>
              </div>

              {/* Next Milestone */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
                    Next Milestone
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-[#1E232A]">
                    Master Front-End Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6">
            <Link
              href="/paths"
              className="w-full py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-gray-50 text-[#1E232A] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>View Full Roadmap</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: MiddleTwoColumnGrid */}

      {/* BEGIN: BottomTwoColumnGrid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-purpose="skills-and-recommendations">
        {/* Left Card: Your Skill Progress */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M16 8v10M12 4v14M8 12v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#1E232A]">Your Skill Progress</h3>
            </div>
            <p className="text-xs text-charcoal-muted mb-6">
              Track the skills you're developing for your dream career.
            </p>

            {/* Skill Items */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#1E232A]">JavaScript</span>
                  <span className="text-[#0E86D4] font-bold">75%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div className="h-full bg-[#0E86D4] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#1E232A]">React</span>
                  <span className="text-[#0E86D4] font-bold">40%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div className="h-full bg-[#38A4F6] rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#1E232A]">System Design</span>
                  <span className="text-[#0E86D4] font-bold">15%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div className="h-full bg-[#93C5FD] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom View All Link */}
          <div className="mt-8 pt-4 text-center border-t border-[#F2ECE4]">
            <Link
              href="/profile"
              className="text-xs font-bold text-[#0E86D4] hover:text-[#0269B3] inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Skills</span>
              <span className="text-xs">&gt;</span>
            </Link>
          </div>
        </div>

        {/* Right Card: Recommended for You */}
        <div className="bg-white border border-[#EAE5DE] rounded-2xl p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#1E232A]">Recommended for You</h3>
            </div>
            <p className="text-xs text-charcoal-muted mb-4">
              Curated milestones to accelerate your career growth.
            </p>

            <div className="space-y-2.5">
              {/* Item 1 */}
              <div className="bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl p-3 flex items-center justify-between gap-3 hover:border-[#D9D2C5] transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-[#1E232A] truncate">Learn React Fundamentals</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8]">
                      Learning · 20m
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted truncate mt-0.5">
                    Strengthen your front-end development skills
                  </p>
                </div>
                <Link
                  href="/modes"
                  className="px-3 py-1.5 rounded-lg bg-[#0E86D4] hover:bg-[#0269B3] text-white text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Start
                </Link>
              </div>

              {/* Item 2 */}
              <div className="bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl p-3 flex items-center justify-between gap-3 hover:border-[#D9D2C5] transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-[#1E232A] truncate">Practice Data Structures</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46]">
                      Practice · +100 XP
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted truncate mt-0.5">
                    Improve your problem-solving and coding skills
                  </p>
                </div>
                <Link
                  href="/modes"
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#1E232A] text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Practice
                </Link>
              </div>

              {/* Item 3 */}
              <div className="bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl p-3 flex items-center justify-between gap-3 hover:border-[#D9D2C5] transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-[#1E232A] truncate">Explore Backend Development</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEF3C7] text-[#92400E]">
                      Career Skills
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted truncate mt-0.5">
                    Discover essential backend technologies
                  </p>
                </div>
                <Link
                  href="/paths"
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[#1E232A] text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom View All Link */}
          <div className="mt-4 pt-4 text-center border-t border-[#F2ECE4]">
            <Link
              href="/modes"
              className="text-xs font-bold text-[#0E86D4] hover:text-[#0269B3] inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Recommendations</span>
              <span className="text-xs">&gt;</span>
            </Link>
          </div>
        </div>
      </section>
      {/* END: BottomTwoColumnGrid */}
    </div>
  );
}
