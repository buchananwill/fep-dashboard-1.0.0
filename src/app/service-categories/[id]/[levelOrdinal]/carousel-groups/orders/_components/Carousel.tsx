import { BaseLazyDtoUiProps } from 'dto-stores';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import CarouselOption from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';

export default function Carousel({ entity }: BaseLazyDtoUiProps<CarouselDto>) {
  return (
    <>
      {entity.carouselOptionDtos.map((option) => (
        <CarouselOption key={option.id} entity={option} />
      ))}
    </>
  );
}
