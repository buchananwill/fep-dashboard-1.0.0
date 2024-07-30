import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto
} from '@/api/generated-types/generated-types';

export function workProjectSeriesDataRetrieval(
  tableData: GenericTableDto<
    OrganizationDto,
    CycleSubspanDto,
    WorkProjectSeriesAssignmentDto,
    number[]
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
        ? assignmentIdElement.map((itemId) => cellIdCellContentMap[`${itemId}`])
        : undefined;
    }
  };
}
