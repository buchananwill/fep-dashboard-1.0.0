'use client';
import {
  CellIdReference,
  GetCellContent
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import VirtualizedTableWindowed from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedTableWindowed';
import { AvailabilityCell } from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/AvailabilityCell';
import { FallbackCellMemo } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/FallbackCell';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { useGridSelectionController } from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/useGridSelectionCell';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/DtoUiWrapperCell';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/CycleSubspanCell';
import { ProviderCell } from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/ProviderCell';

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
  useGridSelectionController();

  const { currentState } = useGlobalController({
    contextKey: 'cellIdMap',
    initialValue: tableData.rowColumnCellReferenceMap,
    listenerKey: 'controller'
  });

  console.log(currentState);
  console.log(tableData);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRoleAvailability}
        dtoList={Object.values(tableData.cellIdCellContentMap)}
        updateServerAction={Api.ProviderRoleAvailability.putList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRole}
        dtoList={tableData.rowList}
        updateServerAction={Api.ProviderRole.putList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={tableData.columnList}
      />
      <VirtualizedTableWindowed
        renderCell={AvailabilityCell}
        renderSyncedColumnCell={ProviderCell}
        renderSyncedRowCell={CycleSubspanCell}
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
