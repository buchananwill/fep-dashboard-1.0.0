import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/client-literals';

function getNextIdDecrement() {
  let id = ABSOLUTE_SMALLEST_TRANSIENT_ID;
  return () => id--;
}

export const idDecrementer = getNextIdDecrement();