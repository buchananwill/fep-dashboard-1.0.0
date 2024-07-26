import { SetRequired } from 'type-fest';
import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/tables/VirtualizedTableWindowed';

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