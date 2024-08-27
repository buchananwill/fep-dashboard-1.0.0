'use client';
import {
  CellIdReference,
  GetCellContent
} from '@/components/tables/CellQueryManager';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleAvailabilityDto } from '@/api/zod-schemas/ProviderRoleAvailabilityDtoSchema';
import { ProviderRoleDto } from '@/api/zod-schemas/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import { AvailabilityCell } from '@/app/service-categories/[id]/roles/_components/AvailabilityCell';
import { ProviderCell } from '@/app/service-categories/[id]/roles/_components/ProviderCell';
import CycleSubspanCellWithJoins from '@/app/service-categories/[id]/roles/_components/CycleSubspanCellWithJoins';
import { useGridSelectionController } from '@/app/service-categories/[id]/roles/_components/useGridSelectionCell';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';

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
    ProviderRoleAvailabilityDto,
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

      <VirtualizedTableWindowed
        renderCell={AvailabilityCell}
        renderSyncedColumnCell={ProviderCell}
        renderSyncedRowCell={CycleSubspanCell}
        {...props}
      />
    </>
  );
}
