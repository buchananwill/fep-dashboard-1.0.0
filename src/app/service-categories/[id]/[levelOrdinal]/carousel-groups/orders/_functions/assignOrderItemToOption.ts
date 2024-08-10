import { CarouselOrderItemDto } from '@/api/zod-schemas/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/zod-schemas/CarouselOptionDtoSchema';
import { WriteAnyDto } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { CarouselOrderDto } from '@/api/zod-schemas/CarouselOrderDtoSchema';
import { produce } from 'immer';

export function assignOrderItemToOption(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto,
  dispatchWrite: WriteAnyDto<CarouselOrderDto>
) {
  dispatchWrite(orderItem.carouselOrderId, (state: CarouselOrderDto) => {
    return produce(state, (draft) => {
      draft.carouselOrderItems[
        orderItem.workProjectSeriesSchemaId
      ].carouselOptionId = option.id;
    });
  });
}
