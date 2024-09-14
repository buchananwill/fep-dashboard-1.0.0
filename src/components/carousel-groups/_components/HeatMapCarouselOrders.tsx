'use client';
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import { ContinuousColorScaleConfig } from '@nivo/colors';
import { CanvasAxisProps } from '@nivo/axes/dist/types/types';
import {
  axisLeft,
  axisTop,
  colors,
  legends,
  margin,
  theme
} from '@/components/types/nivoPropLiterals';
import { HeatMapDataSeries } from '@/components/types/types';

export default function HeatMapCarouselOrders({
  data /* see data tab */
}: {
  data: HeatMapDataSeries[];
}) {
  return (
    <ResponsiveHeatMapCanvas
      data={data}
      // enableLabels={false}
      margin={margin}
      axisTop={axisTop as CanvasAxisProps}
      pixelRatio={2.5}
      theme={theme}
      axisLeft={axisLeft as CanvasAxisProps}
      colors={colors as ContinuousColorScaleConfig}
      emptyColor="#555555"
      legends={legends}
    />
  );
}
