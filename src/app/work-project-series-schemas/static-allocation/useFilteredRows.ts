import { Entity, NamespacedHooks } from 'dto-stores';
import { GenericTableDto } from '@/api/types';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useMemo } from 'react';
import { useTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';

export function useFilteredRows<T extends Entity, U extends Entity, V>(
  tableData: GenericTableDto<T, U, V>,
  rowList: T[],
  columnList: U[],
  entityClass: string
) {
  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.SELECTED,
    `rowFilteredTable:${entityClass}`,
    EmptyArray as (string | number)[]
  );

  const tableDataFiltered = useMemo(() => {
    const selectedRowIdList = new Set(currentState);
    return {
      ...tableData,
      rowList: rowList.filter((rowEntity) =>
        selectedRowIdList.has(rowEntity.id)
      )
    };
  }, [currentState, tableData, rowList]);

  return useTableProps(tableDataFiltered.rowList, columnList);
}