import { CellIdReference } from '@/components/grids/CellQueryManager';
import { AssignmentTableRow, GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectDto
} from '@/api/generated-types/generated-types_';

export function workProjectDataRetrieval(
  tableData: GenericTableDto<
    AssignmentTableRow,
    CycleSubspanDto,
    WorkProjectDto,
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
