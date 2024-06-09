'use client';
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { HeatMapSerie, ResponsiveHeatMap } from '@nivo/heatmap';
import { AnchoredContinuousColorsLegendProps } from '@nivo/legends/dist/types/types';
import { ContinuousColorScaleConfig } from '@nivo/colors';
import { AxisProps } from '@nivo/axes/dist/types/types';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const legends: Omit<
  AnchoredContinuousColorsLegendProps,
  'scale' | 'containerWidth' | 'containerHeight'
>[] = [
  {
    anchor: 'bottom',
    translateX: 0,
    translateY: 30,
    length: 400,
    thickness: 8,
    direction: 'row',
    tickPosition: 'after',
    tickSize: 3,
    tickSpacing: 4,
    tickOverlap: false,
    tickFormat: '>-.2s',
    title: 'Value →',
    titleAlign: 'start',
    titleOffset: 4
  }
];
const colors = {
  type: 'diverging',
  scheme: 'blue_green',
  divergeAt: 0.5,
  minValue: 0,
  maxValue: 60
};
const axisLeft = {
  tickSize: 0,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'Subject',
  legendPosition: 'middle',
  legendOffset: -72,
  truncateTickAt: 0
};
const axisRight: AxisProps = {
  tickSize: 0,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'Subject',
  legendPosition: 'start',
  legendOffset: 120,
  truncateTickAt: 0
};
const axisTop = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: -90,
  legend: '',
  legendOffset: 46,
  truncateTickAt: 0
};

const theme = {
  text: {
    fontSize: 12
  }
};
const margin = { top: 60, right: 0, bottom: 60, left: 130 };
export default function HeatMapCarouselOrders({
  data /* see data tab */
}: {
  data: HeatMapDataSeries[];
}) {
  return (
    <ResponsiveHeatMap
      data={data}
      margin={margin}
      axisTop={axisTop}
      theme={theme}
      // axisRight={axisRight as AxisProps}
      axisLeft={axisLeft as AxisProps}
      colors={colors as ContinuousColorScaleConfig}
      emptyColor="#555555"
      legends={legends}
    />
  );
}

export interface HeatMapDatumWithLabel {
  entityId: string;
  x: string;
  y: number | null;
}
export type HeatMapDataSeries = HeatMapSerie<HeatMapDatumWithLabel, any> & {
  entityId: string;
};
