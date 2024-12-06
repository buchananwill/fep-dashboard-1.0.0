import { DispatchState } from '@/types';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { OrderItemLabel } from '@/components/carousel-groups/orders/order-modal/OrderItemLabel';
import SelectIsActive from '@/components/carousel-groups/orders/order-modal/SelectIsActive';
import clsx from 'clsx';
import { useCallback } from 'react';
import SelectCarouselOptionAssignment from '@/components/carousel-groups/orders/order-modal/SelectCarouselOptionAssignment';

export interface OrderItemRowProps {
  dispatch: DispatchState<CarouselOrderDto>;
  orderItem: CarouselOrderItemDto;
}

export function CarouselOrderItem(props: OrderItemRowProps) {
  const { orderItem, dispatch } = props;
  const [collect, drag, dragPreview] = useDrag(() => ({
    type: DragTypes.CAROUSEL_ORDER_ITEM,
    item: orderItem
  }));

  const onDrop = (item: CarouselOrderItemDto, monitor: DropTargetMonitor) => {
    const { preferencePosition: prefPosDraggable } = item;
    const { preferencePosition: prefPosDropTarget } = orderItem;
    if (prefPosDropTarget === prefPosDraggable) return;
    // TODO: when dragging down, drop below, up drop above.
    const dragFromLargerPrefPos = prefPosDraggable > prefPosDropTarget;
    dispatch((order) => {
      const { carouselOrderItems } = order;
      const updatedEntries = Object.entries(carouselOrderItems).map(
        ([itemKey, orderItemValue]) => {
          const { preferencePosition: currPrefPos } = orderItemValue;
          if (currPrefPos === prefPosDraggable) {
            return [
              itemKey,
              { ...orderItemValue, preferencePosition: prefPosDropTarget }
            ];
          } else if (
            dragFromLargerPrefPos &&
            currPrefPos >= prefPosDropTarget &&
            currPrefPos < prefPosDraggable
          ) {
            return [
              itemKey,
              { ...orderItemValue, preferencePosition: currPrefPos + 1 }
            ];
          } else if (
            !dragFromLargerPrefPos &&
            currPrefPos <= prefPosDropTarget &&
            currPrefPos > prefPosDraggable
          ) {
            return [
              itemKey,
              { ...orderItemValue, preferencePosition: currPrefPos - 1 }
            ];
          } else {
            return [itemKey, orderItemValue];
          }
        }
      );
      return {
        ...order,
        carouselOrderItems: Object.fromEntries(updatedEntries)
      };
    });
  };

  // Get drag data and functions
  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.CAROUSEL_ORDER_ITEM,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        currentItem: monitor.getItem(),
        currentItemType: monitor.getItemType()
      }),
      canDrop: (item, monitor) => true
    })
  );

  return drop(
    dragPreview(
      <tr className={clsx(isOver && 'animate-pulse')}>
        <td className={'w-12'}>
          <div className={'h-12'}>
            <OrderItemLabel {...props} />
          </div>
        </td>
        {drag(
          <td
            className={clsx(
              'cursor-pointer',
              orderItem.preferencePosition % 2 === 0
                ? 'bg-rose-200'
                : 'bg-blue-200',
              'h-12 w-12  text-center'
            )}
          >
            {props.orderItem.preferencePosition}
          </td>
        )}
        <td className={'p-2'}>
          <SelectIsActive {...props} />
        </td>
        <td>
          <SelectCarouselOptionAssignment {...props} />
        </td>
      </tr>
    )
  );
}
