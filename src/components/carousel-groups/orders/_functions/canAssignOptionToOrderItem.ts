import {
  CarouselOptionDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';

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
