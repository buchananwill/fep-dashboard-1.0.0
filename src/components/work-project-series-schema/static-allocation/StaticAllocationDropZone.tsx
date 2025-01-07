import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import {
  CycleSubspanWithJoinsListDto,
  StaticDeliveryAllocationItemDto
} from '@/api/generated-types/generated-types_';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { getCellIdReference } from '@/components/grids/getCellIdReference';
import { useCallback } from 'react';
import clsx from 'clsx';
import { NamespacedHooks, useDtoStore, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  matchIsFirst,
  matchRow,
  matchSize
} from '@/components/work-project-series-schema/static-allocation/allocationDropZonePermissions';
import { cycleSubspanGroupMap } from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import { useGlobalListener } from 'selective-context';
import { ObjectPlaceholder } from '@/api/client-literals';
import { useStaticAllocationCellUpdater } from '@/components/work-project-series-schema/static-allocation/UseStaticAllocationCellUpdater';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export function getDeliveryAllocationSize(
  item: StaticDeliveryAllocationItemDto | undefined
) {
  return (
    item?.staticDeliveryAllocation?.deliveryAllocation
      ?.deliveryAllocationSize ?? 0
  );
}

function itemAlreadyExisted(item: StaticDeliveryAllocationItemDto) {
  return item.id > 0 || !isNaN(item.cycleSubspanGroupId);
}

function getCycleSubspanGroupId(
  cycleSubspan: CycleSubspanWithJoinsListDto,
  item: StaticDeliveryAllocationItemDto
) {
  return cycleSubspan.cycleSubspanJoins[getDeliveryAllocationSize(item)]
    .cycleSubspanGroupId;
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
    entityId: columnId ?? NaN,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: listenerKey
  });

  const canDropCallback = useCallback(
    (item: StaticDeliveryAllocationItemDto, monitor: DropTargetMonitor) => {
      const size = getDeliveryAllocationSize(item);

      const rowMatched = matchRow(item, rowId as number);
      const sizeMatched = matchSize(cycleSubspan.cycleSubspanJoins, size);
      const isFirst = matchIsFirst(cycleSubspan.cycleSubspanJoins, size);
      return rowMatched && sizeMatched && isFirst;
    },
    [rowId, cycleSubspan]
  );
  const localMemoizedUpdater = useStaticAllocationCellUpdater(rowId ?? NaN);

  const dispatchMasterList = NamespacedHooks.useDispatch<
    StaticDeliveryAllocationItemDto[]
  >(EntityClassMap.staticDeliveryAllocationItem, KEY_TYPES.MASTER_LIST);
  const dispatchAdded = NamespacedHooks.useDispatch<number[]>(
    EntityClassMap.staticDeliveryAllocationItem,
    KEY_TYPES.ADDED
  );

  const writeAnyStaticAllocation = useWriteAnyDto(
    EntityClassMap.staticDeliveryAllocationItem
  );

  const { currentState: cycleSubspanGroupMapCurrent } = useGlobalListener({
    contextKey: cycleSubspanGroupMap,
    listenerKey,
    initialValue: ObjectPlaceholder as Record<string, number[]>
  });
  const dropCallback = useCallback(
    (
      item: StaticDeliveryAllocationItemDto,
      monitor: DropTargetMonitor<StaticDeliveryAllocationItemDto>
    ) => {
      // write to the new cells
      const newGroupId =
        cycleSubspan.cycleSubspanJoins[getDeliveryAllocationSize(item)]
          .cycleSubspanGroupId;
      const cycleSubspanIds = cycleSubspanGroupMapCurrent[newGroupId];
      cycleSubspanIds.forEach((cycleSubspanId) => {
        localMemoizedUpdater(String(item.id), cycleSubspanId);
      });

      // write to the old cells
      const oldCellElements: number[] | undefined =
        cycleSubspanGroupMapCurrent[item.cycleSubspanGroupId];
      if (oldCellElements) {
        oldCellElements.forEach((cycleSubspanId) => {
          localMemoizedUpdater(undefined, cycleSubspanId);
        });
      }
      // write to the dropped item
      const cycleSubspanGroupId = getCycleSubspanGroupId(cycleSubspan, item);
      if (itemAlreadyExisted(item)) {
        writeAnyStaticAllocation(
          item.id,
          (item: StaticDeliveryAllocationItemDto) => ({
            ...item,
            cycleSubspanGroupId
          })
        );
      } else {
        dispatchAdded((list) => [...list, item.id]);
        dispatchMasterList((list) => [
          ...list,
          { ...item, cycleSubspanGroupId }
        ]);
      }
    },
    [
      dispatchAdded,
      dispatchMasterList,
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
        'h-full w-full border border-gray-200 bg-opacity-30',
        currentItem && (canDrop ? 'bg-emerald-500' : 'bg-gray-200')
      )}
    ></div>
  );
}
