import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { MutableRefObject } from 'react';
import { HierarchyPointNode } from 'd3';
import { get } from 'lodash';

import { Layoutable } from '@/components/react-flow/generic/hooks/getCustomForce';
import { DataNode } from 'react-d3-force-wrapper';

export function getHierarchyLayoutResolver<T extends NodeDataType>(
  layoutMap: MutableRefObject<Map<string, Layoutable>>,
  dimension: keyof Pick<HierarchyPointNode<any>, 'x' | 'y'>
) {
  return (node: DataNode<T>, index: number) => {
    const hasPosition = layoutMap.current.get(node.id);
    return hasPosition ? get(hasPosition, dimension, 0) : 0;
  };
}
