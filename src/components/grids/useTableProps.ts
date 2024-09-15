import { HasIdClass, Identifier } from 'dto-stores';
import { getIdList } from '@/functions/getIdList';
import { createRowIdColumnIdCells } from '@/components/grids/createRowIdColumnIdCells';
import { useMemo } from 'react';

export function getTableProps<
  T extends HasIdClass<U>,
  U extends Identifier,
  V extends HasIdClass<W>,
  W extends Identifier
>(rowList: T[], columnList: V[]) {
  const rowIdList: U[] = getIdList(rowList);
  const columnIdList: W[] = getIdList(columnList);

  const itemData = createRowIdColumnIdCells(rowIdList, columnIdList);
  return { rowIdList, columnIdList, itemData };
}

export function useTableProps<
  T extends HasIdClass<U>,
  U extends Identifier,
  V extends HasIdClass<W>,
  W extends Identifier
>(rowList: T[], columnList: V[]) {
  return useMemo(() => {
    return getTableProps(rowList, columnList);
  }, [rowList, columnList]);
}
