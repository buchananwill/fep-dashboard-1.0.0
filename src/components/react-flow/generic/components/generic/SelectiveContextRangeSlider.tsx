'use client';
import { Slider } from '@mantine/core';
import React, { useCallback } from 'react';
import {
  useGlobalController,
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import { startCase } from 'lodash';
import { CustomForceLabelContextKey } from '@/components/react-flow/generic/components/generic/GraphForceSliders';

export function SelectiveContextRangeSlider({
  contextKey,
  initialValue,
  listenerKey,
  maxValue = 200,
  minValue = 0
}: {
  contextKey: string;
  initialValue: number;
  listenerKey: string;
  maxValue?: number;
  minValue?: number;
  className?: string;
  label?: string;
}) {
  const { currentState, dispatchWithoutControl: dispatchUpdate } =
    useGlobalDispatchAndListener({
      contextKey,
      listenerKey,
      initialValue
    });

  const { currentState: customLabel } = useGlobalListener({
    contextKey: `${contextKey}-label`,
    listenerKey,
    initialValue: startCase(contextKey.substring(contextKey.indexOf(':') + 1))
  });

  const onSliderChange = useCallback(
    (value: number) => {
      const singleValue = Array.isArray(value) ? value[0] : value;
      dispatchUpdate(singleValue);
    },
    [dispatchUpdate]
  );

  return (
    <div className={'flex flex-col'}>
      <span className={'block text-sm'}>{customLabel}</span>
      <Slider
        name={contextKey}
        id={contextKey}
        min={minValue}
        max={maxValue}
        size={'lg'}
        value={currentState}
        aria-label={contextKey}
        onChange={onSliderChange}
      />
    </div>
  );
}
