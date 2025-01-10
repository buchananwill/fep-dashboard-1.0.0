import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';
import { OrderItemRowProps } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';

export default function SelectIsActive({
  dispatch,
  orderItem
}: OrderItemRowProps) {
  const setIsSelected = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch((order) => {
        const updatedItems = { ...order.carouselOrderItems };
        updatedItems[orderItem.workSchemaId] = {
          ...orderItem,
          active: e.currentTarget.checked
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

  return <Switch checked={orderItem.active} onChange={setIsSelected}></Switch>;
}

type OrderItemEntryTuple = [string, CarouselOrderItemDto];
