import { CarouselOrderItemDto } from '@/api/generated-types/generated-types_';
import { produce } from 'immer';
import { WriteAnyDto } from '@/components/carousel-groups/orders/components/order/CarouselOrderManager';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';

export function handleRemoveAssignee(
  dispatchWriteAny: WriteAnyDto<CarouselOptionStateInterface>,
  carouselOrderItem: CarouselOrderItemDto
) {
  if (carouselOrderItem.carouselOptionId === undefined) return;
  dispatchWriteAny(carouselOrderItem.carouselOptionId, (state) => {
    if (state === undefined) return state;
    return produce(state, (draft) => {
      draft.carouselOrderAssignees = draft.carouselOrderAssignees.filter(
        (orderId) => orderId !== carouselOrderItem.carouselOrderId
      );
    });
  });
}
