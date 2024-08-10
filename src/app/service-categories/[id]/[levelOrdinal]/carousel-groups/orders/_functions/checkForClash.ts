import { CarouselOrderItemDto } from '@/api/zod-schemas/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/zod-schemas/CarouselOptionDtoSchema';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';

export function checkForClash(
  orderItems: Record<string, CarouselOrderItemDto>,
  carouselOptionDtoMap: Map<string, CarouselOptionDto>
) {
  // console.log(carouselOptionDtoMap);
  const clashes: CarouselOrderItemDto[][] = [];
  const itemSet = new Set(Object.values(orderItems));
  for (let orderItemDto of Object.values(orderItems)) {
    itemSet.delete(orderItemDto);
    const filterClashes = [...itemSet].filter((item) => {
      if (!item.active) return false;
      const optionA = carouselOptionDtoMap.get(
        `${CarouselOptionState}:${item.carouselOptionId}`
      );
      const optionB = carouselOptionDtoMap.get(
        `${CarouselOptionState}:${orderItemDto.carouselOptionId}`
      );
      return optionA && optionB && optionA?.carouselId === optionB?.carouselId;
    });
    if (filterClashes.length > 0) {
      clashes.push([orderItemDto, ...filterClashes]);
      filterClashes.forEach((clashingOrderItem) =>
        itemSet.delete(clashingOrderItem)
      );
    }
  }
  return clashes;
}
