import { CellIdReference } from '@/components/tables/CellQueryManager';
import { GenericTableDto } from '@/api/types';
import { MemoizedFunction } from 'react-d3-force-wrapper';

export function getCellDataOrUndefined<T>(
  tableData: GenericTableDto<any, any, T>
) {
  const { rowColumnCellReferenceMap, cellIdCellContentMap } = tableData;

  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const cycleSubspanIdToAssignmentIdElement =
        rowColumnCellReferenceMap[`${rowId}`];
      const cellElementId = cycleSubspanIdToAssignmentIdElement
        ? cycleSubspanIdToAssignmentIdElement[`${columnId}`]
        : undefined;
      return cellElementId
        ? cellIdCellContentMap[`${cellElementId}`]
        : undefined;
    }
  };
}
export function getCellDataIdOrUndefined<T>(
  tableData: GenericTableDto<any, any, T>
): MemoizedFunction<CellIdReference, string | undefined> {
  const { rowColumnCellReferenceMap } = tableData;
  console.log('map to read from:', rowColumnCellReferenceMap, tableData);
  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const columnIdToCellIdElement = rowColumnCellReferenceMap[`${rowId}`];
      return columnIdToCellIdElement
        ? columnIdToCellIdElement[`${columnId}`]
        : undefined;
    }
  };
}
