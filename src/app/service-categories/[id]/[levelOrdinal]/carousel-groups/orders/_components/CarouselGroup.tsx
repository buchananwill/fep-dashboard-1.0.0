'use client';
import { DtoStoreParams, LazyDtoUiListAll, useDtoStore } from 'dto-stores';
import Carousel from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';

export default function CarouselGroup(params: DtoStoreParams) {
  const { entity } = useDtoStore<CarouselGroupDto>(params);

  if (!entity) return null;

  return (
    <div
      className={'grid h-[100vh] p-4 gap-2'}
      style={{
        gridTemplateColumns: `repeat(${entity.carousels.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${entity.carouselGroupOptions.length - entity.carousels.length + 1}, minmax(0, 1fr))`
      }}
    >
      <LazyDtoUiListAll
        renderAs={Carousel}
        entityClass={EntityClassMap.carousel}
        whileLoading={() => null}
      />
    </div>
  );
}
