import { EntityTypeKey } from '@/components/tables/types';
import { EntityTypeMap } from '@/api/entity-type-map';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';

export function useReadAnyDtoTyped<
  U extends EntityTypeKey,
  T extends EntityTypeMap[U]
>(type: U) {
  return useReadAnyDto<T>(EntityClassMap[type]);
}

export function useReadSelectedEntities<
  U extends EntityTypeKey,
  T extends EntityTypeMap[U]
>(type: U): () => T[] {
  const listenerKey = useUuidListenerKey();
  const { currentState } = NamespacedHooks.useListen<T['id'][]>(
    EntityClassMap[type],
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const readAnyDto = useReadAnyDtoTyped<U, T>(type);

  return useCallback(() => {
    return currentState.map((id) => readAnyDto(id)).filter(isNotUndefined);
  }, [currentState, readAnyDto]);
}
