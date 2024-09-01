import { useRef } from 'react';

export function useRefUpdatedEachRender<T>(stateValue: T) {
  const splitSelectionRef = useRef(stateValue);
  splitSelectionRef.current = stateValue;
  return splitSelectionRef;
}