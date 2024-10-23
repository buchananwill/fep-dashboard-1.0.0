import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useCallback } from 'react';
import { useGlobalListener } from 'selective-context';
import { getFilteredSortedIdListContextKey } from '@/hooks/table-hooks/useClientSideSorting';

export function useEntityIdSelection<U extends Identifier>(
  entityClass: string
) {
  const listenerKey = useUuidListenerKey();
  useGlobalListener({
    contextKey: getFilteredSortedIdListContextKey(entityClass),
    initialValue: EmptyArray as U[],
    listenerKey
  });

  const {
    currentState: selectedList,
    dispatchWithoutControl: dispatchSelected
  } = NamespacedHooks.useDispatchAndListen(
    entityClass,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as U[]
  );

  const onChange = useCallback(
    (selected: U[]) => {
      dispatchSelected(selected);
    },
    [dispatchSelected]
  );
  return { selectedList, onChange };
}
