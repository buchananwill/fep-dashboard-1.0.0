'use client';
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import {
  HeatMapSerie,
  ResponsiveHeatMap,
  ResponsiveHeatMapCanvas
} from '@nivo/heatmap';
import { AnchoredContinuousColorsLegendProps } from '@nivo/legends/dist/types/types';
import { ContinuousColorScaleConfig } from '@nivo/colors';
import { AxisProps, CanvasAxisProps } from '@nivo/axes/dist/types/types';
import { Theme } from '@nivo/core';

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
    tickSize: 5,
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
  divergeAt: 0.4,
  minValue: 0,
  maxValue: 60
};
const axisLeft: CanvasAxisProps = {
  tickSize: 5,
  tickPadding: 8,
  tickRotation: 0,
  legendOffset: -100,
  truncateTickAt: 10,
  ticksPosition: 'after'
};

const axisTop = {
  legend: 'Subject',
  legendPosition: 'start',
  tickSize: 4,
  tickPadding: 5,
  tickRotation: -90,
  legendOffset: -80,
  truncateTickAt: 0
};

const theme: Theme = {
  labels: {
    text: {
      fontSize: 12,
      fontFamily: 'monospace',
      fontWeight: 'bold',
      textRendering: 'optimizeLegibility',
      fontSmooth: 'never'
    }
  },
  axis: {
    legend: {
      text: {
        fontWeight: 'bold',
        fontSize: 16
      }
    },
    ticks: {
      text: {
        fontSize: 16,
        fontFamily: 'Calibri, Helvetica, Arial, sans-serif'
      },
      line: {
        stroke: 'none'
      }
    }
  }
};
const margin = { top: 120, right: 0, bottom: 60, left: 130 };
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

export interface HeatMapDatumWithLabel {
  entityId: string;
  x: string;
  y: number | null;
}
export type HeatMapDataSeries = HeatMapSerie<HeatMapDatumWithLabel, any> & {
  entityId: string;
};
