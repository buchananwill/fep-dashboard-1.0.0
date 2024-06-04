'use client';
import { DtoStoreParams, LazyDtoUiListAll, useDtoStore } from 'dto-stores';
import Carousel from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import CarouselOrderManager from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import React, { memo, useContext } from 'react';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/main';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import OptionRotationButtonGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionRotationButtonGroup';
import { ControllerKey, InitialSet } from '@/app/_literals';
import {
  FilteredOrders,
  HighlightedSubjects,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_literals';
import { Skeleton } from '@nextui-org/skeleton';

export default function CarouselGroup(params: DtoStoreParams) {
  const { entity } = useDtoStore<CarouselGroupDto>(params);
  useGlobalController({
    contextKey: HighlightedSubjects,
    initialValue: EmptyArray,
    listenerKey: ControllerKey
  });
  useGlobalController({
    contextKey: RotationPrime,
    initialValue: EmptyArray,
    listenerKey: ControllerKey
  });

  useGlobalController<Set<string>>({
    contextKey: FilteredOrders,
    initialValue: InitialSet as Set<string>,
    listenerKey: ControllerKey
  });

  // TODO: Remove this when finished debugging.
  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );
  // const mutableRefObjectListener = useContext(
  //   SelectiveContextGlobal.listenersRefContext
  // );
  console.log(mutableRefObject);

  if (!entity) return null;

  return (
    <Card>
      <CardHeader className={'flex justify-center'}>
        <OptionRotationButtonGroup />
      </CardHeader>
      <CardBody>
        <div
          className={'grid p-4 gap-1'}
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
            renderAs={MemoOrderManager}
            entityClass={EntityClassMap.carouselOrder}
            whileLoading={() => (
              <Skeleton>
                <div className={'w-12'} />
              </Skeleton>
            )}
          />
        </div>
      </CardBody>
    </Card>
  );
}

const MemoOrderManager = memo(CarouselOrderManager);
