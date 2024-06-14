import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { Key, MutableRefObject, useCallback, useMemo } from 'react';
import { HasId, HasIdClass } from '@/api/types';
import { getNumberFromStringId } from 'react-d3-force-wrapper';
import { type } from 'node:os';

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
        const sort = [...selectionSet.values()]
          .map((id) => {
            return typeof id === 'number' ? id : getNumberFromStringId(id);
          })
          .sort((a, b) => a - b);
        console.log(sort);
        console.log(selectionSet);
        return sort as U[];
      });
    },
    [dispatchSelected, visibleItems]
  );
  return { currentState, selectedSet, handleChange, dispatchSelected };
}
