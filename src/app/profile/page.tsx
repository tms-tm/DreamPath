'use client';

import React from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function ProfilePage() {
  const { profile, totalXp, simulatedSalary } = useProgressionStore();

  const skillEntries = [
    { name: 'Problem Solving', pct: 82, xp: '510 XP' },
    { name: 'HTML & CSS', pct: 78, xp: '450 XP' },
    { name: 'Communication', pct: 64, xp: '260 XP' },
    { name: 'JavaScript', pct: 55, xp: '320 XP' },
    { name: 'Accessibility', pct: 48, xp: '190 XP' },
  ];

  return (
    <div className="max-w-[1100px] mx-auto py-8 px-4 sm:px-8 pb-28 flex flex-col gap-8 animate-fade-in">
      {/* 1. IDENTITY CARD */}
      <section className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_12px_rgba(27,28,24,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          {/* Large initial badge "A" */}
          <div className="w-16 h-16 rounded-2xl bg-[#cfe2fa] text-[#091d2e] text-2xl font-bold flex items-center justify-center shrink-0">
            {profile.avatarChar || 'A'}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[26px] font-bold text-[#1b1c18] tracking-tight">
              {profile.name}
            </h2>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#cfe2fa] text-[#36485c] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">military_tech</span>
                Galaxy Tier · Lv. 4
              </span>
            </div>
            <p className="text-[14px] text-[#43474c] mt-0.5">SMK Bandar Utama Damansara</p>
            <p className="text-[14px] font-medium text-[#4e6074]">
              Target career: Software Engineer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <Link
            href="/settings"
            className="rounded-xl px-4 py-2 text-[14px] font-semibold border border-[#c4c6cd] text-[#1b1c18] bg-white hover:bg-[#f6f4ed] transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            href="/resume-builder"
            className="rounded-xl px-5 py-2.5 text-[14px] font-semibold bg-[#cfe2fa] text-[#091d2e] hover:bg-[#b5c8e0] shadow-xs transition-all flex items-center gap-2"
          >
            <span>Open Resume Builder</span>
            <span className="text-base font-normal">→</span>
          </Link>
        </div>
      </section>

      {/* 2. STAT STRIP (4 cards in a grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)] flex flex-col justify-between">
          <span className="text-[12px] font-medium text-[#43474c] uppercase tracking-wider">
            Total XP
          </span>
          <div className="my-2">
            <div className="text-[28px] font-bold text-[#1b1c18] tracking-tight">
              {totalXp.toLocaleString()} XP
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e4e2dc] mt-2 overflow-hidden">
              <div className="h-full rounded-full bg-[#4e6074]" style={{ width: '75%' }}></div>
            </div>
          </div>
          <span className="text-[12px] text-[#43474c]">220 XP to Level 5</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)] flex flex-col justify-between">
          <span className="text-[12px] font-medium text-[#43474c] uppercase tracking-wider">
            Simulated Salary
          </span>
          <div className="my-2">
            <div className="text-[28px] font-bold text-[#1b1c18] tracking-tight">
              RM {simulatedSalary.toLocaleString()} <span className="text-[18px] font-medium text-[#43474c]">/mo</span>
            </div>
          </div>
          <span className="text-[12px] text-[#43474c]">Virtual career earnings</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)] flex flex-col justify-between">
          <span className="text-[12px] font-medium text-[#43474c] uppercase tracking-wider">
            Missions completed
          </span>
          <div className="my-2">
            <div className="text-[28px] font-bold text-[#1b1c18] tracking-tight">
              {profile.missionsCompleted || 24}
            </div>
          </div>
          <span className="text-[12px] text-[#43474c]">Across 3 career fields</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)] flex flex-col justify-between">
          <span className="text-[12px] font-medium text-[#43474c] uppercase tracking-wider">
            Learning streak
          </span>
          <div className="my-2">
            <div className="text-[28px] font-bold text-[#1b1c18] tracking-tight">
              {profile.streakDays || 7} days
            </div>
          </div>
          <span className="text-[12px] text-[#43474c]">Active every day this week</span>
        </div>
      </section>

      {/* 3. TWO COLUMNS (60% / 40% split, gap-8, top-aligned) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (60% -> lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)]">
            <h3 className="text-[20px] font-bold text-[#1b1c18]">
              Skills you&apos;ve shown in DreamPath
            </h3>
            <p className="text-[14px] text-[#43474c] mt-1 mb-8">
              Auto-synced to your Resume Builder
            </p>
            <div className="space-y-6">
              {skillEntries.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-[#1b1c18]">{skill.name}</span>
                    <span className="text-[14px] font-bold text-[#1b1c18]">{skill.pct}%</span>
                  </div>
                  <span className="text-[12px] text-[#43474c]">{skill.xp}</span>
                  <div className="w-full h-2 rounded-full bg-[#f0eee7] overflow-hidden mt-0.5">
                    <div
                      className="h-full rounded-full bg-[#b5c8e0]"
                      style={{ width: `${skill.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (40% -> lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card A: Earned Badges */}
          <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)]">
            <h3 className="text-[18px] font-bold text-[#1b1c18] mb-4">Earned badges</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#cfe2fa]/60 text-[#091d2e]">
                <span className="material-symbols-outlined text-[18px] text-[#4e6074]">shield</span>
                <span className="text-[13px] font-medium">Cyber Guardian</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#cfe2fa]/60 text-[#091d2e]">
                <span className="material-symbols-outlined text-[18px] text-[#4e6074]">balance</span>
                <span className="text-[13px] font-medium">Sharp Advocate</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#cfe2fa]/60 text-[#091d2e]">
                <span className="material-symbols-outlined text-[18px] text-[#4e6074]">explore</span>
                <span className="text-[13px] font-medium">Week Explorer</span>
              </div>
            </div>
          </div>

          {/* Card B: Recent Simulation Highlights */}
          <div className="bg-white rounded-2xl p-6 border border-[#e4e2dc] shadow-[0_2px_8px_rgba(27,28,24,0.03)]">
            <h3 className="text-[18px] font-bold text-[#1b1c18] mb-4">
              Recent simulation highlights
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full bg-[#cfe2fa] text-[#36485c] text-[11px] font-semibold">
                  Software Engineer
                </span>
                <h4 className="text-[14px] font-bold text-[#1b1c18] mt-1">Fixed a missing UI button</h4>
                <p className="text-[13px] text-[#43474c] leading-relaxed">
                  Inspected responsive layout bugs and resolved missing CSS selectors in the simulation engine.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full bg-[#f3dae7] text-[#53424c] text-[11px] font-semibold">
                  Junior Lawyer
                </span>
                <h4 className="text-[14px] font-bold text-[#1b1c18] mt-1">Resolved a delivery contract</h4>
                <p className="text-[13px] text-[#43474c] leading-relaxed">
                  Identified breach of contract clauses and mediated terms between client and supplier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
