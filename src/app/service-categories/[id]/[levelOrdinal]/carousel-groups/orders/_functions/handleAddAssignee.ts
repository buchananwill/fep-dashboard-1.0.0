import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';

export function handleAddAssignee(
  dispatchWriteAny: WriteAny<CarouselOptionStateInterface>,
  carouselOrderItem: CarouselOrderItemDto
) {
  if (carouselOrderItem.carouselOptionId === undefined) return;

  dispatchWriteAny(
    `${CarouselOptionState}:${carouselOrderItem.carouselOptionId}`,
    (state) => {
      if (state === undefined) return state;

      return produce(state, (draft) => {
        draft.carouselOrderAssignees.push(carouselOrderItem.carouselOrderId);
      });
    }
  );
}