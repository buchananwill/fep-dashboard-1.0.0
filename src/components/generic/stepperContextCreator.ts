import { createContext, Dispatch, SetStateAction, useContext } from 'react';

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

export function getStepperInterface(
  dispatch: Dispatch<SetStateAction<number>>,
  max: number,
  min: number,
  current: number
) {
  return {
    increment: () => dispatch((prev) => Math.min(prev + 1, max)),
    decrement: () => dispatch((prev) => Math.max(prev - 1, min)),
    max,
    min,
    current
  } as StepperInterface;
}
