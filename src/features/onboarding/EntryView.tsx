'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';
import { useProgressionStore } from '@/stores/useProgressionStore';

export function EntryView() {
  const router = useRouter();
  const { setAuthDraft, loadDemoStudent } = useOnboardingDraft();
  const { updateProfile } = useProgressionStore();

  const [tab, setTab] = useState<'signin' | 'register'>('register');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || password.length < 6) {
      setError('Please enter a valid email and a password of at least 6 characters.');
      return;
    }

    if (tab === 'register') {
      if (!nickname.trim()) {
        setError('Please choose a nickname.');
        return;
      }
      if (!consentChecked) {
        setError('Parent or guardian permission is required to create an account.');
        return;
      }

      const timestamp = new Date().toISOString();
      setAuthDraft({ nickname: nickname.trim(), consentAcceptedAt: timestamp });
      updateProfile({
        name: nickname.trim(),
        avatarChar: nickname.trim().charAt(0).toUpperCase() || 'D',
      });
      router.push('/onboarding/profile');
      return;
    }

    const fallbackName = email.split('@')[0] || 'Student';
    setAuthDraft({ nickname: fallbackName, consentAcceptedAt: null });
    updateProfile({
      name: fallbackName,
      avatarChar: fallbackName.charAt(0).toUpperCase() || 'D',
    });
    router.push('/onboarding/profile');
  };

  const handleDemoStudent = () => {
    loadDemoStudent();
    updateProfile({
      name: 'Demo Student',
      handle: '@demostudent',
      avatarChar: 'D',
    });
    router.push('/onboarding/invite');
  };

  return (
    <OnboardingShell
      step={1}
      title="Welcome to DreamPath"
      subtitle="Sign in, create a student account, or jump right in as Demo Student."
    >
      <Card className="space-y-6">
        <div className="flex gap-2 p-1 rounded-xl bg-surface-container-low border border-hairline w-fit">
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              tab === 'register'
                ? 'bg-surface-container-lowest text-on-surface shadow-soft'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setError(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              tab === 'signin'
                ? 'bg-surface-container-lowest text-on-surface shadow-soft'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="onboarding-nickname" className="text-xs font-bold text-on-surface">
                Nickname
              </label>
              <input
                id="onboarding-nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Aiman_H"
                className="w-full rounded-xl border border-hairline bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="onboarding-email" className="text-xs font-bold text-on-surface">
              Email
            </label>
            <input
              id="onboarding-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full rounded-xl border border-hairline bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="onboarding-password" className="text-xs font-bold text-on-surface">
              Password
            </label>
            <input
              id="onboarding-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-hairline bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
            />
          </div>

          {tab === 'register' && (
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-hairline cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-hairline accent-primary"
              />
              <span className="text-xs text-on-surface leading-relaxed flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  I confirm I have my parent or guardian&apos;s permission to use DreamPath.
                </span>
              </span>
            </label>
          )}

          {error && (
            <p role="alert" className="text-xs font-semibold text-error bg-error-container px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="flex-1">
              <span>{tab === 'register' ? 'Continue' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>

            <Button type="button" variant="secondary" onClick={handleDemoStudent} className="flex-1">
              <UserCheck className="w-4 h-4" aria-hidden="true" />
              <span>Continue as Demo Student</span>
            </Button>
          </div>
        </form>

        <p className="text-[11px] text-outline flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>We collect only your nickname and learning preferences — never your real name or school.</span>
        </p>
      </Card>
    </OnboardingShell>
  );
}
