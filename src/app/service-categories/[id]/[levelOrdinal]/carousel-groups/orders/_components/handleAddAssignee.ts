import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';

export function handleAddAssignee(
  dispatchWriteAny: WriteAny<CarouselOptionState>,
  carouselOrderItem: CarouselOrderItemDto
) {
  dispatchWriteAny(
    `CarouselOrderState:${carouselOrderItem.carouselOptionId}`,
    (state) =>
      produce(state, (draft) => {
        draft.carouselOrderAssignees.push(carouselOrderItem.carouselOrderId);
      })
  );
}
