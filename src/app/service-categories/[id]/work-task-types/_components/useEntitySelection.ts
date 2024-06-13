import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { Key, MutableRefObject, useCallback, useMemo } from 'react';
import { HasId, HasIdClass } from '@/api/types';

export function useEntitySelection<
  T extends HasIdClass<U>,
  U extends Identifier
>(
  entityClass: string,
  visibleItems: MutableRefObject<T[]>,
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
      dispatchSelected((currentSelection) => {
        const selectionSet = new Set(currentSelection);
        if (selected === 'all') {
          visibleItems.current
            .map((item) => item.id)
            .forEach((itemId) => selectionSet.add(itemId));
        } else {
          selectionSet.clear();
          selected.forEach((item) => selectionSet.add(item as U));
        }
        return [...selectionSet.values()].sort();
      });
    },
    [dispatchSelected, visibleItems]
  );
  return { currentState, selectedSet, handleChange, dispatchSelected };
}
