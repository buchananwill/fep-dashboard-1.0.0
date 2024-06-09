import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

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
