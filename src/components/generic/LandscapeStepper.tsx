'use client';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import React from 'react';
import { useStepperContext } from '@/components/generic/stepperContextCreator';

export default function LandscapeStepper() {
  const { increment, max, min, decrement, current } = useStepperContext();

  const atMinimum = min !== undefined && current <= min;
  const atMaximum = max !== undefined && current >= max;

  return (
    <div
      className={
        'w-fit flex border-2 border-slate-400 rounded-lg divide-x items-center overflow-hidden'
      }
    >
      <button
        onClick={decrement}
        disabled={atMinimum}
        className={`${atMinimum ? 'bg-slate-400 opacity-50' : ''}`}
      >
        <MinusIcon className={`w-6 h-6`}></MinusIcon>
      </button>
      <button
        onClick={increment}
        disabled={atMaximum}
        className={`${atMaximum ? 'bg-slate-400 opacity-50' : ''}`}
      >
        <PlusIcon className={'w-6 h-6'}></PlusIcon>
      </button>
      <p className={'text-sm w-8 text-center'}>{current}</p>
    </div>
  );
}
