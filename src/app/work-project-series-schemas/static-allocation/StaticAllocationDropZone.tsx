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
  getCellId
} from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';

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

  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: `cell:${rowIndex}:${columnIndex}`
  });

  const canDropCallback = useCallback(
    (item: StaticDeliveryAllocationItemDto, monitor: DropTargetMonitor) => {
      const size =
        item.staticDeliveryAllocation.deliveryAllocation.deliveryAllocationSize;
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

  // Get drag data and functions
  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.STATIC_ALLOCATION,
      drop: (item, monitor) => {
        writeAnyCell(
          getCellId(
            EntityClassMap.staticDeliveryAllocationItem,
            rowId,
            columnId
          ),
          (cell: Cell<StaticDeliveryAllocationItemDto>) => ({
            ...cell,
            data: item
          })
        );
        writeAnyStaticAllocation(
          item.id,
          (item: StaticDeliveryAllocationItemDto) => ({
            ...item,
            cycleSubspanGroupId:
              cycleSubspan.cycleSubspanJoins[
                item.staticDeliveryAllocation.deliveryAllocation
                  .deliveryAllocationSize
              ].cycleSubspanGroupId
          })
        );
      },
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
