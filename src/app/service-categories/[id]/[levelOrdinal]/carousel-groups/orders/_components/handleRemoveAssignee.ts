import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { produce } from 'immer';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';

export function handleRemoveAssignee(
  dispatchWriteAny: WriteAny<CarouselOptionStateInterface>,
  carouselOrderItem: CarouselOrderItemDto
) {
  if (carouselOrderItem.carouselOptionId === undefined) return;
  // console.log(`${CarouselOptionState}:${carouselOrderItem.carouselOptionId}`);
  // return;
  dispatchWriteAny(
    `${CarouselOptionState}:${carouselOrderItem.carouselOptionId}`,
    (state) =>
      produce(state, (draft) => {
        draft.carouselOrderAssignees.filter(
          (orderId) => orderId !== carouselOrderItem.carouselOrderId
        );
      })
  );
}
