'use client';
import {
  CellIdReference,
  GetCellContent
} from '@/components/tables/CellQueryManager';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import { AvailabilityCell } from '@/app/service-categories/[id]/roles/_components/AvailabilityCell';
import { ProviderCell } from '@/app/service-categories/[id]/roles/_components/ProviderCell';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { useGridSelectionController } from '@/app/service-categories/[id]/roles/_components/useGridSelectionCell';

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
