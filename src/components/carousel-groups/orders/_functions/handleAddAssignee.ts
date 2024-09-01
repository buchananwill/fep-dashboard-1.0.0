import { CarouselOrderItemDto } from '@/api/zod-schemas/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAnyDto } from '@/components/carousel-groups/orders/components/CarouselOrderManager';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';

export function handleAddAssignee(
  dispatchWriteAny: WriteAnyDto<CarouselOptionStateInterface>,
  carouselOrderItem: CarouselOrderItemDto
) {
  if (carouselOrderItem.carouselOptionId === undefined) return;

  dispatchWriteAny(carouselOrderItem.carouselOptionId, (state) => {
    if (state === undefined) {
      return state;
    }

    return produce(state, (draft) => {
      if (
        !state.carouselOrderAssignees.includes(
          carouselOrderItem.carouselOrderId
        )
      )
        draft.carouselOrderAssignees.push(carouselOrderItem.carouselOrderId);
    });
  });
}
