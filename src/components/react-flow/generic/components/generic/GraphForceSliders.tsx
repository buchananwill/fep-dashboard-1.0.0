'use client';

import React, { useMemo } from 'react';

import {
  useGlobalController,
  useGlobalListener,
  useGlobalReadAny
} from 'selective-context';

import { SelectiveContextRangeSlider } from '@/components/react-flow/generic/components/generic/SelectiveContextRangeSlider';
import { SelectiveContextReadAll } from 'selective-context/dist/types';
import {
  ForceAttributesInitial,
  GraphSelectiveContextKeys,
  useGraphListener,
  useGraphName,
  ForceAttributesDto
} from 'react-d3-force-wrapper';

const listenerKey = 'graph-force-adjustment';
export const CustomForceLabelContextKey = 'customForceLabel';

export function GraphForceSliders() {
  const uniqueGraphName = useGraphName();
  const selectiveContextReadAll: SelectiveContextReadAll<boolean> =
    useGlobalReadAny<boolean>();

  const { currentState: show } = useGraphListener(
    GraphSelectiveContextKeys.showForceEditing,
    listenerKey,
    false
  );

  const sliders = useMemo(
    () =>
      Object.entries(ForceAttributesInitial).map((entry) => {
        if (entry[0] === 'id') {
          return null;
        }
        const showThisSlider = selectiveContextReadAll(`${entry[0]}:show`);

        if (showThisSlider === false) return null;

        const contextKey = `${uniqueGraphName}:${entry[0]}`;
        const entryKey = entry[0] as keyof ForceAttributesDto;
        const initial = ForceAttributesInitial[entryKey];
        return (
          <SelectiveContextRangeSlider
            key={`slider:${contextKey}`}
            contextKey={contextKey}
            initialValue={initial}
            listenerKey={'slider'}
          />
        );
      }),
    [uniqueGraphName, selectiveContextReadAll]
  );

  return <div className={'w-fit'}>{show ? [...sliders] : []}</div>;
}
