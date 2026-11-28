'use client';

import React, { useState } from 'react';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { EDUCATION_TIERS, TierId } from '@/types/career';

export default function SettingsPage() {
  const { profile, updateProfile, setSettings } = useProgressionStore();

  const [showStagePicker, setShowStagePicker] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const currentTier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.galaxy;

  const handleSelectTier = (tierId: TierId) => {
    updateProfile({ educationTier: tierId });
    setSavedNotice(`Switched stage to ${EDUCATION_TIERS[tierId]?.name} Tier`);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleAudioNarrationToggle = (enabled: boolean) => {
    setSettings({ readAloudEnabled: enabled });
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-2 space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1b1c18]">Settings</h1>
          <p className="text-xs text-[#43474c] mt-1">
            Manage your learning journey stage, accessibility preferences, and student profile.
          </p>
        </div>
        {savedNotice && (
          <div className="px-3 py-1.5 rounded-lg bg-[#d3e8da] text-[#002113] text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{savedNotice}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Section 1: Learning Journey Stage */}
        <section className="bg-[#ffffff] rounded-xl p-5 border border-[#e4e2dc] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1b1c18]">Learning Journey Stage</h2>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#cfe2fa] text-[#091d2e] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">explore</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#1b1c18]">{currentTier.name} Tier</span>
                  <span className="text-xs font-semibold text-[#091d2e] bg-[#cfe2fa] px-2 py-0.5 rounded-full">
                    Lv. {currentTier.id === 'moonrise' ? '1' : currentTier.id === 'starlight' ? '2' : currentTier.id === 'aurora' ? '3' : currentTier.id === 'nebula' ? '4' : '5'}
                  </span>
                </div>
                <p className="text-xs text-[#43474c] mt-0.5">
                  Ages {currentTier.targetAge} ({currentTier.phase}) · Advanced career tracks &amp; mentor access
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowStagePicker(!showStagePicker)}
              className="bg-[#cfe2fa] hover:bg-[#b5c8e0] text-[#091d2e] rounded-full px-4 py-2 text-xs font-bold leading-none tracking-[-0.01em] active:scale-[0.95] transition-all border-0 cursor-pointer shadow-xs"
            >
              {showStagePicker ? 'Hide Options' : 'Change Configuration'}
            </button>
          </div>

          {/* Expandable Stage Selection Grid */}
          {showStagePicker && (
            <div className="mt-4 pt-4 border-t border-[#e4e2dc] animate-fade-in">
              <p className="text-xs font-medium text-[#43474c] mb-3">Select Learning Stage</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'moonrise', lv: 'Lv. 1', name: 'Moonrise', age: '4–6 yrs' },
                  { id: 'starlight', lv: 'Lv. 2', name: 'Starlight', age: '7–9 yrs' },
                  { id: 'aurora', lv: 'Lv. 3', name: 'Aurora', age: '10–12 yrs' },
                  { id: 'nebula', lv: 'Lv. 4', name: 'Nebula', age: '13–15 yrs' },
                  { id: 'galaxy', lv: 'Lv. 5', name: 'Galaxy', age: '16–18+ yrs' },
                ].map((tier) => {
                  const isSelected = profile.educationTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectTier(tier.id as TierId)}
                      className={`rounded-lg p-2.5 text-left transition ${
                        isSelected
                          ? 'border border-[#4e6074] bg-[#cfe2fa]/50 ring-1 ring-[#4e6074]/30'
                          : 'border border-[#e4e2dc] hover:border-[#4e6074]/50 bg-[#ffffff]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#091d2e]">
                        <span>{tier.lv}</span>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px] text-[#4e6074]">
                            check
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[#1b1c18] mt-1">{tier.name}</div>
                      <div className="text-[11px] text-[#43474c]">{tier.age}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Section 2: Learning Experience & Accessibility */}
        <section className="bg-[#ffffff] rounded-xl p-5 border border-[#e4e2dc] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="mb-2">
            <h2 className="text-base font-semibold text-[#1b1c18]">
              Learning Experience &amp; Accessibility
            </h2>
          </div>

          <div className="divide-y divide-[#e4e2dc]">
            {/* Read questions aloud */}
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#cfe2fa] text-[#091d2e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#1b1c18] block">Read questions aloud</span>
                  <span className="text-xs text-[#43474c] mt-0.5 block">
                    Audio narration for quiz questions and missions
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.readAloudEnabled}
                  onChange={(e) => handleAudioNarrationToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e4e2dc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e2dc] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4e6074]"></div>
              </label>
            </div>

            {/* Sound effects */}
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#f3dae7] text-[#53424c] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">music_note</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#1b1c18] block">Sound effects</span>
                  <span className="text-xs text-[#43474c] mt-0.5 block">
                    Audio feedback on completed activities and milestones
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e4e2dc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e2dc] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4e6074]"></div>
              </label>
            </div>

            {/* Reduce motion */}
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#d3e8da] text-[#394b41] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">air</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#1b1c18] block">Reduce motion</span>
                  <span className="text-xs text-[#43474c] mt-0.5 block">
                    Minimize interface transitions and effects
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e4e2dc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e2dc] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4e6074]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Section 3: Account & Security */}
        <section className="bg-[#ffffff] rounded-xl p-5 border border-[#e4e2dc] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1b1c18]">Account &amp; Security</h2>
          </div>

          <div className="border border-[#e4e2dc] rounded-xl bg-[#f6f4ed] divide-y divide-[#e4e2dc] overflow-hidden">
            {/* Row 1: Student Identity */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#d3e8da] text-[#394b41] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1b1c18]">Student Identity</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#d3e8da] text-[#394b41] border border-[#b7cbbe]">
                        <span className="material-symbols-outlined text-[13px]">check</span>
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-[#43474c] mt-0.5">
                      Personal verification &amp; student status
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="bg-[#eae8e1] hover:bg-[#e4e2dc] text-[#1b1c18] border border-[#c4c6cd]/60 h-[34px] px-3.5 rounded-[10px] text-xs font-semibold tracking-[-0.01em] transition-all inline-flex items-center justify-center cursor-pointer"
                >
                  {showPersonalInfo ? 'Hide' : 'View'}
                </button>
              </div>

              {showPersonalInfo && (
                <div className="mt-3 pt-3 border-t border-[#e4e2dc] text-xs space-y-1.5 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-[#43474c]">Full Name:</span>
                    <span className="font-medium text-[#1b1c18]">{profile.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#43474c]">Age:</span>
                    <span className="font-medium text-[#1b1c18]">17</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#43474c]">School / Academy:</span>
                    <span className="font-medium text-[#1b1c18]">SMK Bandar Utama Damansara</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#43474c]">Education Level:</span>
                    <span className="font-medium text-[#1b1c18]">
                      Upper Secondary ({currentTier.name} Tier)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Row 2: Account & Password */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#eae8e1] text-[#43474c] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#1b1c18] block">Account &amp; Password</span>
                  <p className="text-xs text-[#43474c] mt-0.5">alex.rivera@example.com</p>
                </div>
              </div>
              <button
                type="button"
                className="bg-[#eae8e1] hover:bg-[#e4e2dc] text-[#1b1c18] border border-[#c4c6cd]/60 h-[34px] px-3.5 rounded-[10px] text-xs font-semibold tracking-[-0.01em] transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Change Password
              </button>
            </div>

            {/* Row 3: Edit / Sign Out */}
            <div className="px-4 py-3.5 flex items-center justify-between border-t border-[#e4e2dc]">
              <button
                type="button"
                className="bg-[#eae8e1] hover:bg-[#e4e2dc] text-[#1b1c18] border border-[#c4c6cd]/60 h-[34px] px-3.5 rounded-[10px] text-xs font-semibold tracking-[-0.01em] transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ba1a1a] hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
