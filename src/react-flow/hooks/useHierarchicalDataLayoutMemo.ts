import {
  StringIdHierarchyMap,
  useHierarchicalDataMemo
} from '@/react-flow/hooks/useHierarchicalDataMemo';
import {
  getHierarchicalDataLayout,
  HierarchicalDataOptions
} from '@/react-flow/hooks/getHierarchicalDataLayout';
import { useMemo } from 'react';
import { HierarchyPointNode } from 'd3';
import { HasStringId } from 'react-d3-force-wrapper';

export function useHierarchicalDataLayoutMemo(
  childMap: StringIdHierarchyMap,
  options?: HierarchicalDataOptions
) {
  const rootNodeList = useHierarchicalDataMemo(childMap);

  return useMemo(() => {
    return rootNodeList
      .map((rootNode) => getHierarchicalDataLayout(rootNode, options))
      .map(flattenHierarchicalLayoutDataStructure);
  }, [rootNodeList, options]);
}

function flattenHierarchicalLayoutDataStructure<T extends HasStringId>(
  node: HierarchyPointNode<T>
): Map<string, HierarchyPointNode<T>> {
  const responseMap = new Map<string, HierarchyPointNode<T>>();
  responseMap.set(node.data.id, node);
  node.children
    ?.map((child) => flattenHierarchicalLayoutDataStructure(child))
    .forEach((childMap) => {
      [...childMap.entries()].forEach(([key, value]) =>
        responseMap.set(key, value)
      );
    });
  return responseMap;
}
