import { useCallback, useRef, useState } from 'react';

export function useTransientState<T>() {
  const [transientState, setTransientState] = useState<undefined | T>();
  const transientStateRef = useRef(transientState);
  transientStateRef.current = transientState;
  const propagateChange = useCallback(
    (update: T | undefined) => setTransientState(update),
    []
  );
  return {
    transientState,
    setTransientState,
    transientStateRef,
    propagateChange
  };
}