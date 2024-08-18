import { useReadAnyDto } from 'dto-stores';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { CarouselOptionState } from '@/components/carousel-groups/orders/components/CarouselOption';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types';

export function useClashList(orderItem: CarouselOrderItemDto) {
  const readAny =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const option = orderItem.carouselOptionId
    ? readAny(orderItem.carouselOptionId)
    : undefined;

  return option?.clashMap?.get(orderItem.carouselOrderId) ?? [];
}
