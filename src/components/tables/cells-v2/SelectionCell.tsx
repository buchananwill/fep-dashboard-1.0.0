import { TableCellDataProps } from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { useCallback, useMemo } from 'react';
import { sortedIndex } from 'lodash';
import { Checkbox } from '@mantine/core';

export default function SelectionCell<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>({ entityId }: Pick<TableCellDataProps<T, T_ID>, 'entityId'>) {
  const { entityClass } = useEntityTableContext();
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen(
      entityClass,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray as T_ID[]
    );

  const toggle = useCallback(() => {
    dispatchWithoutControl((prev) => {
      const nextIdList = prev.filter((id) => id !== entityId);
      if (nextIdList.length === prev.length) {
        const insertionIndex = sortedIndex(nextIdList, entityId);
        nextIdList.splice(insertionIndex, 0, entityId);
      }
      return nextIdList;
    });
  }, [dispatchWithoutControl, entityId]);

  const selected = useMemo(() => {
    return currentState.includes(entityId);
  }, [currentState, entityId]);

  return <Checkbox checked={selected} onChange={toggle} />;
}
