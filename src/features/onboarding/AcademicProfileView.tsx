'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { SUBJECT_OPTIONS } from '@/content/onboarding-quiz';
import type { SubjectId } from '@/content/schemas';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { type FormLevel, useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';

const FORM_LEVELS: FormLevel[] = ['Form 1', 'Form 2', 'Form 3'];

export function AcademicProfileView() {
  const router = useRouter();
  const { educationLevel, favouriteSubjects, setAcademicProfile } = useOnboardingDraft();

  const toggleSubject = (subject: SubjectId) => {
    const exists = favouriteSubjects.includes(subject);
    if (exists) {
      setAcademicProfile({
        educationLevel,
        favouriteSubjects: favouriteSubjects.filter((s) => s !== subject),
      });
      return;
    }
    if (favouriteSubjects.length >= 3) return;
    setAcademicProfile({
      educationLevel,
      favouriteSubjects: [...favouriteSubjects, subject],
    });
  };

  const canContinue = favouriteSubjects.length >= 2 && favouriteSubjects.length <= 3;

  return (
    <OnboardingShell
      step={2}
      title="Your Academic Profile"
      subtitle="Select your Form level (Nebula tier: ages 13–15) and 2 to 3 favourite subjects."
    >
      <Card className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-on-surface">1. Current Form Level</h2>
          <div className="grid grid-cols-3 gap-3">
            {FORM_LEVELS.map((level) => {
              const isSelected = educationLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setAcademicProfile({ educationLevel: level, favouriteSubjects })}
                  className={`p-3.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary-container text-on-primary-fixed shadow-soft'
                      : 'border-hairline bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-on-surface">2. Favourite Subjects (Pick 2–3)</h2>
            <Badge variant={canContinue ? 'sage' : 'neutral'}>
              {favouriteSubjects.length} / 3 selected
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUBJECT_OPTIONS.map((subject) => {
              const isSelected = favouriteSubjects.includes(subject);
              const isDisabled = !isSelected && favouriteSubjects.length >= 3;
              return (
                <button
                  key={subject}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => toggleSubject(subject)}
                  className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-secondary bg-secondary-container text-on-secondary-fixed shadow-soft'
                      : 'border-hairline bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span>{subject}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="secondary" onClick={() => router.push('/onboarding')}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back</span>
          </Button>
          <Button disabled={!canContinue} onClick={() => router.push('/onboarding/invite')}>
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </Card>
    </OnboardingShell>
  );
}
