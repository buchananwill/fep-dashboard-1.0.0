import { FlowNode } from '@/react-flow/types';
import { NodeDataType } from '@/react-flow/utils/adaptors';
import { HasPosition } from '@/react-flow/hooks/useForces';
import { useMemo } from 'react';
import { HasStringId } from 'react-d3-force-wrapper';
import { usePreComputedPositionForce } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';

export function useOrientedDepthLayout<T extends NodeDataType>(
  nodes: FlowNode<T>[],
  spacing: number,
  orientation: 'horizontal' | 'vertical'
) {
  const map = useMemo(() => {
    const layoutMap = new Map<string, HasPosition & HasStringId>();
    for (const node of nodes) {
      const plane = node.distanceFromRoot * spacing;
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
