import { BaseLazyDtoUiProps } from 'dto-stores';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import CarouselOption from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { memo, useMemo } from 'react';

export default function Carousel({ entity }: BaseLazyDtoUiProps<CarouselDto>) {
  return (
    <div className={'grid grid-cols-1 gap-1'}>
      {entity.carouselOptionDtos.map((option) => (
        <MemoCarouselOption key={option.id} entity={option} />
      ))}
    </div>
  );
}

const MemoCarouselOption = memo(CarouselOption);
