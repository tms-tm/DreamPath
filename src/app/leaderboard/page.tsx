'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function LeaderboardPage() {
  const { profile, totalXp, simulatedSalary } = useProgressionStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [activeFilter, setActiveFilter] = useState<string>('aurora');

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Top Banner / Header & Benchmark Overview */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#d3e8da] text-[#002113] text-[11px] font-bold uppercase tracking-wider">
                Virtual Salary Benchmark
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#005338] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                Live National Synced
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1b1c18] tracking-tight">
              Top Dreamers Leaderboard
            </h1>
            <p className="text-sm text-[#43474c] max-w-2xl">
              Compare your simulated monthly earnings and skill progression against students across the nation.
            </p>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex items-center gap-1.5 bg-[#f6f4ed] p-1.5 rounded-xl border border-[#e4e2dc] self-start lg:self-auto shadow-xs">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'weekly'
                  ? 'bg-white text-[#4e6074] shadow-xs'
                  : 'text-[#43474c] hover:text-[#1b1c18]'
              }`}
            >
              Weekly Sprint
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'monthly'
                  ? 'bg-white text-[#4e6074] shadow-xs'
                  : 'text-[#43474c] hover:text-[#1b1c18]'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setActiveTab('allTime')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'allTime'
                  ? 'bg-white text-[#4e6074] shadow-xs'
                  : 'text-[#43474c] hover:text-[#1b1c18]'
              }`}
            >
              All-Time
            </button>
          </div>
        </div>

        {/* 4 Key Stat Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e4e2dc] shadow-xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide">
                Your Current Rank
              </span>
              <span className="text-2xl font-bold text-[#0f172a] mt-0.5">#14</span>
              <span className="text-xs font-medium text-[#2563eb]">Top 12% in Aurora Tier</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#eff6ff] text-[#1d4ed8]">
              <span className="material-symbols-outlined text-[26px]">leaderboard</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e4e2dc] shadow-xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide">
                Virtual Monthly Salary
              </span>
              <span className="text-2xl font-bold text-[#059669] mt-0.5">
                RM {simulatedSalary.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[#64748b]">/mo</span>
              </span>
              <span className="text-xs font-semibold flex items-center gap-1 text-[#047857]">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> Base + Stacking XP
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#ecfdf5] text-[#047857]">
              <span className="material-symbols-outlined text-[26px]">payments</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e4e2dc] shadow-xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide">
                Weekly Growth
              </span>
              <span className="text-2xl font-bold text-[#2563eb] mt-0.5">+RM 120</span>
              <span className="text-xs text-[#64748b]">Ahead of Top 8% peers</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#f1f5f9] text-[#334155]">
              <span className="material-symbols-outlined text-[26px]">insights</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e4e2dc] shadow-xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide">
                Gap to Top 10
              </span>
              <span className="text-2xl font-bold text-[#475569] mt-0.5">RM 340</span>
              <span className="text-xs text-[#64748b]">≈ 2 Career Quests</span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#eff6ff] text-[#2563eb]">
              <span className="material-symbols-outlined text-[26px]">flag</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setActiveFilter('national')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'national'
                ? 'bg-[#d1e4fc] text-[#091d2e] font-bold'
                : 'bg-white border border-[#e4e2dc] text-[#43474c] hover:text-[#1b1c18]'
            }`}
          >
            National (All Tiers)
          </button>
          <button
            onClick={() => setActiveFilter('aurora')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all shadow-xs flex items-center gap-1.5 ${
              activeFilter === 'aurora'
                ? 'bg-[#cfe2fa] text-[#0f172a]'
                : 'bg-white border border-[#e4e2dc] text-[#43474c] hover:text-[#1b1c18]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Aurora Tier (Ages 10-12)
          </button>
          <button
            onClick={() => setActiveFilter('se')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'se'
                ? 'bg-[#d1e4fc] text-[#091d2e] font-bold'
                : 'bg-white border border-[#e4e2dc] text-[#43474c] hover:text-[#1b1c18]'
            }`}
          >
            Software Engineering Track
          </button>
          <button
            onClick={() => setActiveFilter('school')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'school'
                ? 'bg-[#d1e4fc] text-[#091d2e] font-bold'
                : 'bg-white border border-[#e4e2dc] text-[#43474c] hover:text-[#1b1c18]'
            }`}
          >
            My School / Club
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[#43474c] text-xs font-medium">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>Season 4 Reset in 3d 14h</span>
        </div>
      </div>

      {/* Top 3 Visual Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 pb-2">
        {/* #2 Sarah Chen */}
        <div className="order-2 md:order-1 rounded-2xl p-6 bg-white border border-[#e4e2dc] shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center relative group">
          <div className="absolute -top-3.5 w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-xs flex items-center justify-center border border-[#e2e8f0] shadow-xs">
            #2
          </div>
          <div className="relative mb-3 mt-1">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#e2e8f0] shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="Sarah Chen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCs_pgLYRpf4n7h_OSj5jhSYjTR6ikAjIPEOruR8sI2mOG2eFW-0V2CmCosWfjHuYwJQ8p075-uknSj8gtJ1-RCz6alCXcMRrLBpt4I_MAF7_ypZkUou_qnx5VShnBTOhKduR1yGopLDkdWghJxCiSpAc0we6W2TkMSMxfpJ0P0uQGbEdKWbNqmTykOofjA9CqGWITqnl09McmRtbLASJnBLzcBlktrFOLeoC9poop"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0] shadow-xs flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
            </div>
          </div>
          <span className="text-base font-bold text-[#0f172a]">Sarah Chen</span>
          <span className="text-xs text-[#64748b] mt-0.5">Product Designer</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs my-3 font-semibold bg-[#f1f5f9] text-[#475569]">
            Lv. 6 Nebula Tier
          </div>
          <div className="w-full rounded-xl p-3 flex flex-col gap-1 bg-[#f8fafc] border border-[#f1f5f9]">
            <span className="text-[11px] text-[#64748b]">Simulated Salary</span>
            <span className="text-lg font-extrabold text-[#059669]">
              RM 4,200 <span className="text-xs font-normal text-[#64748b]">/mo</span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full mt-3 pt-2 text-xs text-[#64748b]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-blue-600">task_alt</span> 8 Challenges
            </span>
            <span className="font-semibold text-[#047857]">3,420 XP</span>
          </div>
        </div>

        {/* #1 Rahf Fathy */}
        <div className="order-1 md:order-2 rounded-3xl p-6 bg-white border-2 border-[#cfe2fa] shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center relative -mt-6 group">
          <div className="absolute -top-6 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full text-base font-black flex items-center justify-center shadow-md bg-[#1e3a8a] text-white">
                1
              </div>
              <span
                className="material-symbols-outlined absolute -top-4 text-[24px] text-blue-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            </div>
          </div>
          <div className="relative mb-3 mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#eff6ff] shadow-lg">
              <img
                className="w-full h-full object-cover"
                alt="Rahf Fathy"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkbM5gjCY6RHoyXfbxzPb7pcwEbeXO7YJ2U9217Gmz5mLJ8pnF8Hv8jKkEyOAdNQNvjw1dLjsPz2Lxmjia8kqMkDjqnQrio6b4KC2LvqN32tfNZiLr0SSm3CIRxPDRDTqc3OHZi3TnNoMEtblfSVrAyQYkg0sSUUXFt6LeigqpRkKXXRbLaUnq-QRJ8Kz-K0wLg63BTbZ124Fy-RTtTUlwOyUtNONFQBhvqIAGFX2E"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full p-1.5 shadow-md flex items-center justify-center bg-[#2563eb] text-white">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-extrabold text-[#0f172a]">Rahf Fathy</span>
            <span
              className="material-symbols-outlined text-[18px] text-blue-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
              title="National Champion"
            >
              verified
            </span>
          </div>
          <span className="text-xs font-semibold text-[#2563eb] mt-0.5">Full-Stack Lead Track</span>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs my-3 font-bold shadow-xs bg-[#cfe2fa] text-[#1e3a8a]">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Lv. 7 Aurora Master
          </div>
          <div className="w-full rounded-2xl p-4 shadow-xs flex flex-col gap-1 bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
              Top National Benchmark
            </span>
            <span className="text-2xl font-black text-[#059669] tracking-tight">
              RM 5,650 <span className="text-xs font-medium text-[#64748b]">/mo</span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full mt-4 pt-2 text-xs text-[#64748b]">
            <span className="flex items-center gap-1 font-semibold text-[#0f172a]">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">bolt</span> 14 Challenges Solved
            </span>
            <span className="font-bold text-[#2563eb]">5,140 XP</span>
          </div>
        </div>

        {/* #3 Aiman Hakim */}
        <div className="order-3 rounded-2xl p-6 bg-white border border-[#e4e2dc] shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center relative group">
          <div className="absolute -top-3.5 w-8 h-8 rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-xs flex items-center justify-center border border-[#e2e8f0] shadow-xs">
            #3
          </div>
          <div className="relative mb-3 mt-1">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#e2e8f0] shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="Aiman Hakim"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeXXr8FiNQ8Ga4tkjx2sxB_ihM2LUipdb-Xxcv-5zrABCBP1phIe32CtU3RMAD8xejqg4NYWvds1-D0QF7x9EP_rpoYLbYQKDgLvnYJtnxWiPf-k_rDMFh1NybNPxi7CbHtqrh3xgTn20vmciyPqfgDlT1xT79IChAD-vPULVYgYiHJq-Wpz0RmH_5baVjZzoTNSbrhOeQypXIxHdD0luOmqKbyBXOv9gU0V3O0SYo"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full p-1 bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0] shadow-xs flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </div>
          </div>
          <span className="text-base font-bold text-[#0f172a]">Aiman Hakim</span>
          <span className="text-xs text-[#64748b] mt-0.5">Junior Cybersecurity</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs my-3 font-semibold bg-[#f1f5f9] text-[#475569]">
            Lv. 5 Starlight Tier
          </div>
          <div className="w-full rounded-xl p-3 flex flex-col gap-1 bg-[#f8fafc] border border-[#f1f5f9]">
            <span className="text-[11px] text-[#64748b]">Simulated Salary</span>
            <span className="text-lg font-extrabold text-[#059669]">
              RM 3,850 <span className="text-xs font-normal text-[#64748b]">/mo</span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full mt-3 pt-2 text-xs text-[#64748b]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-blue-600">task_alt</span> 6 Challenges
            </span>
            <span className="font-semibold text-[#047857]">2,990 XP</span>
          </div>
        </div>
      </div>

      {/* Rankings Table (#4 to #15) */}
      <div className="bg-white rounded-2xl border border-[#e4e2dc] shadow-xs overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-[#e4e2dc]">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#1b1c18]">National Leaderboard Ranks</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#eae8e1] text-[#43474c] text-[11px] font-bold">
              4 - 15 of 2,480
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f6f4ed] hover:bg-[#eae8e1] text-[#43474c] text-xs font-medium transition-colors">
              <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter Tracks
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f6f4ed] hover:bg-[#eae8e1] text-[#43474c] text-xs font-medium transition-colors">
              <span className="material-symbols-outlined text-[16px]">file_download</span> Export
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f4ed] text-[#43474c] text-[11px] font-bold uppercase tracking-wider border-b border-[#e4e2dc]">
                <th className="py-3 px-6 text-center w-16">Rank</th>
                <th className="py-3 px-4">Student Explorer</th>
                <th className="py-3 px-4">Career Track</th>
                <th className="py-3 px-4">Education Tier</th>
                <th className="py-3 px-4 text-right">Experience</th>
                <th className="py-3 px-6 text-right">Simulated Salary</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#1b1c18] divide-y divide-[#e4e2dc]/60">
              {/* Row 4 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#4</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d1e4fc] flex items-center justify-center font-bold text-[#4e6074] text-sm">
                      T
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Tan Mei Ling</span>
                      <span className="text-[11px] text-[#43474c]">Penang Free School</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Data Scientist
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Nebula Tier · Lv. 6</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">2,850 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 3,600 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#5</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#dde1ff] flex items-center justify-center font-bold text-[#4b5a9c] text-sm">
                      D
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Danial Ariff</span>
                      <span className="text-[11px] text-[#43474c]">Victoria Institution</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Cloud Architect
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Nebula Tier · Lv. 5</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">2,610 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 3,420 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 6 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#6</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e9e5ff] flex items-center justify-center font-bold text-[#4e6074] text-sm">
                      P
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Priya Chandran</span>
                      <span className="text-[11px] text-[#43474c]">SMK Convent Bukit Nanas</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    AI Prompt Engineer
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Aurora Tier · Lv. 5</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">2,440 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 3,250 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 7 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#7</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#c3c0ff] flex items-center justify-center font-bold text-[#3323cc] text-sm">
                      K
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Kenji Watanabe</span>
                      <span className="text-[11px] text-[#43474c]">Sri KDU International</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Robotics Engineer
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Starlight Tier · Lv. 5</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">2,300 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 3,100 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 8 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#8</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#dde1ff] flex items-center justify-center font-bold text-[#4b5a9c] text-sm">
                      N
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Nurul Izzah</span>
                      <span className="text-[11px] text-[#43474c]">Kolej Yayasan Saad</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Mobile App Dev
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Aurora Tier · Lv. 5</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">2,150 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,950 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 9 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#9</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d1e4fc] flex items-center justify-center font-bold text-[#4e6074] text-sm">
                      L
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Lucas Chong</span>
                      <span className="text-[11px] text-[#43474c]">Chung Ling High School</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Game Designer
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Starlight Tier · Lv. 4</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,980 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,800 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 10 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#10</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#eae8e1] flex items-center justify-center font-bold text-[#1b1c18] text-sm">
                      F
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Farah Aqila</span>
                      <span className="text-[11px] text-[#43474c]">SM Sains Seri Puteri</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Biotech Researcher
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Aurora Tier · Lv. 5</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,790 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,500 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 11 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#11</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#b8c4ff] flex items-center justify-center font-bold text-[#001354] text-sm">
                      H
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Haris Imran</span>
                      <span className="text-[11px] text-[#43474c]">Maktab Rendah Sains MARA</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Frontend Architect
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Aurora Tier · Lv. 4</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,620 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,380 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 12 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#12</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d1e4fc] flex items-center justify-center font-bold text-[#4e6074] text-sm">
                      C
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Chloe Lim</span>
                      <span className="text-[11px] text-[#43474c]">Sunway College Prep</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    Product Manager
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Starlight Tier · Lv. 4</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,510 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,290 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 13 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#13</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#eae8e1] flex items-center justify-center font-bold text-[#4e6074] text-sm">
                      V
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Vikram Naidu</span>
                      <span className="text-[11px] text-[#43474c]">St. John&apos;s Institution</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    DevOps Specialist
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Nebula Tier · Lv. 4</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,400 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,210 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* HIGHLIGHTED ROW #14: Alex Rivera (You) */}
              <tr
                className="bg-[#f0f7ff] transition-colors relative"
                style={{
                  boxShadow: 'rgb(59, 130, 246) 4px 0px 0px 0px inset',
                }}
              >
                <td className="py-4 px-6 text-center font-extrabold text-[#4e6074]">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#4e6074] text-white text-[11px] font-bold shadow-xs">
                    #14
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4e6074] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {profile.avatarChar || 'A'}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1b1c18]">{profile.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#4e6074] text-white text-[10px] font-semibold">
                          You
                        </span>
                      </div>
                      <span className="text-[11px] text-[#4e6074] font-medium">
                        St. Xavier National Academy
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white text-[#4e6074] text-xs font-bold shadow-xs">
                    Software Engineer
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-[#1b1c18] font-semibold">
                  Aurora Tier · Lv. 4
                </td>
                <td className="py-4 px-4 text-right text-sm font-bold text-[#4e6074]">
                  {totalXp.toLocaleString()} XP
                </td>
                <td className="py-4 px-6 text-right text-sm text-[#005338] font-extrabold">
                  RM {simulatedSalary.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>

              {/* Row 15 */}
              <tr className="hover:bg-[#f6f4ed]/50 transition-colors">
                <td className="py-3.5 px-6 text-center font-bold text-[#43474c]">#15</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#dde1ff] flex items-center justify-center font-bold text-[#4b5a9c] text-sm">
                      Z
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1b1c18]">Zackary Wong</span>
                      <span className="text-[11px] text-[#43474c]">Methodist Boys&apos; School</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#efebff] text-xs text-[#181445] font-medium">
                    UI/UX Researcher
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#43474c]">Aurora Tier · Lv. 4</td>
                <td className="py-3.5 px-4 text-right font-semibold text-[#4e6074]">1,210 XP</td>
                <td className="py-3.5 px-6 text-right font-bold text-[#005338]">
                  RM 2,090 <span className="font-normal text-[#43474c]">/mo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Counter */}
        <div className="px-6 py-3.5 bg-white border-t border-[#e4e2dc] flex items-center justify-between">
          <span className="text-xs text-[#43474c]">
            Displaying 12 contenders around your division
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 rounded-lg bg-[#f6f4ed] text-[#43474c] hover:text-[#1b1c18] text-xs transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span> Prev
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#cfe2fa] text-[#0f172a] font-bold text-xs shadow-xs">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#f6f4ed] text-[#43474c] hover:text-[#1b1c18] text-xs transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#f6f4ed] text-[#43474c] hover:text-[#1b1c18] text-xs transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#f6f4ed] text-[#43474c] hover:text-[#1b1c18] text-xs transition-colors flex items-center gap-1">
              Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gamification Motivation Banner */}
      <div
        className="w-full rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgb(235, 243, 252) 0%, rgb(247, 244, 236) 100%)',
          border: '1px solid rgb(226, 232, 240)',
          color: 'rgb(30, 41, 59)',
        }}
      >
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs bg-white border border-[#e2e8f0]">
            <span className="material-symbols-outlined text-[32px] text-blue-600">military_tech</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#0f172a]">
                Keep completing Daily Quests to climb into the Top 10!
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#d1fae5] text-[#065f46]">
                +RM 250 /mo
              </span>
            </div>
            <p className="text-xs text-[#475569] mt-0.5">
              Next Milestone: Unlock the <strong className="text-[#0f172a]">Master Dreamer Badge</strong> by submitting your next Algorithmic Challenge.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 z-10 w-full md:w-auto">
          <Link
            href="/simulation"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl transition-all text-xs font-bold shadow-xs hover:scale-[1.02] flex items-center justify-center gap-2 bg-[#0f172a] text-white"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Start Daily Quest</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
