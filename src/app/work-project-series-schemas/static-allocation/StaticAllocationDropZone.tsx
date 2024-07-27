import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { getCellIdReference } from '@/components/tables/getCellIdReference';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useDtoStore, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CycleSubspanWithJoinsListDto } from '@/api/dtos/CycleSubspanWithJoinsListDtoSchema_';
import {
  matchIsFirst,
  matchRow,
  matchSize
} from '@/app/work-project-series-schemas/static-allocation/allocationDropZonePermissions';
import {
  Cell,
  cycleSubspanGroupMap,
  getCellId
} from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';
import { useGlobalListener } from 'selective-context';
import { ObjectPlaceholder } from '@/api/literals';

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

function getDeliveryAllocationSize(item: StaticDeliveryAllocationItemDto) {
  return item.staticDeliveryAllocation.deliveryAllocation
    .deliveryAllocationSize;
}

export function StaticAllocationDropZone({
  columnIndex,
  rowIndex,
  data
}: InnerCellContent<StaticDeliveryAllocationItemDto | undefined>) {
  const { rowId, columnId } = getCellIdReference({
    data,
    rowIndex,
    columnIndex
  });

  const listenerKey = `cell:${rowIndex}:${columnIndex}`;
  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: listenerKey
  });

  const canDropCallback = useCallback(
    (item: StaticDeliveryAllocationItemDto, monitor: DropTargetMonitor) => {
      const size = getDeliveryAllocationSize(item);
      return (
        matchRow(item, rowId as string) &&
        matchSize(cycleSubspan.cycleSubspanJoins, size) &&
        matchIsFirst(cycleSubspan.cycleSubspanJoins, size)
      );
    },
    [rowId, cycleSubspan]
  );

  const writeAnyCell = useWriteAnyDto('Cell');
  const writeAnyStaticAllocation = useWriteAnyDto(
    EntityClassMap.staticDeliveryAllocationItem
  );
  const { currentState: cycleSubspanGroupMapCurrent } = useGlobalListener({
    contextKey: cycleSubspanGroupMap,
    listenerKey,
    initialValue: ObjectPlaceholder as Record<string, number[]>
  });

  const localMemoizedUpdater = useCallback(
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

  const dropCallback = useCallback(
    (
      item: StaticDeliveryAllocationItemDto,
      monitor: DropTargetMonitor<StaticDeliveryAllocationItemDto, unknown>
    ) => {
      // write to the new cells
      const newGroupId =
        cycleSubspan.cycleSubspanJoins[getDeliveryAllocationSize(item)]
          .cycleSubspanGroupId;
      cycleSubspanGroupMapCurrent[newGroupId].forEach((cycleSubspanId) => {
        localMemoizedUpdater(String(item.id), cycleSubspanId);
      });

      // write to te old cells
      cycleSubspanGroupMapCurrent[item.cycleSubspanGroupId].forEach(
        (cycleSubspanId) => {
          localMemoizedUpdater(undefined, cycleSubspanId);
        }
      );
      // write to the dropped item
      writeAnyStaticAllocation(
        item.id,
        (item: StaticDeliveryAllocationItemDto) => ({
          ...item,
          cycleSubspanGroupId:
            cycleSubspan.cycleSubspanJoins[getDeliveryAllocationSize(item)]
              .cycleSubspanGroupId
        })
      );
    },
    [
      cycleSubspan,
      localMemoizedUpdater,
      cycleSubspanGroupMapCurrent,
      writeAnyStaticAllocation
    ]
  );

  // Get drag data and functions
  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.STATIC_ALLOCATION,
      drop: dropCallback,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        currentItem: monitor.getItem(),
        currentItemType: monitor.getItemType()
      }),
      canDrop: canDropCallback
    })
  );

  return drop(
    <div
      className={clsx(
        'h-full w-full border border-gray-200 bg-opacity-20',
        currentItem && (canDrop ? 'bg-emerald-500' : 'bg-rose-500')
      )}
    ></div>
  );
}
