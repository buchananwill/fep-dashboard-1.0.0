import { CarouselDto } from '@/api/zod-schemas/CarouselDtoSchema';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';

export function transformOptionForClientState(carouselDtoList: CarouselDto[]) {
  const optionStateList: CarouselOptionStateInterface[] =
    carouselDtoList.flatMap((carousel) => {
      return carousel.carouselOptionDtos.map((dto) => ({
        ...dto,
        carouselOrderAssignees: [],
        clashMap: new Map()
      }));
    });
  return optionStateList;
}