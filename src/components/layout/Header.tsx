'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressionStore } from '@/stores/useProgressionStore';
import { CAREER_PATHS } from '@/types/career';
import { speakText, stopSpeaking } from '@/utils/sound';

export function Header() {
  const pathname = usePathname();
  const { profile, setSettings, setActiveCareer } = useProgressionStore();
  const activeCareer =
    CAREER_PATHS.find((c) => c.id === profile.activeCareerId) || CAREER_PATHS[0];

  const handleAudioToggle = () => {
    const nextVal = !profile.readAloudEnabled;
    setSettings({ readAloudEnabled: nextVal });
    if (nextVal) {
      speakText(`Voice assistance enabled for ${profile.name}.`);
    } else {
      stopSpeaking();
    }
  };

  const isProfile = pathname === '/profile';

  return (
    <header className="h-16 px-6 sm:px-8 flex items-center justify-between bg-surface/90 backdrop-blur-md sticky top-0 z-40 select-none">
      {/* Left title / Greeting & Career Track Picker */}
      <div className="flex items-center gap-3.5">
        {isProfile ? (
          <h1 className="text-xl font-bold tracking-tight text-on-surface">
            Profile
          </h1>
        ) : (
          <>
            <h1 className="text-lg font-bold tracking-tight text-on-surface">
              Good evening, {profile.name}
            </h1>

            {/* Career Selector Dropdown matching Stitch Screen */}
            <div className="relative">
              <select
                value={activeCareer.id}
                onChange={(e) => setActiveCareer(e.target.value)}
                className="appearance-none inline-flex items-center gap-1.5 pl-3 pr-8 py-1 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-xs font-semibold text-on-surface hover:border-outline transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {CAREER_PATHS.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.title}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                expand_more
              </span>
            </div>
          </>
        )}
      </div>

      {/* Action items */}
      <div className="flex items-center gap-2.5">
        {/* Read Aloud Toggle */}
        <button
          onClick={handleAudioToggle}
          title={profile.readAloudEnabled ? 'Voice Assist On' : 'Voice Assist Off'}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
            profile.readAloudEnabled
              ? 'bg-primary-fixed text-on-primary-fixed border-primary/40'
              : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {profile.readAloudEnabled ? 'volume_up' : 'volume_off'}
          </span>
        </button>

        {/* Notifications */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Link>

        {/* User profile avatar circle matching Stitch */}
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 ml-1 text-on-primary-fixed font-bold text-sm shadow-xs hover:opacity-90 transition-opacity"
        >
          {profile.avatarChar || 'A'}
        </Link>
      </div>
    </header>
  );
}
