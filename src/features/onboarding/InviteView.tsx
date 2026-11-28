'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Compass, Sparkles } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';

const showDevShortcut = process.env.NEXT_PUBLIC_DEV_SHORTCUTS === 'true';

export function InviteView() {
  const router = useRouter();
  const { educationLevel, favouriteSubjects, loadDemoStudent } = useOnboardingDraft();

  return (
    <OnboardingShell
      step={3}
      title="Discover Your Career Match"
      subtitle="Answer 8 quick questions to see which Malaysian career tracks fit your strengths."
    >
      <Card className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-primary-container/50 via-surface-container-low to-tertiary-container/50 border border-hairline">
          {/* CSS Planet Artwork */}
          <div
            className="relative w-28 h-28 shrink-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-primary-container shadow-card" />
            <div className="absolute w-28 h-8 rounded-full border-2 border-tertiary/60 -rotate-12" />
          </div>

          <div className="space-y-3 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="sky">{educationLevel}</Badge>
              {favouriteSubjects.map((sub) => (
                <Badge key={sub} variant="sage">
                  {sub}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant">
              We&apos;ll combine your favourite subjects with 8 quick scenario questions to rank your top 3 matches.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-hairline text-xs space-y-1">
            <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
            <p className="font-bold text-on-surface">2 Minutes</p>
            <p className="text-on-surface-variant">8 short scenario questions</p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-hairline text-xs space-y-1">
            <Compass className="w-4 h-4 text-secondary" aria-hidden="true" />
            <p className="font-bold text-on-surface">Top 3 Matches</p>
            <p className="text-on-surface-variant">Tailored to 5 MY careers</p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-hairline text-xs space-y-1">
            <Sparkles className="w-4 h-4 text-tertiary" aria-hidden="true" />
            <p className="font-bold text-on-surface">Switch Anytime</p>
            <p className="text-on-surface-variant">Retake or change in Profile</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button variant="secondary" onClick={() => router.push('/onboarding/confirm')} className="w-full sm:w-auto">
            Skip to Dashboard
          </Button>
          <Button onClick={() => router.push('/onboarding/quiz')} className="w-full sm:w-auto">
            <span>Start Personality Quiz</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        {showDevShortcut && (
          <div className="pt-3 border-t border-hairline flex justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                loadDemoStudent();
                router.push('/onboarding/quiz');
              }}
            >
              Dev: Jump to Step 3 Quiz
            </Button>
          </div>
        )}
      </Card>
    </OnboardingShell>
  );
}
