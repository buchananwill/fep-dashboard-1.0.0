import { OrderItemRowProps } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderModal';
import { Switch } from '@nextui-org/react';
import { useCallback } from 'react';
import {
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types';

export default function SelectIsActive({
  dispatch,
  orderItem
}: OrderItemRowProps) {
  const setIsSelected = useCallback(
    (isSelected: boolean) => {
      dispatch((order) => {
        const updatedItems = Object.fromEntries(
          Object.entries(order.carouselOrderItems).map(([itemKey, item]) => {
            if (itemKey !== orderItem.workProjectSeriesSchemaId) {
              return [itemKey, item] as OrderItemEntryTuple;
            } else {
              const updatedItem = { ...item, active: isSelected };
              return [itemKey, updatedItem] as OrderItemEntryTuple;
            }
          })
        );
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
    ></Switch>
  );
}

type OrderItemEntryTuple = [string, CarouselOrderItemDto];
