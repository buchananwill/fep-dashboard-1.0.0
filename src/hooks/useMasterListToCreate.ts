import { HasId } from '@/api/types';
import { useCallback } from 'react';
import { DispatchState } from '@/types';
import { Identifier, useMasterListInteraction } from 'dto-stores';

export function useMasterListToCreate<T extends HasId>(
  createEntity: () => T,
  entityClass: string
) {
  const handleAddRow = useCallback(
    (
      dispatchMasterList: DispatchState<T[]>,
      dispatchAddedlist: DispatchState<Identifier[]>
    ) => {
      const entity = createEntity();
      dispatchMasterList((list) => [...list, entity]);
      dispatchAddedlist((list) => [...list, entity.id]);
    },
    [createEntity]
  );

  return useMasterListInteraction(entityClass, handleAddRow);
}
