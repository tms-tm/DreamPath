import { Suspense } from 'react';
import { ScenarioPlayer } from '@/features/practice/ScenarioPlayer';

export default function SimulationPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-8 text-sm text-on-surface-variant">Loading simulation...</div>}>
      <ScenarioPlayer />
    </Suspense>
  );
}
