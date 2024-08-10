import {
  Entity,
  Identifier,
  NamespacedHooks,
  useMasterListInteraction
} from 'dto-stores';
import { ServiceCategoryDto } from '@/api/zod-schemas/ServiceCategoryDtoSchema';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';

export function useKnowledgeDtoTableProps<T extends Entity>(
  serviceCategory: ServiceCategoryDto,
  entityClass: string,
  comparatorFunction: (t1: T, t2: T) => number,
  createEntity: (current: T[], serviceCategoryDto: ServiceCategoryDto) => T
) {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen<T[]>(
      entityClass,
      KEY_TYPES.MASTER_LIST,
      listenerKey,
      EmptyArray as T[]
    );

  const dispatchDeleted = NamespacedHooks.useDispatch<Identifier[]>(
    entityClass,
    KEY_TYPES.DELETED
  );
  const sortedRows = useMemo(() => {
    return currentState.toSorted(comparatorFunction);
  }, [currentState, comparatorFunction]);

  const handleAddRow = useCallback(
    (
      dispatchMasterList: DispatchState<T[]>,
      dispatchAddedlist: DispatchState<Identifier[]>
    ) => {
      const entity = createEntity(sortedRows, serviceCategory);
      dispatchMasterList((list) => [...list, entity]);
      dispatchAddedlist((list) => [...list, entity.id]);
    },
    [serviceCategory, sortedRows, createEntity]
  );

  const masterListInteraction = useMasterListInteraction(
    entityClass,
    handleAddRow
  );

  const handleRemoveRow = useCallback(() => {
    dispatchWithoutControl((list) => {
      return list.length > 1 ? list.slice(0, list.length - 1) : [];
    });

    dispatchDeleted((list) => [...list, sortedRows[sortedRows.length - 1].id]);
  }, [dispatchWithoutControl, sortedRows, dispatchDeleted]);

  return useMemo(
    () => ({ sortedRows, handleRemoveRow, masterListInteraction }),
    [sortedRows, handleRemoveRow, masterListInteraction]
  );
}
