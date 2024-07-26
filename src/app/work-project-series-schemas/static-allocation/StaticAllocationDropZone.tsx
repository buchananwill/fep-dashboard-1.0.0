import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { getCellIdReference } from '@/components/tables/getCellIdReference';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CycleSubspanWithJoinsListDto } from '@/api/dtos/CycleSubspanWithJoinsListDtoSchema';

function matchSize(sizesSet: Map<number, number>, size: number) {
  return sizesSet.has(size);
}

function matchIsFirst(sizesSet: Map<number, number>, size: number) {
  return sizesSet.get(size) === 1;
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

  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: `cell:${rowIndex}:${columnIndex}`
  });

  const sizesSet = useMemo(() => {
    return cycleSubspan.cycleSubspanJoins.reduce(
      (prev, curr) => prev.set(curr.cycleSubspanGroupSize, curr.joinOrdinal),
      new Map<number, number>()
    );
  }, [cycleSubspan]);

  const canDropCallback = useCallback(
    (item: StaticDeliveryAllocationItemDto, monitor: DropTargetMonitor) => {
      const size =
        item.staticDeliveryAllocation.deliveryAllocation.deliveryAllocationSize;
      const matchesRow = staticAllocationMatchesRow(item, rowId as string);
      const matchesSize = matchSize(sizesSet, size);
      const matchesFirst = matchIsFirst(sizesSet, size);
      return matchesRow && matchesSize && matchesFirst;
    },
    [rowId, sizesSet]
  );

  // Get drag data and functions
  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.STATIC_ALLOCATION,
      drop: (item, monitor) => {},
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

function staticAllocationMatchesRow(
  item: StaticDeliveryAllocationItemDto,
  workProjectSeriesSchemaId: string
) {
  return (
    item.staticDeliveryAllocation.deliveryAllocation
      .workProjectSeriesSchemaId === workProjectSeriesSchemaId
  );
}
