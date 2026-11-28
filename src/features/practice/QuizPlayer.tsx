'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, RotateCcw, Star, XCircle } from 'lucide-react';
import { Badge, Button, Card, PageHeader, ProgressBar } from '@/components/ui';
import { QUIZZES, getQuizById, getQuizzesByCareer } from '@/content/quizzes';
import { getDictionary, pickLocalized, type Locale } from '@/lib/i18n';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { scoreQuizSubmission, type QuizScoreResult } from '@/features/practice/logic';

export function QuizPlayer() {
  const searchParams = useSearchParams();
  const { profile, completedActivityIds, completeActivity } = useProgressionStore();

  const locale: Locale = searchParams.get('lang') === 'ms' ? 'ms' : 'en';
  const dict = getDictionary(locale);

  const requestedCareer = searchParams.get('career') || profile.activeCareerId;
  const requestedId = searchParams.get('id');

  const availableQuizzes = useMemo(() => {
    const byCareer = getQuizzesByCareer(requestedCareer);
    return byCareer.length > 0 ? byCareer : QUIZZES;
  }, [requestedCareer]);

  const [selectedId, setSelectedId] = useState<string | null>(requestedId);
  const quiz = (selectedId ? getQuizById(selectedId) : undefined) ?? availableQuizzes[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedResult, setSubmittedResult] = useState<
    (QuizScoreResult & { awardedXp: number }) | null
  >(null);

  if (!quiz) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <PageHeader title={dict.practice.quizTitle} />
        <Card className="text-center py-10 space-y-4">
          <p className="text-sm text-on-surface-variant">{dict.practice.emptyState}</p>
          <Link href="/modes" className="text-sm font-bold text-primary hover:underline">
            {dict.practice.backToModes}
          </Link>
        </Card>
      </div>
    );
  }

  const quizMeta = pickLocalized(quiz.i18n, locale);
  const currentQuestion = quiz.questions[questionIndex];
  const questionI18n = pickLocalized(currentQuestion.i18n, locale);
  const pickedLabel = answers[currentQuestion.id];
  const isAnswered = Boolean(pickedLabel);
  const isAlreadyCompleted = completedActivityIds.includes(quiz.id);

  const handleSelectQuiz = (nextQuizId: string) => {
    setSelectedId(nextQuizId);
    setQuestionIndex(0);
    setAnswers({});
    setSubmittedResult(null);
  };

  const handlePickOption = (label: string) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: label }));
  };

  const handleNextOrFinish = () => {
    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }

    const score = scoreQuizSubmission(quiz, answers);
    const completion = completeActivity({
      activityId: quiz.id,
      xpReward: score.xpAwarded,
      skillImpacts: score.skillImpacts,
      missionCountDelta: 1,
    });
    setSubmittedResult({ ...score, awardedXp: completion.awardedXp });
  };

  const handleRetake = () => {
    setQuestionIndex(0);
    setAnswers({});
    setSubmittedResult(null);
  };

  const pickedOption = questionI18n.options.find((o) => o.label === pickedLabel);
  const isCurrentCorrect = pickedLabel === currentQuestion.correctLabel;

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/modes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{dict.practice.backToModes}</span>
        </Link>

        {availableQuizzes.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {availableQuizzes.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={item.id === quiz.id ? 'primary' : 'secondary'}
                onClick={() => handleSelectQuiz(item.id)}
              >
                {pickLocalized(item.i18n, locale).title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <PageHeader
        eyebrow={dict.practice.quizTitle}
        title={quizMeta.title}
        subtitle={quizMeta.description}
        action={
          isAlreadyCompleted ? (
            <Badge variant="sage">{dict.practice.completedBadge}</Badge>
          ) : undefined
        }
      />

      {isAlreadyCompleted && !submittedResult && (
        <Card variant="muted" padding="sm" className="text-xs font-medium text-on-surface-variant">
          {dict.practice.replayNotice}
        </Card>
      )}

      {!submittedResult ? (
        <Card className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
              <span>
                {dict.practice.questionProgress} {questionIndex + 1} / {quiz.questions.length}
              </span>
              <Badge variant="neutral">{currentQuestion.skillId}</Badge>
            </div>
            <ProgressBar
              value={questionIndex + 1}
              max={quiz.questions.length}
              label="Quiz progress"
            />
          </div>

          <h2 className="text-lg font-bold text-on-surface">{questionI18n.question}</h2>

          <div className="grid gap-3">
            {questionI18n.options.map((opt) => {
              const isSelected = pickedLabel === opt.label;
              const isRightOption = opt.label === currentQuestion.correctLabel;
              let stateStyle =
                'border-hairline bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary';

              if (isAnswered) {
                if (isRightOption) {
                  stateStyle = 'border-secondary bg-secondary-container/50';
                } else if (isSelected) {
                  stateStyle = 'border-error bg-error-container/50';
                }
              }

              return (
                <button
                  key={opt.label}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handlePickOption(opt.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${stateStyle}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-surface-container-high text-on-surface font-bold text-xs flex items-center justify-center shrink-0">
                    {opt.label}
                  </span>
                  <span className="text-sm font-medium text-on-surface">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && pickedOption && (
            <div className="p-4 rounded-xl bg-surface-container-low border border-hairline flex items-start gap-3">
              {isCurrentCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <XCircle className="w-5 h-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div className="space-y-1 text-xs">
                <p className="font-bold text-on-surface">
                  {isCurrentCorrect
                    ? dict.practice.correctFeedback
                    : dict.practice.incorrectFeedback}
                </p>
                <p className="text-on-surface-variant">{pickedOption.explanation}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleNextOrFinish} disabled={!isAnswered}>
              {questionIndex < quiz.questions.length - 1
                ? dict.practice.nextQuestion
                : dict.practice.finishQuiz}
            </Button>
          </div>
        </Card>
      ) : (
        <Card variant="elevated" className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: submittedResult.stars }).map((_, idx) => (
                <Star
                  key={idx}
                  className="w-5 h-5 text-on-sunshine-container fill-sunshine-container"
                  aria-hidden="true"
                />
              ))}
              <span className="text-xs font-bold text-on-surface-variant ml-1">
                {submittedResult.stars}/3 {dict.practice.starsEarned}
              </span>
            </div>
            <Badge variant={submittedResult.awardedXp > 0 ? 'sage' : 'neutral'}>
              +{submittedResult.awardedXp} {dict.common.xpLabel}
            </Badge>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-on-surface">
              {submittedResult.correctCount} / {submittedResult.totalQuestions}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {submittedResult.awardedXp > 0
                ? `${dict.practice.xpEarned}: +${submittedResult.awardedXp} XP`
                : dict.practice.replayNotice}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleRetake}>
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{dict.practice.retake}</span>
            </Button>
            <Link
              href="/modes"
              className="px-4 py-2.5 rounded-xl border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-sm font-semibold text-on-surface"
            >
              {dict.practice.backToModes}
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
