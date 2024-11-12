import { useHierarchicalDataMemo } from '@/components/react-flow/generic/hooks/useHierarchicalDataMemo';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { useMemo } from 'react';
import {
  getIdToNestedNodeMapList,
  StringIdHierarchyMap
} from '@/components/react-flow/generic/hooks/hierarchy-transforms';
import { Layoutable } from '@/components/react-flow/generic/hooks/getTreeForce';

export function useTreeHierarchicalDataLayoutMemo(
  childMap: StringIdHierarchyMap,
  options?: HierarchicalDataOptions
): Map<string, Layoutable>[] {
  const rootNodeList = useHierarchicalDataMemo(childMap);

  const memoedMap = useMemo(() => {
    return getIdToNestedNodeMapList(rootNodeList, options);
  }, [rootNodeList, options]);
  return memoedMap as Map<string, Layoutable>[];
}
