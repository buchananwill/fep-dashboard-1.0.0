'use client';

import { usePageTransition } from '@/components/navigation/transitions';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

export default function LinkTransitionOverlay() {
  const { pending } = usePageTransition();

  return pending ? <PendingOverlay pending={pending} /> : null;
}
