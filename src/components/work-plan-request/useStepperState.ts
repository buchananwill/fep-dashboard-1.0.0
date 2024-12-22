import { useMemo, useState } from 'react';

export function useStepperState({
  steps,
  startAt = 0
}: {
  steps: number;
  startAt?: number;
}) {
  if (steps < 1 || startAt < 0 || startAt >= steps) {
    throw new Error(`Invalid step values: ${steps}, ${startAt}`);
  }
  const [active, setActive] = useState(startAt ?? 0);
  const { nextStep, prevStep } = useMemo(() => {
    const nextStep = () =>
      setActive((current) => (current < steps ? current + 1 : current));
    const prevStep = () =>
      setActive((current) => (current > 0 ? current - 1 : current));
    return { nextStep, prevStep };
  }, [setActive, steps]);
  return { active, setActive, prevStep, nextStep };
}
