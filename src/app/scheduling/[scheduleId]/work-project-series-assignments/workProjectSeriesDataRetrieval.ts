import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import { CellIdReference } from '@/components/tables/CellQueryManager';

export function workProjectSeriesDataRetrieval(
  tableData: WorkProjectSeriesAssignmentTableDto
) {
  const { organizationToCycleSubspanIdToAssignmentId, assignmentIdToDtoMap } =
    tableData;

  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const cycleSubspanIdToAssignmentIdElement =
        organizationToCycleSubspanIdToAssignmentId[`${rowId}`];
      const assignmentIdElement = cycleSubspanIdToAssignmentIdElement
        ? cycleSubspanIdToAssignmentIdElement[`${columnId}`]
        : undefined;
      return assignmentIdElement
        ? assignmentIdElement.map((itemId) => assignmentIdToDtoMap[`${itemId}`])
        : undefined;
    }
  };
}
