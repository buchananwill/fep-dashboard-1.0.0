'use client';

import { ResponsiveSunburst } from '@nivo/sunburst';
import { NestedWorkNode } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

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
