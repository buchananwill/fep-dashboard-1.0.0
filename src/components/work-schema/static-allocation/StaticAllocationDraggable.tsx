import { StaticDeliveryAllocationItemDto } from '@/api/generated-types/generated-types_';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/grids/VirtualizedTableWindowed';
import classes from './staticAllocationCell.module.css';

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

  const style = { width: `${deliveryAllocationSize * defaultCellSize}px` };

  return disabled ? (
    <div className={clsx('h-[40px] bg-gray-200')} style={style}></div>
  ) : (
    drag(
      <div
        className={clsx(
          classes.draggableCell,
          classes.staticItemCell,
          isDragging && 'animate-pulsing'
        )}
        style={style}
      ></div>
    )
  );
}
