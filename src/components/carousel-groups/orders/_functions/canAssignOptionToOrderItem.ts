import { CarouselOrderItemDto } from '@/api/zod-schemas/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/zod-schemas/CarouselOptionDtoSchema';

export function canAssignToOrderItem(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto
) {
  return (
    option.workProjectSeriesSchemaId === orderItem.workProjectSeriesSchemaId &&
    // orderItem.carouselOptionId !== option.id &&
    orderItem.active
  );
}