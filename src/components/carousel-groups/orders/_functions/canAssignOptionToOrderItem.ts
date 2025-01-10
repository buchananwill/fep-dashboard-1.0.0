import {
  CarouselOptionDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';

export function canAssignToOrderItem(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto
) {
  return (
    option.workSchemaId === orderItem.workSchemaId &&
    // orderItem.carouselOptionId !== option.id &&
    orderItem.active
  );
}
