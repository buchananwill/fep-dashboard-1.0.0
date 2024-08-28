'use client';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { GenericTableDto, HasNumberId } from '@/api/types';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { useGlobalController } from 'selective-context';
import { AvailabilityCell } from '@/app/service-categories/[id]/roles/_components/AvailabilityCell';
import { ProviderCell } from '@/app/service-categories/[id]/roles/_components/ProviderCell';
import { useGridSelectionController } from '@/app/service-categories/[id]/roles/_components/useGridSelectionCell';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { availabilityConfig } from '@/app/service-categories/[id]/roles/_components/AvailabilityConfig';
import { AvailabilityType } from '@/app/service-categories/[id]/roles/_components/AvailabilityType';

export interface AvailabilityTableProps<
  Role extends HasNumberId,
  Availability
> {
  type: AvailabilityType;
  itemData: CellIdReference[][];
  columnIdList: Identifier[];
  rowIdList: Identifier[];
  tableData: GenericTableDto<Role, CycleSubspanDto, Availability, Availability>;
}

export function AvailabilityTable<Role extends HasNumberId, Availability>({
  tableData,
  type,
  ...props
}: AvailabilityTableProps<Role, Availability>) {
  useGridSelectionController();

  const { currentState } = useGlobalController({
    contextKey: 'cellIdMap',
    initialValue: tableData.rowColumnCellReferenceMap,
    listenerKey: 'controller'
  });

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={availabilityConfig[type].entityClass}
        dtoList={Object.values(tableData.cellIdCellContentMap)}
        updateServerAction={availabilityConfig[type].update}
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
