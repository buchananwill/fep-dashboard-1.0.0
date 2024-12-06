import { DispatchState } from '@/types';
import { useCallback } from 'react';

export function useBooleanToggle(setShowShortCode: DispatchState<boolean>) {
  return useCallback(() => {
    setShowShortCode((prev) => !prev);
  }, [setShowShortCode]);
}