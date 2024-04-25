import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext
} from 'react';

export interface StepperInterface {
  increment: () => void;
  decrement: () => void;
  max?: number;
  min?: number;
  current: number;
}

export const StepperContext = createContext<StepperInterface>({
  increment: () => {},
  decrement: () => {},
  max: 1,
  min: 0,
  current: 0
});

export function useStepperContext() {
  return useContext(StepperContext);
}

export function useStepperInterface(
  dispatch: Dispatch<SetStateAction<number>>,
  max: number,
  min: number,
  current: number
) {
  const increment = useCallback(
    () => dispatch((prev) => Math.min(prev + 1, max)),
    [max, dispatch]
  );
  const decrement = useCallback(
    () => dispatch((prev) => Math.max(prev - 1, min)),
    [min, dispatch]
  );

  return {
    increment: increment,
    decrement: decrement,
    max,
    min,
    current
  } as StepperInterface;
}
