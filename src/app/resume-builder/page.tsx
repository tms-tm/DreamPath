'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgressionStore } from '@/features/progression/useProgressionStore';

export default function ResumeBuilderPage() {
  const { profile } = useProgressionStore();

  // Personal details state
  const [name, setName] = useState(profile.name || 'Alex Rivera');
  const [headline, setHeadline] = useState('Aspiring Software Engineer');
  const [school, setSchool] = useState('SMK Bandar Utama Damansara');
  const [email, setEmail] = useState('alex.rivera@student.edu.my');
  const [phone, setPhone] = useState('+60 12-345 6789');
  const [summary, setSummary] = useState(
    'Enthusiastic student passionate about building clean web applications and learning algorithmic problem solving. Aiming to pursue Computer Science and contribute to impactful tech projects.'
  );
  const [programme, setProgramme] = useState('Science Stream (SPM Candidate)');
  const [gradYear, setGradYear] = useState('2025');

  // Toggles state
  const [showPhoto, setShowPhoto] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [includeCertificate, setIncludeCertificate] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'compiling' | 'done'>('idle');

  // Technical Skills state
  const [techSkills, setTechSkills] = useState([
    { id: 'html', name: 'HTML & CSS', level: 4, enabled: true },
    { id: 'js', name: 'JavaScript', level: 3, enabled: true },
    { id: 'algo', name: 'Algorithmic Logic', level: 4, enabled: true },
  ]);

  // Soft Skills state
  const [softSkills, setSoftSkills] = useState([
    { id: 'problem', name: 'Problem Solving', level: 4, enabled: true },
    { id: 'comm', name: 'Technical Communication', level: 3, enabled: true },
    { id: 'team', name: 'Teamwork', level: 4, enabled: true },
  ]);

  // Languages state
  const [languages, setLanguages] = useState([
    { id: 'en', name: 'English', level: 4 },
    { id: 'bm', name: 'Bahasa Melayu', level: 5 },
    { id: 'mandarin', name: 'Mandarin', level: 2 },
  ]);

  // Skill level mappings
  const skillLevels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const skillPercentages = [20, 40, 60, 80, 100];

  const langLevels = ['Basic', 'Conversational', 'Proficient', 'Fluent', 'Native'];
  const langPercentages = [20, 40, 65, 85, 100];

  const handleTechLevelChange = (id: string, val: number) => {
    setTechSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, level: val } : s))
    );
  };

  const handleTechToggle = (id: string) => {
    setTechSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSoftLevelChange = (id: string, val: number) => {
    setSoftSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, level: val } : s))
    );
  };

  const handleSoftToggle = (id: string) => {
    setSoftSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleLangLevelChange = (id: string, val: number) => {
    setLanguages((prev) =>
      prev.map((l) => (l.id === id ? { ...l, level: val } : l))
    );
  };

  const handleDownloadPdf = () => {
    setDownloadState('compiling');
    setTimeout(() => {
      setDownloadState('done');
      window.print();
      setTimeout(() => {
        setDownloadState('idle');
      }, 2500);
    }, 900);
  };

  const getSliderTrackBg = (val: number, min = 1, max = 5) => {
    const percent = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, #93c5fd 0%, #93c5fd ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
  };

  return (
    <div className="flex flex-col w-full animate-fade-in pb-16">
      {/* Sub-Navigation Header Bar */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Return navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50/80 text-slate-800 hover:bg-slate-100 transition-colors text-xs font-semibold border border-slate-200"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Profile</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800">Resume Builder</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
                <span className="material-symbols-outlined text-[12px]">sync</span>
                <span>Auto-Synced</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs font-normal">
              Fill in your details. Your DreamPath skills are added for you.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIncludeCertificate(!includeCertificate)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-all text-xs font-semibold cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-blue-500 text-[18px]">
              {includeCertificate ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <span>Include Certificate</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-100 text-blue-900 font-semibold text-xs hover:bg-blue-200 transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            {downloadState === 'compiling' ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Compiling PDF...</span>
              </>
            ) : downloadState === 'done' ? (
              <>
                <span className="material-symbols-outlined text-[18px] text-emerald-700">
                  check_circle
                </span>
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Download Resume (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace (45% left / 55% right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Customization Controls (lg:col-span-5 ~42-45%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: Personal Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Personal Details</h2>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                <span className="font-semibold text-slate-800">Full Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                />
              </label>

              <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                <span className="font-semibold text-slate-800">Headline</span>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                />
              </label>

              <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                <span className="font-semibold text-slate-800">School</span>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                />
              </label>

              {/* Photo & Contact Block */}
              <div className="flex flex-col gap-5 pt-2">
                {/* Photo Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt={name}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuACtQCoAQqbD_A__ILr2F5l3zoVGSabdKnSbzqB2-rYBMY9FJMAn99y9Kg21c-0h1QlaVHI1IrFC0n0uuoVSzgZ19GiXLMwuX-KV2O295xrIgulDxZwGxO9IKgt1TXpodegE0SUbvB0DDuOmwzvmeonXLyup8sx19pLUs3Zq4S1K9nyVEuhvI6JJlTUxzrDMN_eudw_qtu-2tP7lBCb-H56fEILc2LBUrn4IAtzqSL7"
                      className="w-[72px] h-[72px] rounded-full object-cover border-2 border-blue-200 shadow-sm shrink-0"
                    />
                    <div className="flex flex-col items-start gap-1">
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                      >
                        Change photo
                      </button>
                      <span className="text-[11px] text-slate-500">
                        JPG or PNG, school-appropriate.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-medium text-slate-500">
                      Show on resume
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={showPhoto}
                      onClick={() => setShowPhoto(!showPhoto)}
                      className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                        showPhoto ? 'bg-blue-400 justify-end' : 'bg-slate-200 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform"></span>
                    </button>
                  </div>
                </div>

                {/* Thin divider and Contact heading */}
                <div className="border-t border-slate-200 pt-3">
                  <h3 className="text-xs font-semibold text-slate-800 mb-3">Contact (optional)</h3>
                  <div className="flex flex-col gap-3">
                    {/* Email Row */}
                    <div
                      className={`flex items-center justify-between w-full px-3.5 py-1.5 bg-slate-50/50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300/20 transition-all ${
                        !showEmail ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-3">
                        <svg
                          className="w-4 h-4 text-slate-400 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          type="email"
                          disabled={!showEmail}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex.rivera@student.edu.my"
                          className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showEmail}
                        onClick={() => setShowEmail(!showEmail)}
                        className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer shrink-0 ${
                          showEmail ? 'bg-blue-400 justify-end' : 'bg-slate-200 justify-start'
                        }`}
                      >
                        <span className="w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform"></span>
                      </button>
                    </div>

                    {/* Phone Row */}
                    <div
                      className={`flex items-center justify-between w-full px-3.5 py-1.5 bg-slate-50/50 rounded-xl border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300/20 transition-all ${
                        !showPhone ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-3">
                        <svg
                          className="w-4 h-4 text-slate-400 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          type="text"
                          disabled={!showPhone}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+60 12-345 6789"
                          className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showPhone}
                        onClick={() => setShowPhone(!showPhone)}
                        className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer shrink-0 ${
                          showPhone ? 'bg-blue-400 justify-end' : 'bg-slate-200 justify-start'
                        }`}
                      >
                        <span className="w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Summary</h2>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                <span>Suggest with Career Counsellor</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                value={summary}
                maxLength={300}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full h-24 px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 resize-none transition-all leading-relaxed"
              />
              <div className="flex justify-end">
                <span className="text-[11px] text-slate-500 font-medium">
                  {summary.length} / 300
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Education */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Education</h2>
            </div>
            <div className="flex flex-col gap-3.5">
              <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                <span className="font-semibold text-slate-800">School Name</span>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                  <span className="font-semibold text-slate-800">Programme or Stream</span>
                  <input
                    type="text"
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                  />
                </label>
                <label className="text-xs text-slate-800 flex flex-col gap-1.5">
                  <span className="font-semibold text-slate-800">Graduation Year</span>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-800 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300/40 focus:border-blue-300 transition-all"
                  />
                </label>
              </div>

              <button
                type="button"
                className="self-start text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add another</span>
              </button>
            </div>
          </div>

          {/* Card 4: Skills with Draggable Skill Bars */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-800">Skills</h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-semibold">
                  From DreamPath
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Technical Skills */}
              <div className="flex flex-col gap-3">
                <span className="text-xs text-slate-500 font-semibold">Technical Skills</span>
                <div className="flex flex-col gap-4">
                  {techSkills.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={s.enabled}
                            onChange={() => handleTechToggle(s.id)}
                            className="w-4 h-4 rounded accent-blue-400 cursor-pointer"
                          />
                          <span className="text-xs text-slate-800 font-semibold">{s.name}</span>
                        </label>
                        <span className="text-xs font-semibold text-blue-900">
                          {skillLevels[s.level - 1]}
                        </span>
                      </div>
                      <div className="w-full px-0.5">
                        <input
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={s.level}
                          style={{
                            ['--track-bg' as string]: getSliderTrackBg(s.level),
                          }}
                          onChange={(e) => handleTechLevelChange(s.id, Number(e.target.value))}
                          className="custom-slider w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="flex flex-col gap-3">
                <span className="text-xs text-slate-500 font-semibold">Soft Skills</span>
                <div className="flex flex-col gap-4">
                  {softSkills.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={s.enabled}
                            onChange={() => handleSoftToggle(s.id)}
                            className="w-4 h-4 rounded accent-blue-400 cursor-pointer"
                          />
                          <span className="text-xs text-slate-800 font-semibold">{s.name}</span>
                        </label>
                        <span className="text-xs font-semibold text-blue-900">
                          {skillLevels[s.level - 1]}
                        </span>
                      </div>
                      <div className="w-full px-0.5">
                        <input
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={s.level}
                          style={{
                            ['--track-bg' as string]: getSliderTrackBg(s.level),
                          }}
                          onChange={(e) => handleSoftLevelChange(s.id, Number(e.target.value))}
                          className="custom-slider w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="self-start text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add a skill</span>
              </button>
            </div>
          </div>

          {/* Card 5: Extracurricular Activities */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Extracurricular Activities</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Coding Club</span>
                  <span className="text-[11px] text-slate-500">Vice-President</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">2024 – Present</span>
              </div>
              <button
                type="button"
                className="self-start text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add another</span>
              </button>
            </div>
          </div>

          {/* Card 6: Awards & Achievements */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Awards &amp; Achievements</h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">
                  National Robotic Olympiad — Finalist
                </span>
                <span className="text-[11px] text-slate-500 font-medium">2024</span>
              </div>
              <button
                type="button"
                className="self-start text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add another</span>
              </button>
            </div>
          </div>

          {/* Card 7: Languages with Draggable Range Bars */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-800">Languages</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {languages.map((l) => (
                  <div
                    key={l.id}
                    className="p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-800 font-semibold">{l.name}</span>
                      <span className="text-xs font-semibold text-blue-900">
                        {langLevels[l.level - 1]}
                      </span>
                    </div>
                    <div className="w-full px-0.5">
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={l.level}
                        style={{
                          ['--track-bg' as string]: getSliderTrackBg(l.level),
                        }}
                        onChange={(e) => handleLangLevelChange(l.id, Number(e.target.value))}
                        className="custom-slider w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="self-start text-blue-600 hover:text-blue-800 hover:underline text-xs font-semibold flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add another</span>
              </button>
            </div>
          </div>

          {/* Paper size setting note */}
          <div className="flex items-center justify-between px-2 py-1 text-slate-500 text-[11px]">
            <span>Paper size: A4</span>
            <span className="flex items-center gap-1 text-blue-600 cursor-pointer hover:underline">
              <span className="material-symbols-outlined text-[14px]">settings</span>
              <span>Page Setup</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Document Preview Workspace (lg:col-span-7 ~55%) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Realistic Workbench Mat & Toolbar */}
          <div className="w-full bg-slate-50/70 border border-slate-200 rounded-3xl p-5 md:p-8 flex flex-col items-center relative shadow-sm">
            {/* Top Toolbar inside Preview Area */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
                <span className="ml-2 text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
                  Live PDF Canvas View
                </span>
              </div>
              {/* Zoom & Page Controls */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm text-slate-500 text-xs font-semibold">
                <button type="button" className="hover:text-blue-600 flex items-center cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">zoom_out</span>
                </button>
                <span className="font-bold text-slate-800 text-[11px]">100% · Page 1 of 1</span>
                <button type="button" className="hover:text-blue-600 flex items-center cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                </button>
              </div>
            </div>

            {/* The A4 Sheet Simulation Card */}
            <div
              id="pdfPaperSheet"
              className="w-full max-w-[620px] bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(78,96,116,0.08)] p-6 md:p-8 flex flex-col gap-6 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex flex-col items-start text-left">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-wide uppercase">
                    {name || 'ALEX RIVERA'}
                  </h1>
                  <p className="text-sm text-blue-900 font-semibold mt-1">
                    {headline || 'Aspiring Software Engineer'}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-slate-600 text-xs">
                    <span>Kuala Lumpur, Malaysia</span>
                    {showEmail && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span>{email}</span>
                      </>
                    )}
                    {showPhone && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span>{phone}</span>
                      </>
                    )}
                  </div>
                </div>

                {showPhoto && (
                  <div className="shrink-0">
                    <img
                      alt={name}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuACtQCoAQqbD_A__ILr2F5l3zoVGSabdKnSbzqB2-rYBMY9FJMAn99y9Kg21c-0h1QlaVHI1IrFC0n0uuoVSzgZ19GiXLMwuX-KV2O295xrIgulDxZwGxO9IKgt1TXpodegE0SUbvB0DDuOmwzvmeonXLyup8sx19pLUs3Zq4S1K9nyVEuhvI6JJlTUxzrDMN_eudw_qtu-2tP7lBCb-H56fEILc2LBUrn4IAtzqSL7"
                      className="rounded-xl shadow-sm border border-slate-200 object-cover"
                      style={{ width: '90px', height: '90px' }}
                    />
                  </div>
                )}
              </div>

              {/* Section: SUMMARY */}
              <div className="flex flex-col gap-2 pt-1">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Summary
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed pt-1">
                  {summary}
                </p>
              </div>

              {/* Section: EDUCATION */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Education
                </h2>
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-900">
                    <span className="font-bold">{school}</span>
                    <span className="text-slate-600">Expected {gradYear}</span>
                  </div>
                  <p className="text-xs text-slate-600">{programme}</p>
                </div>
              </div>

              {/* Section: SKILLS */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Skills
                </h2>
                <div className="flex flex-col gap-3 pt-1 text-xs text-slate-900">
                  {/* Technical Skills Preview */}
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                      Technical Skills
                    </div>
                    <div className="flex flex-col gap-2">
                      {techSkills
                        .filter((s) => s.enabled)
                        .map((s) => (
                          <div key={s.id} className="flex items-center justify-between gap-4">
                            <span className="font-medium text-xs text-slate-800">{s.name}</span>
                            <div className="w-36 rounded-full bg-slate-200" style={{ height: '5px' }}>
                              <div
                                className="h-full rounded-full bg-blue-400 transition-all duration-200"
                                style={{ width: `${skillPercentages[s.level - 1]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Soft Skills Preview */}
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                      Soft Skills
                    </div>
                    <div className="flex flex-col gap-2">
                      {softSkills
                        .filter((s) => s.enabled)
                        .map((s) => (
                          <div key={s.id} className="flex items-center justify-between gap-4">
                            <span className="font-medium text-xs text-slate-800">{s.name}</span>
                            <div className="w-36 rounded-full bg-slate-200" style={{ height: '5px' }}>
                              <div
                                className="h-full rounded-full bg-blue-400 transition-all duration-200"
                                style={{ width: `${skillPercentages[s.level - 1]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: EXTRACURRICULAR ACTIVITIES */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Extracurricular Activities
                </h2>
                <ul className="flex flex-col gap-1 pt-1 text-xs text-slate-800 list-disc list-inside">
                  <li>
                    <span className="font-bold text-slate-900">Coding Club</span> — Vice-President (2024 – Present)
                  </li>
                </ul>
              </div>

              {/* Section: AWARDS & ACHIEVEMENTS */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Awards &amp; Achievements
                </h2>
                <ul className="flex flex-col gap-1 pt-1 text-xs text-slate-800 list-disc list-inside">
                  <li>
                    <span className="font-bold text-slate-900">National Robotic Olympiad</span> — Finalist (2024)
                  </li>
                </ul>
              </div>

              {/* Section: LANGUAGES */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                  Languages
                </h2>
                <div className="flex flex-col gap-2 pt-1 text-xs text-slate-900">
                  {languages.map((l) => (
                    <div key={l.id} className="flex items-center justify-between gap-4">
                      <span className="font-medium text-xs text-slate-800">
                        {l.name} ({langLevels[l.level - 1]})
                      </span>
                      <div className="w-36 rounded-full bg-slate-200" style={{ height: '5px' }}>
                        <div
                          className="h-full rounded-full bg-blue-400 transition-all duration-200"
                          style={{ width: `${langPercentages[l.level - 1]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Certificate Section if toggled */}
              {includeCertificate && (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                  <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                    Verified Credentials
                  </h2>
                  <div className="flex items-center justify-between text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-700 text-[18px]">
                        verified
                      </span>
                      <span className="font-semibold text-slate-900">DreamPath Web Foundations Certificate</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">Issued 2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
