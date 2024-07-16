'use client';
import CellQueryManager, {
  CellIdReference,
  GetCellContent
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import VirtualizedTableWindowed from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedTableWindowed';
import AvailabilityCell from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/AvailabilityCell';
import { FallbackCellMemo } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/FallbackCell';
import { Identifier } from 'dto-stores';
import { GenericTableDto, IdReferencedIntersectionTableDto } from '@/api/types';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';

export function AvailabilityTable({
  tableData,
  ...props
}: {
  itemData: CellIdReference[][];
  columnIdList: Identifier[];
  rowIdList: Identifier[];
  tableData: GenericTableDto<
    ProviderRoleDto,
    CycleSubspanDto,
    ProviderRoleAvailabilityDto
  >;
}) {
  return (
    <>
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={retrieveAvailabilityCell}
      />
      <VirtualizedTableWindowed
        renderCell={AvailabilityCell}
        renderSyncedColumnCell={FallbackCellMemo}
        renderSyncedRowCell={FallbackCellMemo}
        {...props}
      />
    </>
  );
}

function retrieveAvailabilityCell(
  tableData: GenericTableDto<
    ProviderRoleDto,
    CycleSubspanDto,
    ProviderRoleAvailabilityDto
  >
): GetCellContent<ProviderRoleAvailabilityDto> {
  return {
    memoizedFunction: ({ rowId, columnId }) => {
      const row = tableData.rowColumnCellReferenceMap[String(rowId)];
      if (!row) return undefined;
      const cellReference = row[String(columnId)];
      if (!cellReference) return undefined;
      return tableData.cellIdCellContentMap[cellReference];
    }
  };
}
