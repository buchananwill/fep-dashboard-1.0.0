import { Identifier, NamespacedHooks } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useCallback, useMemo } from 'react';
import { HasId } from '@/api/types';
import { useMasterListToCreate } from '@/components/knowledge-levels/useMasterListToCreate';

export function useKnowledgeDtoTableProps<T extends HasId>(
  entityClass: string,
  comparatorFunction: (t1: T, t2: T) => number,
  createEntity: (current: T[]) => T
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

  const entitySupplier = useCallback(() => {
    return createEntity(sortedRows);
  }, [sortedRows, createEntity]);

  const masterListInteraction = useMasterListToCreate(
    entitySupplier,
    entityClass
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
