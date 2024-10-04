import { useCallback, useRef } from 'react';

export function useCheckToggleFirstAndAfter(flowOverlayProps: {
  running: boolean;
  initialized: boolean;
  toggle: (() => void) | undefined;
}) {
  const { toggle, running } = flowOverlayProps;
  const runningRef = useRef(running);
  runningRef.current = running;

  return useCallback(() => {
    if (runningRef.current && toggle) {
      toggle();
    }
  }, [toggle]);
}
