'use client';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,

import { ResponsiveSunburst } from '@nivo/sunburst';
import { NestedWorkNode } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

// you'll often use just a few of them.
export function MyResponsiveSunburst({
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
      colors={{ scheme: 'nivo' }}
      childColor={{
        from: 'color',
        modifiers: [['brighter', 0.1]]
      }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.4]]
      }}
    />
  );
}
