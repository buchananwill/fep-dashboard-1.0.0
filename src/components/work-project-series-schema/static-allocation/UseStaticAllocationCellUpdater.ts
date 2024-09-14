import {
  Cell,
  getCellId
} from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { StaticDeliveryAllocationItemDto } from '@/api/zod-schemas/StaticDeliveryAllocationItemDtoSchema';
import { useWriteAnyDto } from 'dto-stores';
import { useCallback } from 'react';

function updateStaticAllocationTableCell(
  writeAnyCell: {
    (id: string | number, update: unknown): void;
  },
  rowId: string | number,
  cycleSubspanId: number,
  data: string | undefined
) {
  writeAnyCell(
    getCellId(
      EntityClassMap.staticDeliveryAllocationItem,
      rowId,
      cycleSubspanId
    ),
    (cell: Cell<StaticDeliveryAllocationItemDto>) => ({
      ...cell,
      data
    })
  );
}

export function useStaticAllocationCellUpdater(rowId: string | number) {
  const writeAnyCell = useWriteAnyDto('Cell');
  return useCallback(
    (data: string | undefined, cycleSubspanId: number) => {
      updateStaticAllocationTableCell(
        writeAnyCell,
        rowId,
        cycleSubspanId,
        data
      );
    },
    [writeAnyCell, rowId]
  );
}
