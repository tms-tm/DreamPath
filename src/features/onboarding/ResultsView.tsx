'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, RotateCcw, Sparkles, Wallet } from 'lucide-react';
import { Badge, Button, Card } from '@/components/ui';
import { computeTraitScoresFromAnswers, matchCareers } from '@/lib/career-matching';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';

export function ResultsView() {
  const router = useRouter();
  const { favouriteSubjects, quizAnswers, resetQuizAnswers, setSelectedCareerId } =
    useOnboardingDraft();

  const top3 = useMemo(() => {
    const userTraits = computeTraitScoresFromAnswers(quizAnswers);
    return matchCareers({
      selectedSubjects: favouriteSubjects,
      userTraits,
    });
  }, [favouriteSubjects, quizAnswers]);

  const handleChoose = (careerId: string) => {
    setSelectedCareerId(careerId);
    router.push('/onboarding/confirm');
  };

  const handleRetake = () => {
    resetQuizAnswers();
    router.push('/onboarding/quiz');
  };

  return (
    <OnboardingShell
      step={5}
      title="Your Top 3 Career Matches"
      subtitle="Ranked from your favourite subjects and quiz answers."
    >
      <div className="space-y-4">
        {top3.map((item, idx) => {
          const rankLabel = idx === 0 ? '#1 Best Match' : `#${idx + 1} Match`;
          return (
            <Card
              key={item.career.id}
              variant={idx === 0 ? 'elevated' : 'default'}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={idx === 0 ? 'sky' : 'neutral'}>
                    {idx === 0 && <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{rankLabel}</span>
                  </Badge>
                  <Badge variant="sage">{item.matchPercent}% Match</Badge>
                </div>

                <span className="text-xs font-bold text-secondary flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    Estimated (MY): RM {item.career.salaryRange.entry[0].toLocaleString()} – RM{' '}
                    {item.career.salaryRange.entry[1].toLocaleString()} /mo
                  </span>
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-on-surface">{item.career.i18n.en.title}</h2>
                <p className="text-sm text-on-surface-variant">{item.reasons.en}</p>
                <p className="text-[11px] text-outline">Source: {item.career.salarySource}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.career.coreSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant={idx === 0 ? 'primary' : 'secondary'}
                  onClick={() => handleChoose(item.career.id)}
                >
                  <span>Choose This Career</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </Card>
          );
        })}

        <div className="flex justify-start pt-2">
          <Button variant="ghost" onClick={handleRetake}>
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Retake the quiz</span>
          </Button>
        </div>
      </div>
    </OnboardingShell>
  );
}
