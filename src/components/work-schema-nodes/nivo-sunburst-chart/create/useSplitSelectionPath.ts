import { useMemo } from 'react';

export function useSplitSelectionPath(currentState: string) {
  return useMemo(() => {
    return currentState.split('/');
  }, [currentState]);
}
