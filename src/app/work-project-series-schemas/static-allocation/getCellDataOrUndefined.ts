import { CellIdReference } from '@/components/tables/CellQueryManager';
import { GenericTableDto } from '@/api/types';
import { MemoizedFunction } from 'react-d3-force-wrapper';

export function getCellDataOrUndefined<T extends string | number, U>(
  tableData: GenericTableDto<any, any, any, T>
) {
  const { rowColumnCellReferenceMap, cellIdCellContentMap } = tableData;

  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const columnToCellReferenceMap = rowColumnCellReferenceMap[`${rowId}`];
      const cellElementId = columnToCellReferenceMap
        ? columnToCellReferenceMap[`${columnId}`]
        : undefined;
      return cellElementId
        ? cellIdCellContentMap[`${cellElementId}`]
        : undefined;
    }
  };
}
export function getCellDataIdReferenceOrUndefined<T>(
  tableData: GenericTableDto<any, any, any, T>
): MemoizedFunction<CellIdReference, T | undefined> {
  const { rowColumnCellReferenceMap } = tableData;
  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const columnIdToCellIdElement = rowColumnCellReferenceMap[`${rowId}`];
      return columnIdToCellIdElement
        ? columnIdToCellIdElement[`${columnId}`]
        : undefined;
    }
  };
}
