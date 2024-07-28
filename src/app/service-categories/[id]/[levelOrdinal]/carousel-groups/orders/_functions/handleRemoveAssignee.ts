import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAnyDto } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

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
