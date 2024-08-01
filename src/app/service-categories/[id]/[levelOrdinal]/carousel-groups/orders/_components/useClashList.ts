import { useReadAnyDto } from 'dto-stores';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types_';

export function useClashList(orderItem: CarouselOrderItemDto) {
  const readAny =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const option = orderItem.carouselOptionId
    ? readAny(orderItem.carouselOptionId)
    : undefined;

  return option?.clashMap?.get(orderItem.carouselOrderId) ?? [];
}
