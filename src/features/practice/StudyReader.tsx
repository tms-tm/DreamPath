'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Volume2, VolumeX } from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { STUDY_LESSONS, getStudiesByCareer, getStudyById } from '@/content/studies';
import { getDictionary, pickLocalized, type Locale } from '@/lib/i18n';
import { useProgressionStore } from '@/features/progression/useProgressionStore';
import { speakText, stopSpeaking } from '@/utils/sound';

export function StudyReader() {
  const searchParams = useSearchParams();
  const { profile, completedActivityIds, completeActivity } = useProgressionStore();

  const locale: Locale = searchParams.get('lang') === 'ms' ? 'ms' : 'en';
  const dict = getDictionary(locale);

  const requestedCareer = searchParams.get('career') || profile.activeCareerId;
  const requestedId = searchParams.get('id');

  const availableLessons = useMemo(() => {
    const byCareer = getStudiesByCareer(requestedCareer);
    return byCareer.length > 0 ? byCareer : STUDY_LESSONS;
  }, [requestedCareer]);

  const [selectedId, setSelectedId] = useState<string | null>(requestedId);
  const [isReading, setIsReading] = useState(false);

  const lesson = (selectedId ? getStudyById(selectedId) : undefined) ?? availableLessons[0];

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <PageHeader title={dict.practice.studyTitle} />
        <Card className="text-center py-10 space-y-4">
          <p className="text-sm text-on-surface-variant">{dict.practice.emptyState}</p>
          <Link href="/modes" className="text-sm font-bold text-primary hover:underline">
            {dict.practice.backToModes}
          </Link>
        </Card>
      </div>
    );
  }

  const lessonI18n = pickLocalized(lesson.i18n, locale);
  const isCompleted = completedActivityIds.includes(lesson.id);

  const handleToggleReadAloud = () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
      return;
    }

    const fullText = [
      lessonI18n.title,
      ...lessonI18n.sections.flatMap((sec) => [sec.heading, ...sec.body]),
    ].join('. ');
    speakText(fullText);
    setIsReading(true);
  };

  const handleMarkComplete = () => {
    completeActivity({
      activityId: lesson.id,
      xpReward: lesson.xpReward,
      skillImpacts: [{ skillId: lesson.skillId, xp: lesson.xpReward, competencyDelta: 5 }],
      missionCountDelta: 1,
    });
  };

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

        {availableLessons.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {availableLessons.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={item.id === lesson.id ? 'primary' : 'secondary'}
                onClick={() => {
                  stopSpeaking();
                  setIsReading(false);
                  setSelectedId(item.id);
                }}
              >
                {pickLocalized(item.i18n, locale).title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <PageHeader
        eyebrow={dict.practice.studyTitle}
        title={lessonI18n.title}
        action={
          <Button variant="secondary" size="sm" onClick={handleToggleReadAloud}>
            {isReading ? (
              <>
                <VolumeX className="w-4 h-4" aria-hidden="true" />
                <span>{dict.practice.stopReading}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                <span>{dict.practice.readAloud}</span>
              </>
            )}
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="neutral">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{lesson.readMinutes} min</span>
        </Badge>
        <Badge variant="sky">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{lesson.skillId}</span>
        </Badge>
        {isCompleted && <Badge variant="sage">{dict.practice.completedBadge}</Badge>}
      </div>

      <div className="space-y-4">
        {lessonI18n.sections.map((section, idx) => (
          <Card key={idx} className="space-y-3">
            <h2 className="text-lg font-bold text-on-surface">{section.heading}</h2>
            <div className="space-y-2.5 text-sm text-on-surface-variant leading-relaxed">
              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
            {section.keyTerms && section.keyTerms.length > 0 && (
              <div className="pt-3 border-t border-hairline grid gap-2 sm:grid-cols-2">
                {section.keyTerms.map((kt, kIdx) => (
                  <div
                    key={kIdx}
                    className="p-3 rounded-xl bg-surface-container-low border border-hairline text-xs"
                  >
                    <p className="font-bold text-on-surface">{kt.term}</p>
                    <p className="text-on-surface-variant mt-0.5">{kt.definition}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card variant="muted" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-on-surface-variant">
          {isCompleted ? dict.practice.replayNotice : `+${lesson.xpReward} XP · ${lesson.skillId}`}
        </div>
        <Button onClick={handleMarkComplete} disabled={isCompleted}>
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>{isCompleted ? dict.practice.completedBadge : dict.practice.markComplete}</span>
        </Button>
      </Card>
    </div>
  );
}
