import { Suspense } from 'react';
import { QuizPlayer } from '@/features/practice/QuizPlayer';

export default function QuizModePage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto py-8 text-sm text-on-surface-variant">Loading quiz...</div>}>
      <QuizPlayer />
    </Suspense>
  );
}
