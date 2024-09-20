import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  Identifier,
  NamespacedHooks,
  useLazyDtoListListener
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { Key, MutableRefObject, useCallback, useMemo } from 'react';
import { HasId, HasIdClass } from '@/api/types';
import { getNumberFromStringId } from 'react-d3-force-wrapper';

function compareNumbersOrStrings(v1: number | string, v2: number | string) {
  const v1Type = typeof v1;
  const v2Type = typeof v2;
  if (v1Type === 'number' && v2Type === 'number')
    return (v1 as number) - (v2 as number);
  else return String(v1).localeCompare(String(v2));
}

export function useEntitySelection<
  T extends HasIdClass<U>,
  U extends Identifier
>(
  entityClass: string,
  filteredItems?: MutableRefObject<T[]>,
  idClass?: 'string' | 'number',
  forceString = true,
  sortedItems?: T[]
) {
  const listenerKey = useUuidListenerKey();

  const idMap = useMemo(() => {
    return sortedItems
      ? sortedItems.reduce(
          (prev, curr, index) => prev.set(curr.id, index),
          new Map<U, number>()
        )
      : null;
  }, [sortedItems]);

  const normalizeId = useCallback(
    (id: number | string) => {
      return typeof id === idClass
        ? id
        : typeof id === 'string'
          ? getNumberFromStringId(id)
          : String(id);
    },
    [idClass]
  );

  const sortFunction = useCallback(
    (a: U, b: U) => {
      if (idMap) {
        return (idMap.get(a) ?? 0) - (idMap.get(b) ?? 0);
      } else {
        return compareNumbersOrStrings(normalizeId(a), normalizeId(b));
      }
    },
    [idMap, normalizeId]
  );

  const {
    currentState: selectedList,
    dispatchWithoutControl: dispatchSelected
  } = NamespacedHooks.useDispatchAndListen(
    entityClass,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as U[]
  );
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as T[]
  );

  console.log(currentState, entityClass);

  const selectedKeys = useMemo(() => {
    return forceString
      ? new Set<string>(selectedList.map((ident) => String(ident)))
      : new Set(selectedList);
  }, [selectedList, forceString]);

  const onSelectionChange = useCallback(
    (selected: 'all' | Set<Key>) => {
      dispatchSelected((currentSelection) => {
        const selectionSet = new Set(currentSelection);
        if (selected === 'all') {
          let allItems = currentState;
          if (filteredItems) {
            allItems = filteredItems.current;
          }
          allItems
            .map((item) => item.id)
            .forEach((itemId) => selectionSet.add(itemId));
        } else {
          selectionSet.clear();
          selected.forEach((item) =>
            selectionSet.add(normalizeId(item as string | number) as U)
          );
        }
        const sort = [...selectionSet.values()].sort(sortFunction);
        return sort as U[];
      });
    },
    [dispatchSelected, sortFunction, normalizeId, filteredItems, currentState]
  );
  return { currentState, selectedKeys, onSelectionChange, dispatchSelected };
}

export function useSelectedEntityMap<T extends HasId>(entityClass: string) {
  const listenerKey = useUuidListenerKey();
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  return useLazyDtoListListener<T>(currentState, entityClass, listenerKey);
}
