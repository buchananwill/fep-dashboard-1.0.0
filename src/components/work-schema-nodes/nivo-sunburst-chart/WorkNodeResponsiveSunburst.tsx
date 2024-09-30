'use client';

import {
  ComputedDatum,
  ResponsiveSunburst,
  SunburstCustomLayerProps
} from '@nivo/sunburst';
import {
  KnowledgeDomainGroup,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getInheritedColorGenerator } from '@nivo/colors';
import { patternDotsDef } from '@nivo/core';
import { useGlobalDispatch } from 'selective-context';
import { SelectionPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import React, { useCallback } from 'react';
import { SelectionLayer } from '@/components/work-schema-nodes/nivo-sunburst-chart/selection-layer/SelectionLayer';
import { nestedWorkNodeArcLabel } from '@/components/work-schema-nodes/nivo-sunburst-chart/nestedWorkNodeArcLabel';

function callOutLayer(props: SunburstCustomLayerProps<WorkNodeHierarchy>) {
  props.arcGenerator;

  return null;
}

export function WorkNodeResponsiveSunburst({
  data /* see data tab */
}: {
  data: WorkNodeHierarchy;
}) {
  const { dispatchWithoutListen: dispatchWithoutControl } =
    useGlobalDispatch<string>(SelectionPathKey);

  const handleClick = useCallback(
    (datum: ComputedDatum<WorkNodeHierarchy>, event: React.MouseEvent) => {
      dispatchWithoutControl(datum.data.path);
    },
    [dispatchWithoutControl]
  );

  return (
    <ResponsiveSunburst
      layers={['arcs', 'arcLabels', SelectionLayer]}
      theme={{
        text: {
          fontSize: 12,
          outlineWidth: 0,
          outlineColor: 'transparent'
        }
      }}
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      id={'path'}
      value="size"
      cornerRadius={10}
      borderWidth={2}
      borderColor={{ from: 'color', modifiers: [] }}
      onClick={handleClick}
      defs={[
        patternDotsDef('dots', {
          color: '#a1a1a1',
          size: 3,
          padding: 1,
          stagger: false,
          background: '#ffffff'
        })
      ]}
      colors={{ scheme: 'set3' }}
      childColor={customChildColors}
      enableArcLabels={true}
      arcLabel={nestedWorkNodeArcLabel}
      arcLabelsSkipAngle={5}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]]
      }}
    />
  );
}

type Datum = ComputedDatum<WorkNodeHierarchy>;

export function getKdStringCode(data: KnowledgeDomainGroup) {
  return data.knowledgeDomains
    .map((kd) => kd.shortCode ?? kd.name)
    .toSorted((a, b) => a.localeCompare(b))
    .join(',');
}

export function getHours(value: number) {
  return `${value / 4} hrs`;
}

function customChildColors(parent: Datum, child: Datum) {
  const { color } = parent;
  const {
    data: { type, color: colorFixed }
  } = child;
  if (type === 'knowledgeDomainGroup' && colorFixed) {
    return colorFixed;
  } else if (
    type === 'leaf' ||
    type === 'leafList' ||
    type === 'knowledgeDomainGroup'
  ) {
    return getInheritedColorGenerator({
      from: 'color',
      modifiers: [['brighter', 0.1]]
    })(parent);
  } else return 'rgb(195, 195, 195)';
}
