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

function getOrientationCorrector(orientation: 'horizontal' | 'vertical') {
  return function correctOrientation<T extends HasStringId>(
    map: Map<string, HierarchyPointNode<T>>,
    index: number
  ) {
    if (orientation === 'vertical') {
      [...map.values()].forEach((hpn) => {
        const { x, y } = hpn;
        // noinspection JSSuspiciousNameCombination
        hpn.x = y;
        // noinspection JSSuspiciousNameCombination
        hpn.y = x;
      });
    }
    return map;
  };
}

export function useHierarchicalDataLayoutMemo(
  childMap: StringIdHierarchyMap,
  options?: HierarchicalDataOptions
) {
  const rootNodeList = useHierarchicalDataMemo(childMap);

  return useMemo(() => {
    const correctOrientation = getOrientationCorrector(
      options?.orientation ?? 'horizontal'
    );
    return rootNodeList
      .map((rootNode) => getHierarchicalDataLayout(rootNode, options))
      .map(flattenHierarchicalLayoutDataStructure)
      .map(correctOrientation);
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
