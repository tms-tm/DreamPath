'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

interface OnboardingShellProps {
  step: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const TOTAL_STEPS = 6;

export function OnboardingShell({ step, title, subtitle, children }: OnboardingShellProps) {
  return (
    <div className="max-w-3xl w-full mx-auto py-4 sm:py-6 px-3 sm:px-4 space-y-5 sm:space-y-6 animate-fade-in overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Badge variant="sky">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Nebula Tier (Form 1–3) · Step {step} of {TOTAL_STEPS}</span>
        </Badge>

        <div className="flex items-center gap-1.5" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const stepNum = index + 1;
            const isCurrent = stepNum === step;
            const isDone = stepNum < step;
            return (
              <span
                key={stepNum}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'w-7 bg-primary'
                    : isDone
                      ? 'w-3 bg-secondary'
                      : 'w-3 bg-surface-container-high'
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight break-words">
          {title}
        </h1>
        {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant break-words">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}
