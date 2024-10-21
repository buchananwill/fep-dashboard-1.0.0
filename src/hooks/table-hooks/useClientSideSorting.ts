import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { Identifier, InitialMap } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import {
  useGlobalController,
  useGlobalListener,
  useGlobalListenerGroup
} from 'selective-context';
import {
  defaultSortState,
  getSortContextKey
} from '@/components/tables/cells-v2/SortableHeaderCell';
import { SortState } from '@/components/tables/core-table-types';
import { useEffect, useMemo, useRef } from 'react';
import { getFilteredIdContextKey } from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { EmptyArray } from '@/api/literals';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { isNotUndefined } from '@/api/main';
import { get, isEqual, sortBy } from 'lodash';

const listenerKey = 'sortHook';

export function getFilteredSortedIdListContextKey(entityClass: string) {
  return `${entityClass}:filteredSortedIdList`;
}

export default function useClientSideSorting<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>() {
  const { entityClass } = useEntityTableContext();
  const { currentState: sortState } = useGlobalListener({
    contextKey: getSortContextKey(entityClass),
    listenerKey,
    initialValue: defaultSortState as SortState<T>
  });
  const { currentState: filteredIdList } = useGlobalListener({
    contextKey: getFilteredIdContextKey(entityClass),
    listenerKey,
    initialValue: EmptyArray as T_ID[]
  });

  const contextKeys = useMemo(() => {
    return filteredIdList.map((id) =>
      getEntityNamespaceContextKey(entityClass, id)
    );
  }, [entityClass, filteredIdList]);

  const { currentState } = useGlobalListenerGroup({
    contextKeys,
    initialValue: InitialMap as Map<string, T>,
    listenerKey
  });

  const { path, direction } = sortState;

  const filteredSortedIdList = useMemo(() => {
    if (path === '') return filteredIdList;
    const filteredEntities = contextKeys
      .map((contextKey) => currentState.get(contextKey))
      .filter(isNotUndefined);
    const sortedAsc = sortBy(filteredEntities, [(t) => get(t, path)]).map(
      (t) => t.id
    );
    if (direction === 'asc') return sortedAsc;
    else return sortedAsc.reverse();
  }, [path, direction, filteredIdList, contextKeys, currentState]);

  const { dispatch } = useGlobalController({
    contextKey: getFilteredSortedIdListContextKey(entityClass),
    initialValue: filteredSortedIdList,
    listenerKey
  });

  const filteredSortedListRef = useRef([] as T_ID[]);

  useEffect(() => {
    if (!isEqual(filteredSortedIdList, filteredSortedListRef.current)) {
      dispatch(filteredSortedIdList);
      filteredSortedListRef.current = filteredSortedIdList;
    }
  }, [filteredSortedIdList, dispatch]);
}
