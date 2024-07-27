import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema_';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/tables/VirtualizedTableWindowed';

export function StaticAllocationDraggable(props: {
  entity: StaticDeliveryAllocationItemDto;
  disabled?: boolean;
}) {
  const { entity, disabled } = props;
  const deliveryAllocationSize =
    entity.staticDeliveryAllocation.deliveryAllocation.deliveryAllocationSize;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.STATIC_ALLOCATION,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: entity
  }));

  return disabled ? (
    <div
      className={clsx('h-[40px] bg-gray-500')}
      style={{ width: `${deliveryAllocationSize * defaultCellSize}px` }}
    ></div>
  ) : (
    drag(
      <div
        className={clsx(
          'h-[40px] bg-blue-500',
          isDragging && 'animate-pulse bg-opacity-50'
        )}
        style={{ width: `${deliveryAllocationSize * defaultCellSize}px` }}
      ></div>
    )
  );
}
