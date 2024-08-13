import { HasIdClass } from '@/api/types';
import { useMemo } from 'react';

export type StringIdHierarchyMap = Map<string, Set<string>>;

export interface NestedEntity<T> extends HasIdClass<T> {
  children: NestedEntity<T>[];
}

export type NestedWithStringId = NestedEntity<string>;

function createNesting(
  rootId: string,
  childMap: StringIdHierarchyMap
): NestedWithStringId {
  const childrenIdSet = childMap.get(rootId);
  const childrenIdList = childrenIdSet ? [...childrenIdSet.values()] : [];
  const children = childrenIdList.map((id) => createNesting(id, childMap));
  return {
    id: rootId,
    children
  };
}

export function useHierarchicalDataMemo(
  childMap: StringIdHierarchyMap
): NestedWithStringId[] {
  return useMemo(() => {
    const rootList = findRootList(childMap);
    return rootList.map((rootId) => {
      return createNesting(rootId, childMap);
    });
  }, [childMap]);
}

export function findRootList(childMap: StringIdHierarchyMap): string[] {
  const keys = [...childMap.keys()];
  const setValues = [...childMap.values()];
  return keys.filter((stringId) => {
    return !setValues.some((stringSet) => stringSet.has(stringId));
  });
}

export function fallbackComparator(id1: string, id2: string) {
  return id1.localeCompare(id2);
}

export type Comparator<T> = (a: T, b: T) => number;
