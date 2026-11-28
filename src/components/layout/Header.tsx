'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { useProfileStore } from '@/features/profile/useProfileStore';
import { useSettingsStore } from '@/features/settings/useSettingsStore';
import { CAREER_PATHS } from '@/types/career';
import { speakText, stopSpeaking } from '@/utils/sound';

export function Header() {
  const pathname = usePathname();
  const { setActiveCareer: setProgressionCareer } = useProgressionStore();
  const { nickname, avatarChar, activeCareerId, setActiveCareer } = useProfileStore();
  const { readAloudEnabled, setSettings } = useSettingsStore();
  const activeCareer =
    CAREER_PATHS.find((c) => c.id === activeCareerId) || CAREER_PATHS[0];

  const handleAudioToggle = () => {
    const nextVal = !readAloudEnabled;
    setSettings({ readAloudEnabled: nextVal });
    if (nextVal) {
      speakText(`Voice assistance enabled for ${nickname}.`);
    } else {
      stopSpeaking();
    }
  };

  const handleCareerChange = (careerId: string) => {
    setActiveCareer(careerId);
    setProgressionCareer(careerId);
  };

  const isProfile = pathname === '/profile';

  return (
    <header className="h-16 px-6 sm:px-8 flex items-center justify-between bg-surface/90 backdrop-blur-md sticky top-0 z-40 select-none border-b border-hairline/60">
      <div className="flex items-center gap-3.5">
        {isProfile ? (
          <h1 className="text-xl font-bold tracking-tight text-on-surface">Profile</h1>
        ) : (
          <>
            <h1 className="text-lg font-bold tracking-tight text-on-surface">
              Good evening, {nickname}
            </h1>

            <div className="relative">
              <select
                value={activeCareer.id}
                onChange={(e) => handleCareerChange(e.target.value)}
                aria-label="Active career track"
                className="appearance-none inline-flex items-center gap-1.5 pl-3 pr-8 py-1 rounded-full border border-hairline bg-surface-container-lowest text-xs font-semibold text-on-surface hover:border-outline transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {CAREER_PATHS.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-4 h-4 text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant={readAloudEnabled ? 'primary' : 'secondary'}
          size="sm"
          onClick={handleAudioToggle}
          title={readAloudEnabled ? 'Voice Assist On' : 'Voice Assist Off'}
          aria-label={readAloudEnabled ? 'Disable voice assist' : 'Enable voice assist'}
          className="w-9 h-9 p-0 rounded-full"
        >
          {readAloudEnabled ? (
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          ) : (
            <VolumeX className="w-4 h-4" aria-hidden="true" />
          )}
        </Button>

        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full border border-hairline bg-surface-container-lowest hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-colors"
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
        </Link>

        <Link
          href="/profile"
          aria-label="Open profile"
          className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 ml-1 text-on-primary-fixed font-bold text-sm shadow-soft hover:opacity-90 transition-opacity"
        >
          {avatarChar || 'D'}
        </Link>
      </div>
    </header>
  );
}
