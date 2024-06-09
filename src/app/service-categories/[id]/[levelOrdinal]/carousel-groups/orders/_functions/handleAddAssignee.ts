import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAnyDto } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

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
