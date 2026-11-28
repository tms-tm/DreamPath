'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button, Card, ProgressBar } from '@/components/ui';
import { ONBOARDING_QUIZ } from '@/content/onboarding-quiz';
import { pickLocalized, type Locale } from '@/lib/i18n';
import { OnboardingShell } from '@/features/onboarding/OnboardingShell';
import { useOnboardingDraft } from '@/features/onboarding/useOnboardingDraft';

export function QuizView() {
  const router = useRouter();
  const { quizAnswers, setQuizAnswer } = useOnboardingDraft();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [locale] = useState<Locale>('en');

  const questions = ONBOARDING_QUIZ.questions;
  const currentQuestion = questions[questionIndex];
  const selectedOptionId = quizAnswers[currentQuestion.id];
  const progressPercent = Math.round(((questionIndex + (selectedOptionId ? 1 : 0)) / questions.length) * 100);

  const handleOptionKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const options = currentQuestion.options;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = options[(idx + 1) % options.length];
      setQuizAnswer(currentQuestion.id, next.id);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = options[(idx - 1 + options.length) % options.length];
      setQuizAnswer(currentQuestion.id, prev.id);
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      router.push('/onboarding/results');
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      router.push('/onboarding/invite');
    }
  };

  return (
    <OnboardingShell
      step={4}
      title="Personality & Interests Quiz"
      subtitle={`Question ${questionIndex + 1} of ${questions.length}`}
    >
      <Card className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} label="Onboarding quiz progress" />
        </div>

        <h2 className="text-lg font-bold text-on-surface">
          {pickLocalized(currentQuestion.i18n, locale).prompt}
        </h2>

        <div
          role="radiogroup"
          aria-label={pickLocalized(currentQuestion.i18n, locale).prompt}
          className="grid gap-3"
        >
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setQuizAnswer(currentQuestion.id, opt.id)}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'border-primary bg-primary-container text-on-primary-fixed shadow-soft font-bold'
                    : 'border-hairline bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-medium'
                }`}
              >
                <span className="text-sm">{pickLocalized(opt.i18n, locale).label}</span>
                {isSelected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="secondary" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back</span>
          </Button>
          <Button disabled={!selectedOptionId} onClick={handleNext}>
            <span>{questionIndex < questions.length - 1 ? 'Next' : 'See My Matches'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </Card>
    </OnboardingShell>
  );
}
