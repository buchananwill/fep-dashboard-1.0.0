import { CarouselOrderItemDto } from '@/api/generated-types/generated-types';
import { CarouselOptionDto } from '@/api/generated-types/generated-types';
import { CarouselOptionState } from '@/components/carousel-groups/orders/components/option/CarouselOption';
import { SetRequired } from 'type-fest';

type HasDefinedOptionId = SetRequired<CarouselOrderItemDto, 'carouselOptionId'>;

export function checkForClash(
  orderItems: Record<string, CarouselOrderItemDto>,
  carouselOptionDtoMap: Map<string, CarouselOptionDto>
) {
  const clashes: HasDefinedOptionId[][] = [];
  const itemSet = new Set(Object.values(orderItems));
  for (let orderItemDto of Object.values(orderItems)) {
    itemSet.delete(orderItemDto);
    const filterClashes = [...itemSet]
      .filter((item) => {
        if (!item.active) return false;
        const optionA = carouselOptionDtoMap.get(
          `${CarouselOptionState}:${item.carouselOptionId}`
        );
        const optionB = carouselOptionDtoMap.get(
          `${CarouselOptionState}:${orderItemDto.carouselOptionId}`
        );
        return (
          optionA && optionB && optionA?.carouselId === optionB?.carouselId
        );
      })
      .map((item) => item as HasDefinedOptionId);
    if (filterClashes.length > 0) {
      clashes.push([orderItemDto as HasDefinedOptionId, ...filterClashes]);
      filterClashes.forEach((clashingOrderItem) =>
        itemSet.delete(clashingOrderItem)
      );
    }
  }
  return clashes;
}
