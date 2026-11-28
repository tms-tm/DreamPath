import { Suspense } from 'react';
import { StudyReader } from '@/features/practice/StudyReader';

export default function StudyModePage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto py-8 text-sm text-on-surface-variant">Loading study lesson...</div>}>
      <StudyReader />
    </Suspense>
  );
}
