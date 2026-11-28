'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Globe,
  LogOut,
  Music,
  ShieldCheck,
  Trash2,
  Volume2,
  Wind,
} from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { signOutStudent } from '@/features/auth/authActions';
import { useSession } from '@/features/auth/useSession';
import { useProfileStore } from '@/features/profile/useProfileStore';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { syncProfileToSupabase } from '@/features/progression/sync';
import { DeleteAccountModal } from '@/features/settings/DeleteAccountModal';
import { useSettingsStore } from '@/features/settings/useSettingsStore';
import { EDUCATION_TIERS } from '@/types/career';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const { profile } = useProgressionStore();
  const { nickname, educationLevel } = useProfileStore();
  const { locale, readAloudEnabled, soundEffectsEnabled, reduceMotion, setLocale, setSettings } =
    useSettingsStore();

  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const currentTier = EDUCATION_TIERS[profile.educationTier] || EDUCATION_TIERS.nebula;

  const handleLocaleChange = (nextLocale: 'en' | 'ms') => {
    setLocale(nextLocale);
    void syncProfileToSupabase({ locale: nextLocale });
  };

  const handleSignOut = async () => {
    await signOutStudent();
    router.push('/onboarding');
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-2 space-y-6 animate-fade-in pb-16">
      <PageHeader
        title="Settings"
        subtitle="Manage your language, accessibility preferences, and student account."
      />

      {/* Section 1: Learning Journey Stage */}
      <Card className="space-y-4">
        <h2 className="text-base font-bold text-on-surface">Learning Journey Stage</h2>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-fixed flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface">{currentTier.name} Tier</span>
                <Badge variant="sky">Lv. {profile.currentLevel}</Badge>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {educationLevel} · {currentTier.targetAge}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 2: Language & Learning Preferences */}
      <Card className="space-y-3">
        <h2 className="text-base font-bold text-on-surface">
          Language &amp; Accessibility
        </h2>

        <div className="divide-y divide-hairline">
          {/* Language switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-semibold text-on-surface block">App Language</span>
                <span className="text-xs text-on-surface-variant block">
                  Switch UI and learning content between English and Bahasa Malaysia
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={locale === 'en' ? 'primary' : 'secondary'}
                onClick={() => handleLocaleChange('en')}
              >
                English
              </Button>
              <Button
                size="sm"
                variant={locale === 'ms' ? 'primary' : 'secondary'}
                onClick={() => handleLocaleChange('ms')}
              >
                Bahasa Malaysia
              </Button>
            </div>
          </div>

          {/* Read questions aloud */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-fixed flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-medium text-on-surface block">Read questions aloud</span>
                <span className="text-xs text-on-surface-variant block">
                  Audio narration for study lessons, quiz questions, and scenarios
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={readAloudEnabled}
                onChange={(e) => setSettings({ readAloudEnabled: e.target.checked })}
                className="sr-only peer"
                aria-label="Read questions aloud"
              />
              <div className="w-9 h-5 bg-hairline rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          {/* Sound effects */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-tertiary-container text-on-surface flex items-center justify-center shrink-0">
                <Music className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-medium text-on-surface block">Sound effects</span>
                <span className="text-xs text-on-surface-variant block">
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
                aria-label="Sound effects"
              />
              <div className="w-9 h-5 bg-hairline rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          {/* Reduce motion */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-medium text-on-surface block">Reduce motion</span>
                <span className="text-xs text-on-surface-variant block">
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
                aria-label="Reduce motion"
              />
              <div className="w-9 h-5 bg-hairline rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </Card>

      {/* Section 3: Account & Security */}
      <Card className="space-y-4">
        <h2 className="text-base font-bold text-on-surface">Account &amp; Security</h2>

        <div className="border border-hairline rounded-xl bg-surface-container-low divide-y divide-hairline overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-on-surface">Student Identity</span>
                    <Badge variant="sage">
                      {isAuthenticated ? 'Cloud Synced' : 'Local Mode'}
                    </Badge>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Minimal non-PII student profile &amp; privacy protection
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPersonalInfo(!showPersonalInfo)}
              >
                {showPersonalInfo ? 'Hide' : 'View'}
              </Button>
            </div>

            {showPersonalInfo && (
              <div className="mt-3 pt-3 border-t border-hairline text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Nickname:</span>
                  <span className="font-semibold text-on-surface">{nickname}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Education Level:</span>
                  <span className="font-semibold text-on-surface">{educationLevel}</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-wrap items-center justify-between gap-3">
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Sign Out</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteModalOpen(true)}
              className="text-error border-error/30 hover:bg-error-container"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span>Delete My Account</span>
            </Button>
          </div>
        </div>
      </Card>

      <DeleteAccountModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        isSupabaseSession={isAuthenticated}
      />
    </div>
  );
}
