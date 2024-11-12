import { useMemo } from 'react';
import {
  createNestedWithStringId,
  NestedWithStringId,
  StringIdHierarchyMap
} from '@/components/react-flow/generic/hooks/hierarchy-transforms';

export function useHierarchicalDataMemo(
  childMap: StringIdHierarchyMap
): NestedWithStringId[] {
  return useMemo(() => {
    return createNestedWithStringId(childMap);
  }, [childMap]);
}
