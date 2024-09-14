import { Entity, NamespacedHooks } from 'dto-stores';
import { GenericTableDto } from '@/api/types';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useMemo } from 'react';
import { useTableProps } from '@/components/tables/useTableProps';

export function useFilteredRows<T extends Entity, U extends Entity, V, W>(
  tableData: GenericTableDto<T, U, V, W>,
  entityClass: string,
  filterFunctionCreator?: (
    idSet: Set<string | number>
  ) => (entity: T) => boolean
) {
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.SELECTED,
    `rowFilteredTable:${entityClass}`,
    EmptyArray as (string | number)[]
  );

  const { columnList, rowList } = tableData;
  const tableDataFiltered = useMemo(() => {
    if (currentState.length === 0) return tableData;
    const selectedRowIdSet = new Set(currentState);
    const predicate = filterFunctionCreator
      ? filterFunctionCreator(selectedRowIdSet)
      : (rowEntity: T) => selectedRowIdSet.has(rowEntity.id);

    return {
      ...tableData,
      rowList: rowList.filter(predicate)
    };
  }, [currentState, rowList, tableData, filterFunctionCreator]);

  return useTableProps(tableDataFiltered.rowList, columnList);
}
