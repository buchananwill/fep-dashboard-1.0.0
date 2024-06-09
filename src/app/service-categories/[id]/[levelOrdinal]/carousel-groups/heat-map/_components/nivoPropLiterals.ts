// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
import { Theme } from '@nivo/core';
import { AnchoredContinuousColorsLegendProps } from '@nivo/legends/dist/types/types';
import { CanvasAxisProps } from '@nivo/axes/dist/types/types';

export const legends: Omit<
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
export const colors = {
  type: 'diverging',
  scheme: 'blue_green',
  divergeAt: 0.4,
  minValue: 0,
  maxValue: 60
};
export const axisLeft: CanvasAxisProps = {
  tickSize: 5,
  tickPadding: 8,
  tickRotation: 0,
  legendOffset: -100,
  truncateTickAt: 10,
  ticksPosition: 'after'
};
export const axisTop = {
  legend: 'Subject',
  legendPosition: 'start',
  tickSize: 4,
  tickPadding: 5,
  tickRotation: -90,
  legendOffset: -80,
  truncateTickAt: 0
};
export const theme: Theme = {
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
export const margin = { top: 120, right: 0, bottom: 60, left: 130 };