import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { produce } from 'immer';

export function assignOrderItemToOption(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto,
  dispatchWrite: WriteAny<CarouselOrderDto>
) {
  dispatchWrite(
    `${EntityClassMap.carouselOrder}:${orderItem.carouselOrderId}`,
    (state: CarouselOrderDto) => {
      return produce(state, (draft) => {
        draft.carouselOrderItems[
          orderItem.workProjectSeriesSchemaId
        ].carouselOptionId = option.id;
      });
    }
  );
}
