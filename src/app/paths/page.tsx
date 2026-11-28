'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/stores/useProgressionStore';

export default function ExploreCareersPage() {
  const { profile, setActiveCareer } = useProgressionStore();
  const [selectedRole, setSelectedRole] = useState<'software' | 'data' | 'cyber' | 'cloud' | 'ai'>('software');

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full animate-fade-in" data-purpose="dashboard-content-body">
      {/* Header Page Title */}
      <div data-purpose="page-title-section">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-[#cfe2fa] text-[#091d2e] text-[11px] font-semibold tracking-wide uppercase">
            Malaysia Career Navigator
          </span>
          <span className="text-xs text-[#74777d]">•</span>
          <span className="text-xs font-medium text-[#43474c]">Targeted for SPM &amp; Pre-U Students</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1b1c18]">Explore Career</h1>
        <p className="text-sm text-[#43474c] mt-1">
          Discover pathways, local Malaysian industry trends, required skills, and real-time market data.
        </p>
      </div>

      {/* ========================================== */}
      {/* SECTION 1: Explore Career: Active Roadmap */}
      {/* ========================================== */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#e4e2dc] p-6 shadow-sm" data-purpose="active-career-roadmap">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#e4e2dc]/70 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#1b1c18]">Explore Career: Active Roadmap</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f3dae7] text-[#251720] text-xs font-semibold">
                Current Goal: Junior Full-Stack Developer
              </span>
            </div>
            <p className="text-xs text-[#43474c] mt-1">
              Track your verified progression from secondary school foundations to entry-level hireability.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#74777d]">
              Est. Readiness: <strong className="text-[#1b1c18]">4 Months</strong>
            </span>
            <div className="text-right">
              <span className="text-xs font-bold text-[#4e6074]">78% Roadmap Mastered</span>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4 w-full bg-[#f0eee7] h-2.5 rounded-full overflow-hidden">
          <div className="bg-[#4e6074] h-full rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
        </div>

        {/* Roadmap Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Step 1: Completed */}
          <div className="bg-[#fbf9f2] p-4 rounded-xl border border-[#d3e8da] relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#0d1f17] uppercase tracking-wider">Step 01</span>
              <span className="w-5 h-5 rounded-full bg-[#d3e8da] text-[#0d1f17] text-xs flex items-center justify-center font-bold">✓</span>
            </div>
            <h3 className="text-sm font-bold text-[#1b1c18]">CS Fundamentals</h3>
            <p className="text-xs text-[#43474c] mt-1">SPM Sains Komputer / Matriculation logic &amp; algorithms foundation.</p>
            <div className="mt-3 inline-block text-[11px] font-semibold text-[#0d1f17] bg-[#d3e8da] px-2 py-0.5 rounded">Completed</div>
          </div>

          {/* Step 2: Active / In Progress */}
          <div className="bg-[#ffffff] p-4 rounded-xl border-2 border-[#4e6074] relative shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#4e6074] uppercase tracking-wider">Step 02</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4e6074] animate-ping"></span>
            </div>
            <h3 className="text-sm font-bold text-[#1b1c18]">Web &amp; Database Basics</h3>
            <p className="text-xs text-[#43474c] mt-1">HTML5, Tailwind CSS, JavaScript ES6 &amp; PostgreSQL schema design.</p>
            <div className="mt-3 inline-block text-[11px] font-semibold text-[#4e6074] bg-[#cfe2fa] px-2 py-0.5 rounded">In Progress</div>
          </div>

          {/* Step 3: Up Next */}
          <div className="bg-[#fbf9f2] p-4 rounded-xl border border-[#e4e2dc] opacity-80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#74777d] uppercase tracking-wider">Step 03</span>
              <span className="text-xs text-[#74777d]">🔒</span>
            </div>
            <h3 className="text-sm font-bold text-[#1b1c18]">React &amp; Cloud Deploy</h3>
            <p className="text-xs text-[#43474c] mt-1">Component architecture, state management &amp; Vercel CI/CD pipelines.</p>
            <div className="mt-3 inline-block text-[11px] font-semibold text-[#74777d] bg-[#f0eee7] px-2 py-0.5 rounded">Locked</div>
          </div>

          {/* Step 4: Capstone */}
          <div className="bg-[#fbf9f2] p-4 rounded-xl border border-[#e4e2dc] opacity-80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#74777d] uppercase tracking-wider">Step 04</span>
              <span className="text-xs text-[#74777d]">🔒</span>
            </div>
            <h3 className="text-sm font-bold text-[#1b1c18]">Capstone Project</h3>
            <p className="text-xs text-[#43474c] mt-1">Complete a real Malaysian NGO web app simulation &amp; verified portfolio.</p>
            <div className="mt-3 inline-block text-[11px] font-semibold text-[#74777d] bg-[#f0eee7] px-2 py-0.5 rounded">Final Gateway</div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: Explore Alternative Careers (Try Other Careers) */}
      {/* ======================================================== */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#e4e2dc] p-6 shadow-sm" data-purpose="explore-alternative-careers">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-[#1b1c18]">Try Other Careers</h2>
            <p className="text-xs text-[#43474c] mt-0.5">Complementary high-growth Malaysian tech paths accessible with SPM/STPM prerequisites.</p>
          </div>
          <span className="text-xs font-semibold text-[#4e6074] cursor-pointer hover:underline">Explore 16+ Roles →</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Data Analyst */}
          <div className="p-4 rounded-xl border border-[#e4e2dc] bg-[#fbf9f2] hover:bg-[#ffffff] hover:border-[#4e6074] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#d3e8da] text-[#0d1f17]">Data &amp; AI</span>
                <span className="text-xs font-bold text-[#059669]">RM 3,800/mo</span>
              </div>
              <h3 className="text-sm font-bold text-[#1b1c18]">Junior Data Analyst</h3>
              <p className="text-xs text-[#43474c] mt-1">SQL, Power BI, Python basics for analytics dashboards in local MNCs.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e4e2dc] flex items-center justify-between">
              <span className="text-[11px] text-[#74777d]">Growth: +24% YoY</span>
              <button
                onClick={() => setActiveCareer('career-data-analyst')}
                className="text-xs font-bold text-[#4e6074] hover:underline"
              >
                Switch Track →
              </button>
            </div>
          </div>

          {/* Card 2: Cybersecurity Specialist */}
          <div className="p-4 rounded-xl border border-[#e4e2dc] bg-[#fbf9f2] hover:bg-[#ffffff] hover:border-[#4e6074] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#f3dae7] text-[#251720]">Security</span>
                <span className="text-xs font-bold text-[#059669]">RM 4,200/mo</span>
              </div>
              <h3 className="text-sm font-bold text-[#1b1c18]">Cybersecurity Analyst</h3>
              <p className="text-xs text-[#43474c] mt-1">Network defense, CompTIA Security+, ethical penetration testing.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e4e2dc] flex items-center justify-between">
              <span className="text-[11px] text-[#74777d]">Growth: +31% YoY</span>
              <button
                onClick={() => setActiveCareer('career-cyber-analyst')}
                className="text-xs font-bold text-[#4e6074] hover:underline"
              >
                Switch Track →
              </button>
            </div>
          </div>

          {/* Card 3: Cloud Architect */}
          <div className="p-4 rounded-xl border border-[#e4e2dc] bg-[#fbf9f2] hover:bg-[#ffffff] hover:border-[#4e6074] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#cfe2fa] text-[#091d2e]">Cloud / Infra</span>
                <span className="text-xs font-bold text-[#059669]">RM 4,500/mo</span>
              </div>
              <h3 className="text-sm font-bold text-[#1b1c18]">Cloud Solutions Associate</h3>
              <p className="text-xs text-[#43474c] mt-1">AWS &amp; Google Cloud Platform foundations, Docker containerization.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e4e2dc] flex items-center justify-between">
              <span className="text-[11px] text-[#74777d]">Growth: +28% YoY</span>
              <button
                onClick={() => setActiveCareer('career-cloud-associate')}
                className="text-xs font-bold text-[#4e6074] hover:underline"
              >
                Switch Track →
              </button>
            </div>
          </div>

          {/* Card 4: AI Prompt & Prompt Engineer */}
          <div className="p-4 rounded-xl border border-[#e4e2dc] bg-[#fbf9f2] hover:bg-[#ffffff] hover:border-[#4e6074] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#f3dae7] text-[#251720]">Emerging Tech</span>
                <span className="text-xs font-bold text-[#059669]">RM 4,000/mo</span>
              </div>
              <h3 className="text-sm font-bold text-[#1b1c18]">AI &amp; Automation Specialist</h3>
              <p className="text-xs text-[#43474c] mt-1">LLM APIs, Python automation, agentic workflows, workflow automation.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e4e2dc] flex items-center justify-between">
              <span className="text-[11px] text-[#74777d]">Growth: +45% YoY</span>
              <button
                onClick={() => setActiveCareer('career-ai-specialist')}
                className="text-xs font-bold text-[#4e6074] hover:underline"
              >
                Switch Track →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: Active Mission Simulation Banner */}
      {/* ======================================================== */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#e4e2dc] p-6 shadow-sm" data-purpose="active-mission-banner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#091d2e] bg-[#cfe2fa] px-2.5 py-1 rounded-full">
              ✨ MYFutureJobs Galaxy
            </span>
            <span className="text-xs text-[#74777d] font-medium">Interactive Career Simulator</span>
          </div>
          <span className="text-xs font-bold text-[#251720] bg-[#f3dae7] px-3 py-1 rounded-full">+120 XP Reward</span>
        </div>

        {/* Hero Mission Box */}
        <div className="bg-gradient-to-r from-[#cfe2fa]/40 via-[#f0eee7]/60 to-[#d3e8da]/40 rounded-xl p-6 border border-[#e4e2dc] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">Simulation Active Now</span>
            </div>
            <h3 className="text-xl font-bold text-[#1b1c18]">
              Mission #14: Modern Frontend Architecture &amp; API Integration
            </h3>
            <p className="text-xs md:text-sm text-[#43474c] leading-relaxed">
              Step into an authentic virtual workplace as a Junior Frontend Engineer. Resolve responsive state management, integrate real-time REST endpoints, and ensure accessibility compliance.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-medium bg-white px-2.5 py-1 rounded border border-[#e4e2dc] text-[#1b1c18]">
                ⚡ Hands-on Coding
              </span>
              <span className="text-[11px] font-medium bg-white px-2.5 py-1 rounded border border-[#e4e2dc] text-[#1b1c18]">
                ⏱ 15 Minutes
              </span>
              <span className="text-[11px] font-medium bg-white px-2.5 py-1 rounded border border-[#e4e2dc] text-[#1b1c18]">
                🎓 Aurora Tier Certificate
              </span>
            </div>
          </div>
          <Link
            href="/simulation"
            className="px-6 py-3 rounded-xl bg-[#4e6074] text-white font-bold text-xs hover:bg-[#36485c] transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Launch Simulation</span>
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: Malaysian Job Market Trends */}
      {/* ======================================================== */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#e4e2dc] p-6 shadow-sm" data-purpose="malaysian-job-market-trends">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e4e2dc] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1b1c18]">Try Other Careers: Newest Potential Job Market</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d3e8da] text-[#0d1f17]">Live MDEC Data</span>
            </div>
            <p className="text-xs text-[#43474c] mt-0.5">Real-time local Malaysian job market opportunities benchmarked for entry-level candidates.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#74777d]">Location:</span>
            <span className="text-xs font-bold text-[#1b1c18] bg-[#f0eee7] px-2.5 py-1 rounded">Kuala Lumpur / Selangor</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="p-4 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
            <span className="text-xs font-medium text-[#74777d]">Total Active Openings</span>
            <div className="text-2xl font-black text-[#1b1c18] mt-1">4,820+</div>
            <span className="text-[11px] text-[#059669] font-semibold mt-1 inline-block">↑ 18% over last quarter</span>
          </div>

          <div className="p-4 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
            <span className="text-xs font-medium text-[#74777d]">Median Entry Starting Salary</span>
            <div className="text-2xl font-black text-[#059669] mt-1">RM 3,500 - 4,800</div>
            <span className="text-[11px] text-[#74777d] mt-1 inline-block">Benchmarked by JobStreet &amp; TalentCorp</span>
          </div>

          <div className="p-4 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
            <span className="text-xs font-medium text-[#74777d]">Top Hiring Sectors</span>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">FinTech, Healthcare Tech, E-Commerce</div>
            <span className="text-[11px] text-[#4e6074] font-semibold mt-1 inline-block">82% require React or TypeScript</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: MYFutureJobs Galaxy: Career Details & Candidate Skills */}
      {/* ======================================================== */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#e4e2dc] p-6 shadow-sm" data-purpose="career-deep-dive">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e4e2dc] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1b1c18]">MYFutureJobs Galaxy: Career Details &amp; Required Candidate Skills</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#cfe2fa] text-[#091d2e]">Focus: Software Engineer</span>
            </div>
            <p className="text-xs text-[#43474c] mt-0.5">Comprehensive benchmark requirements based on Malaysia&apos;s National Occupational Skills Standard (NOSS).</p>
          </div>
          <Link
            href="/resume-builder"
            className="px-4 py-2 rounded-xl bg-[#cfe2fa] text-[#091d2e] hover:bg-[#b5c8e0] text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Sync to Resume Builder</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left Column: Technical Requirements */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1b1c18] uppercase tracking-wider text-xs">
              Primary Technical Proficiencies
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c18]">Front-End Development (React, Next.js, Tailwind CSS)</span>
                  <span className="text-[#4e6074] font-bold">Priority High</span>
                </div>
                <div className="w-full bg-[#f0eee7] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#4e6074] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c18]">Relational Databases &amp; SQL Query Optimization</span>
                  <span className="text-[#4e6074] font-bold">Priority Medium</span>
                </div>
                <div className="w-full bg-[#f0eee7] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#4e6074] h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc]">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#1b1c18]">REST API Integration &amp; JSON Handling</span>
                  <span className="text-[#4e6074] font-bold">Priority High</span>
                </div>
                <div className="w-full bg-[#f0eee7] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#4e6074] h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Soft Skills & Qualifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1b1c18] uppercase tracking-wider text-xs">
              Soft Skills &amp; Educational Prerequisites
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1b1c18]">SPM / O-Level Mathematics or Computer Science</span>
                <span className="px-2 py-0.5 bg-[#d3e8da] text-[#0d1f17] rounded text-[10px] font-bold">Required</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1b1c18]">Agile Sprint Collaboration &amp; Code Review</span>
                <span className="px-2 py-0.5 bg-[#cfe2fa] text-[#091d2e] rounded text-[10px] font-bold">Preferred</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1b1c18]">Creative Problem Solving &amp; Algorithmic Logic</span>
                <span className="px-2 py-0.5 bg-[#d3e8da] text-[#0d1f17] rounded text-[10px] font-bold">Core Asset</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fbf9f2] border border-[#e4e2dc] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1b1c18]">English &amp; Bahasa Malaysia Technical Communication</span>
                <span className="px-2 py-0.5 bg-[#d3e8da] text-[#0d1f17] rounded text-[10px] font-bold">Essential</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
