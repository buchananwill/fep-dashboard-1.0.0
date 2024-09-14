'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import React from 'react';
import { useStepperContext } from '@/components/generic/stepper/stepperContextCreator';

export default function LandscapeStepper() {
  const { increment, max, min, decrement, current } = useStepperContext();

  const atMinimum = min !== undefined && current <= min;
  const atMaximum = max !== undefined && current >= max;

  return (
    <div
      className={
        'flex w-fit items-center divide-x overflow-hidden rounded-lg border-2 border-slate-400'
      }
    >
      <button
        onClick={decrement}
        disabled={atMinimum}
        className={`${atMinimum ? 'bg-slate-400 opacity-50' : ''}`}
      >
        <MinusIcon className={`h-6 w-6`}></MinusIcon>
      </button>
      <button
        onClick={increment}
        disabled={atMaximum}
        className={`${atMaximum ? 'bg-slate-400 opacity-50' : ''}`}
      >
        <PlusIcon className={'h-6 w-6'}></PlusIcon>
      </button>
      <p className={'w-8 text-center text-sm'}>{current}</p>
    </div>
  );
}
