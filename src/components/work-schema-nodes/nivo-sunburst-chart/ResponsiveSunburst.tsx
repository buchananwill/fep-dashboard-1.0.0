'use client';

import { ComputedDatum, ResponsiveSunburst } from '@nivo/sunburst';
import { NestedWorkNode } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getInheritedColorGenerator } from '@nivo/colors';

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
      borderColor={{ theme: 'background' }}
      colors={{ scheme: 'set3' }}
      childColor={customChildColors}
      enableArcLabels={true}
      arcLabel={nestedWorkNodeArcLabel}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.4]]
      }}
    />
  );
}

type Datum = ComputedDatum<NestedWorkNode>;

function nestedWorkNodeArcLabel(computedData: ComputedDatum<NestedWorkNode>) {
  const { data, value } = computedData;
  return `${data.type}, ${value}`;
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
