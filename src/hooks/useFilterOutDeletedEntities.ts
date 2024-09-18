import { HasId } from '@/api/types';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useMemo } from 'react';
import { initialMap } from '@/app/_literals';

export function useFilterOutDeletedEntities<T extends HasId>(
  entityClass: string
) {
  const { currentState: idList } = useGlobalListener({
    contextKey: `${entityClass}:idList`,
    initialValue: EmptyArray,
    listenerKey: 'editList'
  });

  const { currentState: deletedList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.DELETED,
    'editList',
    EmptyArray
  );

  const contextKeys = useMemo(() => {
    return idList
      .filter((id) => !deletedList.includes(id))
      .map((id) => `${entityClass}:${id}`);
  }, [entityClass, idList, deletedList]);

  const { currentState } = useGlobalListenerGroup<T>({
    contextKeys,
    listenerKey: 'editList',
    initialValue: initialMap as Map<string, T>
  });

  return useMemo(() => {
    return [...currentState.values()];
  }, [currentState]);
}
