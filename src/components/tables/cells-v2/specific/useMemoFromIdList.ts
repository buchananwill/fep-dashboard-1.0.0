import { Identifier, NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { useMemo } from 'react';
import { isNotUndefined } from '@/api/main';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';

/**
 * Will NOT reflect updates to the entities in state AFTER the initial render,
 * but will update if the ID list changes, i.e. entities are added or removed.
 *
 * Example use case: loading a snapshot of state for a modal.
 *
 * If the modal is trapping focus and preventing the entities from being updating,
 * this hook will guarantee that the modal loads with the most recent state,
 * without needing to subscribe directly to the entities themselves.
 * */
export function useMemoFromIdList<T>(entityClass: string) {
  const listenerKey = useUuidListenerKey();
  const { currentState: idList } = NamespacedHooks.useListen<string[]>(
    entityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );

  const readAnyDto = useReadAnyDto<T>(entityClass);

  const entityList = useMemo(() => {
    return idList?.map((id) => readAnyDto(id)).filter(isNotUndefined) ?? [];
  }, [idList, readAnyDto]);
  return { readAnyDto, entityList };
}
