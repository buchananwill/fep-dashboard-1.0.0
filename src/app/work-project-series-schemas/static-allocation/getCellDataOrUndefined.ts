import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { GenericTableDto } from '@/api/types';

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
