'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import React from 'react';
import { useStepperContext } from '@/components/generic/stepper/stepperContextCreator';
import { Button } from '@mantine/core';

export default function LandscapeStepper() {
  const { increment, max, min, decrement, current } = useStepperContext();

  const atMinimum = min !== undefined && current <= min;
  const atMaximum = max !== undefined && current >= max;

  return (
    <Button.Group>
      <Button onClick={decrement} disabled={atMinimum}>
        <MinusIcon className={`h-6 w-6`}></MinusIcon>
      </Button>
      <Button.GroupSection>
        <p className={'w-8 text-center text-sm'}>{current}</p>
      </Button.GroupSection>
      <Button onClick={increment} disabled={atMaximum}>
        <PlusIcon className={'h-6 w-6'}></PlusIcon>
      </Button>
    </Button.Group>
  );
}
