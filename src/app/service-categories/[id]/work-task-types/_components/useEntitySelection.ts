import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { Key, useCallback, useMemo } from 'react';

export function useEntitySelection<T, U>(
  entityClass: string,
  forceString = true
) {
  const listenerKey = useUuidListenerKey();

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
  const { currentState: idList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray as U[]
  );

  const selectedSet = useMemo(() => {
    return forceString
      ? new Set<string>(selectedList.map((ident) => String(ident)))
      : new Set(selectedList);
  }, [selectedList, forceString]);

  const handleChange = useCallback(
    (selected: 'all' | Set<Key>) => {
      console.log(selected);
      const nextSelection =
        selected === 'all'
          ? [...idList]
          : ([...new Set(selected).values()] as U[]);
      dispatchSelected(nextSelection.sort());
    },
    [dispatchSelected, idList]
  );
  return { currentState, selectedSet, handleChange };
}
