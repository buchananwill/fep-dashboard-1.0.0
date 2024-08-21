'use client';

import { ComputedDatum, ResponsiveSunburst } from '@nivo/sunburst';
import {
  KnowledgeDomainGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getInheritedColorGenerator } from '@nivo/colors';
import { patternDotsDef } from '@nivo/core';

export function WorkNodeResponsiveSunburst({
  data /* see data tab */
}: {
  data: NestedWorkNode;
}) {
  return (
    <ResponsiveSunburst
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      value="size"
      cornerRadius={10}
      borderWidth={2}
      borderColor={{ from: 'color', modifiers: [] }}
      defs={[
        patternDotsDef('dots', {
          color: '#a1a1a1',
          size: 3,
          padding: 1,
          stagger: false,
          background: '#ffffff'
        })
      ]}
      fill={[
        {
          match: (d) => {
            // @ts-ignore
            return d.data.selected;
          },
          id: 'dots'
        }
      ]}
      colors={{ scheme: 'set3' }}
      childColor={customChildColors}
      enableArcLabels={true}
      arcLabel={nestedWorkNodeArcLabel}
      arcLabelsSkipAngle={5}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.4]]
      }}
    />
  );
}

type Datum = ComputedDatum<NestedWorkNode>;

export function getKdStringCode(data: KnowledgeDomainGroup) {
  return data.knowledgeDomains
    .map((kd) => kd.shortCode)
    .toSorted((a, b) => a.localeCompare(b))
    .join(',');
}

function nestedWorkNodeArcLabel(computedData: ComputedDatum<NestedWorkNode>) {
  const { data, value, parent } = computedData;
  switch (data.type) {
    case 'knowledgeDomainGroup': {
      const kdStringCode =
        data.knowledgeDomains.length > 1
          ? getKdStringCode(data)
          : data.knowledgeDomains[0]?.name ?? 'No KD';
      return `${kdStringCode}`;
    }
    case 'leaf': {
      return `${data.size / 4}hr`;
    }
    case 'leafList':
    case 'bundle':
      return '';
    case 'knowledgeLevelGroup':
      return `${data.knowledgeLevel.name}: ${value / 4}hrs`;
    default:
      return `${data.type}, ${value / 4}`;
  }
}

function customChildColors(parent: Datum, child: Datum) {
  const { color } = parent;
  const {
    data: { type, color: colorFixed }
  } = child;
  if (type === 'knowledgeDomainGroup') {
    console.log(colorFixed);
    return colorFixed;
  } else if (type === 'leaf' || type === 'leafList') {
    return getInheritedColorGenerator({
      from: 'color',
      modifiers: [['brighter', 0.1]]
    })(parent);
  } else return 'rgb(195, 195, 195)';
}
