'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { CAREERS, getCareerById } from '@/content/careers';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';
import { useProgressionStore } from '@/stores/useProgressionStore';

export function ConfirmView() {
  const router = useRouter();
  const { educationLevel, favouriteSubjects, selectedCareerId, resetQuizAnswers } =
    useOnboardingDraft();
  const { setActiveCareer, profile } = useProgressionStore();

  const chosenCareer =
    getCareerById(selectedCareerId ?? profile.activeCareerId) ?? CAREERS[0];

  const handleLaunchDashboard = () => {
    // Commit only activeCareerId (never raw quiz answers); educationLevel & favouriteSubjects
    // persist in useProfileStore once T-28 splits the store.
    setActiveCareer(chosenCareer.id);
    resetQuizAnswers();
    router.push('/');
  };

  return (
    <OnboardingShell
      step={6}
      title="Are you sure?"
      subtitle="Review your chosen track before launching your dashboard."
    >
      <Card variant="elevated" className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="sky">{educationLevel}</Badge>
            {favouriteSubjects.map((subj) => (
              <Badge key={subj} variant="sage">
                {subj}
              </Badge>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-hairline space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Selected Career Track</span>
            </div>
            <h2 className="text-2xl font-extrabold text-on-surface">
              {chosenCareer.i18n.en.title}
            </h2>
            <p className="text-sm text-on-surface-variant">{chosenCareer.i18n.en.description}</p>
            <p className="text-xs font-semibold text-secondary">
              Estimated (MY): RM {chosenCareer.salaryRange.entry[0].toLocaleString()} – RM{' '}
              {chosenCareer.salaryRange.entry[1].toLocaleString()} /mo
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => router.push('/onboarding/results')}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Go Back &amp; Change</span>
          </Button>
          <Button onClick={handleLaunchDashboard} className="w-full sm:w-auto">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>Yes, Launch My Dashboard</span>
          </Button>
        </div>
      </Card>
    </OnboardingShell>
  );
}
