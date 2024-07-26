import { SetRequired } from 'type-fest';
import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/tables/VirtualizedTableWindowed';
import { useDtoStore } from 'dto-stores';
import { CycleSubspanWithJoinsListDto } from '@/api/dtos/CycleSubspanWithJoinsListDtoSchema_';
import { EntityClassMap } from '@/api/entity-class-map';
import { getCellIdReference } from '@/components/tables/getCellIdReference';
import { useMemo } from 'react';
import { matchIsFirst } from '@/app/work-project-series-schemas/static-allocation/allocationDropZonePermissions';

export function StaticAllocationDraggable(
  props: SetRequired<
    InnerCellContent<StaticDeliveryAllocationItemDto>,
    'cellData'
  >
) {
  const { cellData } = props;
  const deliveryAllocationSize =
    cellData.staticDeliveryAllocation.deliveryAllocation.deliveryAllocationSize;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.STATIC_ALLOCATION,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: props.cellData
  }));

  return drag(
    <div
      className={clsx(
        'h-[40px] bg-blue-500',
        isDragging && 'animate-pulse bg-opacity-50'
      )}
      style={{ width: `${deliveryAllocationSize * defaultCellSize}px` }}
    ></div>
  );
}

export function StaticAllocationOccupied(
  props: SetRequired<
    InnerCellContent<StaticDeliveryAllocationItemDto>,
    'cellData'
  >
) {
  const { cellData, columnIndex, rowIndex, data } = props;
  console.log(cellData);
  const { columnId } = getCellIdReference({
    data,
    rowIndex,
    columnIndex
  });
  const deliveryAllocationSize =
    cellData.staticDeliveryAllocation.deliveryAllocation.deliveryAllocationSize;

  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: `cell:${rowIndex}:${columnIndex}`
  });

  const isDraggable = useMemo(() => {
    return matchIsFirst(cycleSubspan.cycleSubspanJoins, deliveryAllocationSize);
  }, [cycleSubspan, deliveryAllocationSize]);

  if (isDraggable) {
    return <StaticAllocationDraggable {...props} />;
  } else
    return (
      <div
        className={clsx('h-[40px] bg-blue-500')}
        style={{ width: `${defaultCellSize}px` }}
      ></div>
    );
}
