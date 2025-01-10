import { WriteAnyDto } from '@/components/carousel-groups/orders/components/order/CarouselOrderManager';
import { produce } from 'immer';
import {
  CarouselOptionDto,
  CarouselOrderDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';

export function assignOrderItemToOption(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto,
  dispatchWrite: WriteAnyDto<CarouselOrderDto>
) {
  dispatchWrite(orderItem.carouselOrderId, (state: CarouselOrderDto) => {
    return produce(state, (draft) => {
      draft.carouselOrderItems[orderItem.workSchemaId].carouselOptionId =
        option.id;
    });
  });
}
