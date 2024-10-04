import {
  StringIdHierarchyMap,
  useHierarchicalDataMemo
} from '@/components/react-flow/generic/hooks/useHierarchicalDataMemo';
import {
  getHierarchicalDataLayout,
  HierarchicalDataOptions
} from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { useMemo } from 'react';
import { HierarchyPointNode } from 'd3';
import { HasStringId } from 'react-d3-force-wrapper';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { Layoutable } from '@/components/react-flow/generic/hooks/useForces';

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

export function useTreeHierarchicalDataLayoutMemo(
  childMap: StringIdHierarchyMap,
  options?: HierarchicalDataOptions
): Map<string, Layoutable>[] {
  const rootNodeList = useHierarchicalDataMemo(childMap);

  const memoedMap = useMemo(() => {
    if (rootNodeList.length === 0)
      return [new Map()] as Map<string, Layoutable>[];
    const correctOrientation = getOrientationCorrector(
      options?.orientation ?? 'horizontal'
    );
    return rootNodeList
      .map((rootNode) => getHierarchicalDataLayout(rootNode, options))
      .map(flattenHierarchicalLayoutDataStructure)
      .map(correctOrientation);
  }, [rootNodeList, options]);
  return memoedMap as Map<string, Layoutable>[];
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
