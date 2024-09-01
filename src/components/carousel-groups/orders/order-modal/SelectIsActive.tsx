import { Switch } from '@nextui-org/react';
import { useCallback } from 'react';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types';
import { OrderItemRowProps } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';

export default function SelectIsActive({
  dispatch,
  orderItem
}: OrderItemRowProps) {
  const setIsSelected = useCallback(
    (isSelected: boolean) => {
      dispatch((order) => {
        const updatedItems = { ...order.carouselOrderItems };
        updatedItems[orderItem.workProjectSeriesSchemaId] = {
          ...orderItem,
          active: isSelected
        };
        const updatedOrder: CarouselOrderDto = {
          ...order,
          carouselOrderItems: updatedItems
        };
        return updatedOrder;
      });
    },
    [dispatch, orderItem]
  );

  return (
    <Switch
      isSelected={orderItem.active}
      onValueChange={setIsSelected}
      classNames={{ wrapper: 'm-0' }}
    ></Switch>
  );
}

type OrderItemEntryTuple = [string, CarouselOrderItemDto];
