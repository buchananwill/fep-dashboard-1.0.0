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

  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const cycleSubspanIdToAssignmentIdElement =
        rowColumnCellReferenceMap[`${rowId}`];
      return cycleSubspanIdToAssignmentIdElement
        ? cycleSubspanIdToAssignmentIdElement[`${columnId}`]
        : undefined;
    }
  };
}
