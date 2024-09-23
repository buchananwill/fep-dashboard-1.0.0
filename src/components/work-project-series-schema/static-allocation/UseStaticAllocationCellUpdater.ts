import { EntityClassMap } from '@/api/entity-class-map';
import { StaticDeliveryAllocationItemDto } from '@/api/generated-types/generated-types';
import { useWriteAnyDto } from 'dto-stores';
import { useCallback } from 'react';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import {
  Cell,
  joinCellId
} from '@/components/work-project-series-schema/static-allocation/createCell';

function updateStaticAllocationTableCell(
  writeAnyCell: {
    (id: string | number, update: unknown): void;
  },
  rowId: string | number,
  cycleSubspanId: number,
  data: string | undefined
) {
  writeAnyCell(
    joinCellId(
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
  const writeAnyCell = useWriteAnyDto(CellEntityClass);
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
