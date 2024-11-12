import { cluster, hierarchy, HierarchyPointNode } from 'd3';
import {
  fallbackComparator,
  NestedWithStringId
} from '@/components/react-flow/generic/hooks/hierarchy-transforms';
import { Comparator } from '@/api/types';

export interface HierarchicalDataOptions {
  idBasedComparator?: Comparator<string>;
  size?: [number, number];
  nodeSize?: [number, number];
  separation?: (
    a: HierarchyPointNode<NestedWithStringId>,
    b: HierarchyPointNode<NestedWithStringId>
  ) => number;
  orientation?: 'horizontal' | 'vertical';
}

export function getHierarchicalDataLayout(
  rootNode: NestedWithStringId,
  options?: HierarchicalDataOptions
) {
  const comparator = options?.idBasedComparator ?? fallbackComparator;
  const hierarchyNode = hierarchy(rootNode);
  const sortedHierarchy = hierarchyNode.sort(
    (a, b) => b.height - a.height || comparator(a.data.id, b.data.id)
  );
  const clusterLayout = cluster<NestedWithStringId>();

  if (options) {
    const { size, separation, nodeSize } = options;
    if (size) clusterLayout.size(size);
    if (separation) clusterLayout.separation(separation);
    if (nodeSize) clusterLayout.nodeSize(nodeSize);
  }

  return clusterLayout(sortedHierarchy);
}
