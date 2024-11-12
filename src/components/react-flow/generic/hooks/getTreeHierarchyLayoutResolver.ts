import { HierarchyPointNode } from 'd3';
import { get } from 'lodash';
import { DataNode, HasStringId } from 'react-d3-force-wrapper';
import { isNonZeroFalsy } from '@/api/main';

export function getHierarchyLayoutResolver<T extends HasStringId>(
  layoutMapList: Map<string, HierarchyPointNode<T>>[],
  layoutMapIndexList: number[],
  dimension: keyof Pick<HierarchyPointNode<any>, 'x' | 'y'>,
  depthOffsetList: number[]
) {
  return (node: DataNode<any>, index: number) => {
    const layoutMapIndex = layoutMapIndexList[index];

    const layoutMap = !isNonZeroFalsy(layoutMapIndex)
      ? layoutMapList[layoutMapIndex]
      : undefined;
    const depthOffset = depthOffsetList[layoutMapIndex] || 0;
    const hasPosition = layoutMap?.get(node.id);
    const desiredPosition = hasPosition ? get(hasPosition, dimension, 0) : 0;

    if (dimension === 'x') {
      return desiredPosition + depthOffset;
    } else return desiredPosition;
  };
}
