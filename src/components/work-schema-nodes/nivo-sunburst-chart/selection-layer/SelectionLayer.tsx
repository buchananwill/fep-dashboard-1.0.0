import { createElement, useMemo } from 'react';
import { useTheme } from '@nivo/core';
import { StaticArcShape } from './StaticArcShape';
import { ComputedDatum, SunburstCustomLayerProps } from '@nivo/sunburst';
import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const SelectionLayer = ({
  centerX,
  centerY,
  radius,
  nodes,
  arcGenerator
}: SunburstCustomLayerProps<WorkNodeHierarchy>) => {
  const theme = useTheme();

  const arcsMemo = useMemo(() => {
    return nodes.map((datum) => {
      return { svgPath: arcGenerator(datum.arc) ?? '', ...datum };
    });
  }, [nodes, arcGenerator]);

  const Arc = StaticArcShape;

  return (
    <g transform={`translate(${centerX},${centerY})`}>
      {arcsMemo.map((datum) => {
        return createElement(Arc, {
          key: datum.id,
          datum,
          style: {
            color: datum.color,
            borderColor: datum.color,
            borderWidth: 0,
            path: datum.svgPath,
            opacity: 0.5
          }
        });
      })}
    </g>
  );
};
