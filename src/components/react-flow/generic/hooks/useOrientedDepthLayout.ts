import { FlowEdge, FlowNode } from '@/components/react-flow/generic/types';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { useMemo } from 'react';
import { HasStringId } from 'react-d3-force-wrapper';

import { usePreComputedPositionForce } from '@/components/react-flow/generic/hooks/usePreComputedPositionForce';
import { HasPosition } from '@/components/react-flow/generic/hooks/getTreeForce';

export function useOrientedDepthLayout<T extends NodeDataType>(
  nodes: FlowNode<T>[],
  spacing: number,
  orientation: 'horizontal' | 'vertical',
  edges: FlowEdge<T>[]
) {
  const map = useMemo(() => {
    const layoutMap = new Map<string, HasPosition & HasStringId>();
    for (const node of nodes) {
      // node.distanceFromRoot * spacing;
      const plane = 0; // TODO: CALCULATE DEPTH DYNAMICALLY.
      let x = 0,
        y = 0;
      if (orientation === 'horizontal') {
        y = plane;
      } else {
        x = plane;
      }
      const { id } = node;
      layoutMap.set(id, { x, y, id });
    }
    return layoutMap;
  }, [nodes, spacing, orientation]);

  usePreComputedPositionForce(map);
}
