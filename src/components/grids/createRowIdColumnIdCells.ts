import { useMemo } from 'react';

export interface CellIndex {
  rowIndex: number | undefined;
  columnIndex: number | undefined;
}

export function createRowIdColumnIdCells<T, U>(
  rowIdList: T[],
  columnIdList: U[]
) {
  return rowIdList.map((rowId) => {
    return columnIdList.map((columnId) => ({
      rowId,
      columnId
    }));
  });
}

export function useRowIdColumnIdCells<T, U>(rowIdList: T[], columnIdList: U[]) {
  return useMemo(
    () => createRowIdColumnIdCells(rowIdList, columnIdList),
    [rowIdList, columnIdList]
  );
}
