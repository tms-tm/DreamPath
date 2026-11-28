'use client';

import React, { useState } from 'react';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { useProfileStore } from '@/features/profile/useProfileStore';
import { useSettingsStore } from '@/features/settings/useSettingsStore';
import { EDUCATION_TIERS } from '@/types/career';

export default function SettingsPage() {
  const { profile } = useProgressionStore();
  const { nickname, educationLevel } = useProfileStore();
  const { readAloudEnabled, soundEffectsEnabled, reduceMotion, setSettings } = useSettingsStore();

  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const currentTier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.nebula;

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
                    Lv. {profile.currentLevel}
                  </span>
                </div>
                <p className="text-xs text-[#43474c] mt-0.5">
                  {currentTier.targetAge} · {currentTier.gradeDesc}
                </p>
              </div>
            </div>
          </div>
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
                  checked={readAloudEnabled}
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
                  checked={soundEffectsEnabled}
                  onChange={(e) => setSettings({ soundEffectsEnabled: e.target.checked })}
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
                  onChange={(e) => setSettings({ reduceMotion: e.target.checked })}
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
                    <span className="text-[#43474c]">Nickname:</span>
                    <span className="font-medium text-[#1b1c18]">{nickname}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#43474c]">Education Level:</span>
                    <span className="font-medium text-[#1b1c18]">
                      {currentTier.name} Tier ({educationLevel})
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
                  <p className="text-xs text-[#43474c] mt-0.5">{profile.handle}</p>
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
