import { WorkProjectSeriesAssignmentTableDto } from '@/api/zod-schemas/WorkProjectSeriesAssignmentTableDtoSchema_';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { AssignmentTableRow, GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto
} from '@/api/generated-types/generated-types_';

export function workProjectSeriesDataRetrieval(
  tableData: GenericTableDto<
    AssignmentTableRow,
    CycleSubspanDto,
    WorkProjectSeriesAssignmentDto,
    number
  >
) {
  const { rowColumnCellReferenceMap, cellIdCellContentMap } = tableData;

  return {
    memoizedFunction: ({ rowId, columnId }: CellIdReference) => {
      const cycleSubspanIdToAssignmentIdElement =
        rowColumnCellReferenceMap[`${rowId}`];
      const assignmentIdElement = cycleSubspanIdToAssignmentIdElement
        ? cycleSubspanIdToAssignmentIdElement[`${columnId}`]
        : undefined;
      return assignmentIdElement
        ? cellIdCellContentMap[`${assignmentIdElement}`]
        : undefined;
    }
  };
}
