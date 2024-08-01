import { DispatchState } from '@/types';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { OrderItemLabel } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/OrderItemLabel';
import SelectIsActive from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/SelectIsActive';
import clsx from 'clsx';
import { useCallback } from 'react';

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
    console.log(item, orderItem);
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
        <td>
          <OrderItemLabel {...props} />
        </td>
        {drag(
          <td
            className={clsx(
              'cursor-pointer',
              orderItem.preferencePosition % 2 === 0
                ? 'bg-rose-200'
                : 'bg-blue-200'
            )}
          >
            {props.orderItem.preferencePosition}
          </td>
        )}
        <td>
          <SelectIsActive {...props} />
        </td>
        <td>
          <select value={props.orderItem.carouselOptionId}>
            <option value={props.orderItem.carouselOptionId}>
              {props.orderItem.carouselOptionId}
            </option>
          </select>
        </td>
      </tr>
    )
  );
}
