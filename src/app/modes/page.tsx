'use client';

import React from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function PracticeModesPage() {
  const { profile, totalXp } = useProgressionStore();

  return (
    <div className="flex flex-col w-full gap-7 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Top Header & Intro */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4e6074] shrink-0"></span>
          <span className="text-[11px] font-semibold text-[#4e6074] uppercase tracking-widest">
            Interactive Learning Hubs
          </span>
        </div>
        <h1 className="text-3xl lg:text-[40px] lg:leading-[48px] font-extrabold text-[#1b1c18] tracking-tight">
          Practice Modes &amp; Skill Labs
        </h1>
        <p className="text-sm lg:text-[15px] text-[#43474c] leading-relaxed max-w-3xl">
          Learn foundational theory, test your knowledge in rapid quizzes, or run realistic workplace simulation scenarios.
        </p>
      </div>

      {/* Daily Target Tracker Card (Full Width Banner below title, matching screenshot) */}
      <div className="bg-white border border-[#e4e2dc] p-6 rounded-2xl shadow-[0_2px_12px_rgba(27,28,24,0.02)] flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#cfe2fa] flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[#091d2e] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#5e626b] uppercase tracking-wider">
                Current Streak
              </span>
              <span className="text-base font-bold text-[#1b1c18]">
                {profile.streakDays || 7} Days in a Row
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-[#5e626b] uppercase tracking-wider">
              Daily Target
            </span>
            <p className="text-base font-bold text-[#1b1c18]">
              180 <span className="text-xs font-normal text-[#5e626b]">/ 250 XP</span>
            </p>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="w-full bg-[#eae8e1] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#4e6074] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: '72%' }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#5e626b]">
          <span>72% Completed Today</span>
          <span className="text-[#4e6074] font-bold">+70 XP needed</span>
        </div>
      </div>

      {/* The 3 Primary Game Modes (Hero 3-Card Interactive Grid matching screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* MODE 1: Study Mode */}
        <div className="bg-white border border-[#e4e2dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(27,28,24,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#cfe2fa] flex items-center justify-center text-[#091d2e] shrink-0">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  menu_book
                </span>
              </div>
              <span className="px-3 py-1 bg-[#dceafb] text-[#2c5282] rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                +20 XP / Lesson
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#5e626b] uppercase tracking-wider">
                Theory &amp; Context
              </span>
              <h2 className="text-xl font-bold text-[#1b1c18] tracking-tight">Study Mode</h2>
              <p className="text-xs text-[#5e626b] leading-relaxed">
                Read bite-sized lessons, explore interactive industry terminology, and listen to AI read-aloud explanations.
              </p>
            </div>

            {/* Highlight Capsule */}
            <div className="bg-[#f6f4ed] p-4 rounded-xl flex flex-col gap-2 border border-[#e4e2dc]/60">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#5e626b] font-semibold">Active Module</span>
                <span className="text-[#4e6074] font-bold">Lesson 4 of 12</span>
              </div>
              <p className="text-xs font-bold text-[#1b1c18] truncate">
                Software Engineering: Clean Code
              </p>
              <div className="w-full bg-[#eae8e1] h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-[#4e6074] h-full rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/paths"
              className="w-full py-3 px-4 bg-[#cfe2fa] hover:bg-[#bdd6f7] text-[#091d2e] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Read Interactive Notes</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* MODE 2: Quiz Mode */}
        <div className="bg-white border border-[#e4e2dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(27,28,24,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#ddf2e4] flex items-center justify-center text-[#2e6f49] shrink-0">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  quiz
                </span>
              </div>
              <span className="px-3 py-1 bg-[#ddf2e4] text-[#2e6f49] rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                Timed · +40 XP
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#5e626b] uppercase tracking-wider">
                Knowledge Checkpoint
              </span>
              <h2 className="text-xl font-bold text-[#1b1c18] tracking-tight">Quiz Mode</h2>
              <p className="text-xs text-[#5e626b] leading-relaxed">
                Fast-paced multiple choice checks tailored to the Aurora educational tier (Ages 10–12 / Upper Primary).
              </p>
            </div>

            {/* Highlight Capsule */}
            <div className="bg-[#f6f4ed] p-4 rounded-xl flex flex-col gap-2 border border-[#e4e2dc]/60">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#5e626b] font-semibold">Current Challenge</span>
                <span className="flex items-center gap-0.5 text-amber-500">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </span>
              </div>
              <p className="text-xs font-bold text-[#1b1c18] truncate">
                Frontend Debugging &amp; DOM Layout
              </p>
              <div className="flex items-center justify-between text-xs text-[#5e626b] mt-1">
                <span>Best Accuracy</span>
                <span className="font-bold text-[#2e6f49]">96% High Score</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/simulation"
              className="w-full py-3 px-4 bg-[#ddf2e4] hover:bg-[#c9e8d2] text-[#2e6f49] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Start Quiz Challenge</span>
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            </Link>
          </div>
        </div>

        {/* MODE 3: Simulation Mode */}
        <div className="bg-white border border-[#e4e2dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(27,28,24,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#f8dfec] flex items-center justify-center text-[#7e3b5e] shrink-0">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  smart_toy
                </span>
              </div>
              <span className="px-3 py-1 bg-[#f8dfec] text-[#7e3b5e] rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                Workplace · +80 XP
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#5e626b] uppercase tracking-wider">
                Branching Narrative
              </span>
              <h2 className="text-xl font-bold text-[#1b1c18] tracking-tight">Simulation Mode</h2>
              <p className="text-xs text-[#5e626b] leading-relaxed">
                Step into real scenarios guided by Mentor Maya. Make decisions that affect your virtual project outcomes.
              </p>
            </div>

            {/* Highlight Capsule */}
            <div className="bg-[#f6f4ed] p-4 rounded-xl flex flex-col gap-2 border border-[#e4e2dc]/60">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#5e626b] font-semibold">Scenario #42</span>
                <span className="px-2 py-0.5 rounded-full bg-[#eae8e1] text-[#43474c] font-bold text-[10px]">
                  Active
                </span>
              </div>
              <p className="text-xs font-bold text-[#1b1c18] truncate">
                The Disappearing Checkout Button
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-[#f8dfec] flex items-center justify-center text-[#7e3b5e] text-[10px] font-bold">
                  M
                </div>
                <span className="text-[11px] text-[#5e626b]">Mentor Maya is waiting for review</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/simulation"
              className="w-full py-3 px-4 bg-[#cfe2fa] hover:bg-[#bdd6f7] text-[#091d2e] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Simulation</span>
              <span className="material-symbols-outlined text-[16px]">terminal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Contextual Strip: Mastered Skills & Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-2">
        {/* Left Column (7 cols): Recently Mastered Skills */}
        <div className="lg:col-span-7 bg-white border border-[#e4e2dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(27,28,24,0.02)] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4e6074] text-[22px]">verified</span>
                <h3 className="text-base font-bold text-[#1b1c18]">Recently Mastered Skills</h3>
              </div>
              <Link
                href="/paths"
                className="text-xs font-semibold text-[#4e6074] hover:underline flex items-center gap-0.5"
              >
                <span>Skill Tree</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              {/* Skill 1 */}
              <div className="p-3.5 rounded-xl bg-[#f6f4ed] hover:bg-[#f0eee7] transition-colors flex items-center justify-between gap-4 border border-[#e4e2dc]/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#ddf2e4] flex items-center justify-center text-[#2e6f49] shrink-0">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#1b1c18] truncate">
                      HTML/CSS Box Model
                    </span>
                    <span className="text-[11px] text-[#5e626b]">
                      Validated in Quiz #18 • 100% Mastery
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 bg-[#ddf2e4] text-[#2e6f49] rounded-md text-[11px] font-bold">
                    100%
                  </span>
                </div>
              </div>

              {/* Skill 2 */}
              <div className="p-3.5 rounded-xl bg-[#f6f4ed] hover:bg-[#f0eee7] transition-colors flex items-center justify-between gap-4 border border-[#e4e2dc]/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#cfe2fa] flex items-center justify-center text-[#091d2e] shrink-0">
                    <span className="material-symbols-outlined text-[18px]">code</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#1b1c18] truncate">
                      Git Branching &amp; Pull Requests
                    </span>
                    <span className="text-[11px] text-[#5e626b]">
                      Validated in Simulation #39 • Advanced
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 bg-[#cfe2fa] text-[#091d2e] rounded-md text-[11px] font-bold">
                    85%
                  </span>
                </div>
              </div>

              {/* Skill 3 */}
              <div className="p-3.5 rounded-xl bg-[#f6f4ed] hover:bg-[#f0eee7] transition-colors flex items-center justify-between gap-4 border border-[#e4e2dc]/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#f8dfec] flex items-center justify-center text-[#7e3b5e] shrink-0">
                    <span className="material-symbols-outlined text-[18px]">data_object</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#1b1c18] truncate">
                      JavaScript Functions &amp; Scope
                    </span>
                    <span className="text-[11px] text-[#5e626b]">
                      Validated in Study Lab #04 • Intermediate
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 bg-[#eae8e1] text-[#5e626b] rounded-md text-[11px] font-bold">
                    60%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Upcoming Milestones & Quest Hub */}
        <div className="lg:col-span-5 bg-white border border-[#e4e2dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(27,28,24,0.02)] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4e6074] text-[22px]">military_tech</span>
                <h3 className="text-base font-bold text-[#1b1c18]">Upcoming Milestone</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#cfe2fa] text-[#091d2e] text-[11px] font-bold">
                Aurora Rank
              </span>
            </div>

            <div className="bg-[#f6f4ed] p-4 rounded-xl flex flex-col gap-3 border border-[#e4e2dc]/40">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1b1c18]">Aurora Rank Certification</p>
                  <p className="text-[11px] text-[#5e626b] mt-0.5">
                    Required for Junior Apprentice Badging
                  </p>
                </div>
                <span className="material-symbols-outlined text-[24px] text-[#4e6074]">workspace_premium</span>
              </div>

              {/* Milestone Progress Bar */}
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#5e626b]">XP Progress</span>
                  <span className="text-[#1b1c18] font-bold">
                    {totalXp.toLocaleString()} / 1,500 XP
                  </span>
                </div>
                <div className="w-full bg-[#eae8e1] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4e6074] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, Math.round((totalXp / 1500) * 100))}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[11px] text-[#5e626b] italic">
                Tip: Complete 1 simulation or 2 quizzes today to level up to Lv. 5.
              </p>
            </div>

            {/* Quick Quest mini card */}
            <div className="p-3.5 rounded-xl bg-[#f6f4ed] flex items-center justify-between border border-[#e4e2dc]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#cfe2fa] flex items-center justify-center text-[#091d2e] font-bold text-xs">
                  Q1
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1b1c18]">Weekly Lab Challenge</span>
                  <span className="text-[11px] text-[#5e626b]">
                    Complete 3 timed quizzes (2/3 done)
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#4e6074] font-bold">+100 XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
