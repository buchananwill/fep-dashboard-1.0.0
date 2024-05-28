'use client';
import {
  DtoStoreParams,
  LazyDtoUiListAll,
  MasterMapController,
  useDtoStore
} from 'dto-stores';
import Carousel from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import CarouselOrderManager from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { useContext } from 'react';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';

export default function CarouselGroup(params: DtoStoreParams) {
  const { entity } = useDtoStore<CarouselGroupDto>(params);

  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );
  // const mutableRefObjectListener = useContext(
  //   SelectiveContextGlobal.listenersRefContext
  // );
  console.log(mutableRefObject);

  if (!entity) return null;

  return (
    <div
      className={'grid h-[100vh] p-4 gap-1'}
      style={{
        gridTemplateColumns: `repeat(${entity.carousels.length}, minmax(0, 1fr))`
        // gridTemplateRows: `repeat(${entity.carouselGroupOptions.length - entity.carousels.length + 1}, minmax(0, 1fr))`
      }}
    >
      <LazyDtoUiListAll
        renderAs={Carousel}
        entityClass={EntityClassMap.carousel}
        whileLoading={() => null}
      />
      <LazyDtoUiListAll
        renderAs={CarouselOrderManager}
        entityClass={EntityClassMap.carouselOrder}
        whileLoading={() => null}
      />
    </div>
  );
}
