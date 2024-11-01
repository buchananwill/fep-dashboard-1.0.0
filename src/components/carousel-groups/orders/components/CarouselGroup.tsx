'use client';
import {
  DtoStoreParams,
  LazyDtoUiListAll,
  LazyDtoUiListSome,
  NamespacedHooks,
  useDtoStore,
  useWriteAnyDto
} from 'dto-stores';
import Carousel from '@/components/carousel-groups/orders/components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselOrderManager from '@/components/carousel-groups/orders/components/order/CarouselOrderManager';
import React, { memo, useCallback, useMemo, useTransition } from 'react';
import { useGlobalController } from 'selective-context';
import OptionRotationButtonGroup from '@/components/carousel-groups/orders/components/OptionRotationButtonGroup';
import { ControllerKey, InitialSet } from '@/app/_literals';
import {
  FilteredOrders,
  HighlightedSubjects,
  RotationPrime
} from '@/components/carousel-groups/orders/_literals';
import { EmptyArray } from '@/api/literals';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { resetAssignmentsAction } from '@/components/carousel-groups/orders/_functions/resetAssignmentsAction';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { getDtoListByBodyList as getCarouselByList } from '@/api/generated-actions/Carousel';
import {
  CarouselDto,
  CarouselGroupDto,
  CarouselOrderDto
} from '@/api/generated-types/generated-types';
import { Loader } from '@mantine/core';

export default function CarouselGroup(params: DtoStoreParams) {
  const { entity, dispatchWithoutControl } =
    useDtoStore<CarouselGroupDto>(params);
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
  const dispatchCarouselOrders = NamespacedHooks.useDispatch(
    EntityClassMap.carouselOrder,
    KEY_TYPES.MASTER_LIST
  );
  const dispatchCarousels = NamespacedHooks.useDispatch(
    EntityClassMap.carousel,
    KEY_TYPES.MASTER_LIST
  );
  const writeAnyCarousel = useWriteAnyDto<CarouselDto>(EntityClassMap.carousel);
  const writeAnyOrder = useWriteAnyDto<CarouselOrderDto | string[]>(
    EntityClassMap.carouselOrder
  );

  const [isPending, startTransition] = useTransition();

  const carouselIdList = useMemo(() => {
    return entity?.carousels.map((e) => e.id) ?? [];
  }, [entity?.carousels]);

  const handleReset = useCallback(async () => {
    startTransition(async () =>
      resetAssignmentsAction({ id: entity?.id ?? '' })
        .then(async (r) => {
          const carouselDtoList = await getCarouselByList(
            entity.carousels.map((ar) => ar.id)
          );
          dispatchCarousels(carouselDtoList);
          carouselDtoList.forEach((carousel) =>
            writeAnyCarousel(carousel.id, carousel)
          );
          dispatchCarouselOrders(r);
          return r;
        })
        .then((r) => {
          r.forEach((order) => writeAnyOrder(order.id, order));
        })
        .then(() => writeAnyOrder('changes', []))
    );
  }, [
    writeAnyCarousel,
    writeAnyOrder,
    entity?.id,
    dispatchCarousels,
    dispatchCarouselOrders,
    entity?.carousels
  ]);

  if (!entity) return null;

  return (
    <>
      <PendingOverlay pending={isPending} />
      <div className={'grid w-full grid-cols-3 place-items-center p-2'}>
        <TwoStageClick
          primedMessage={
            'This will remove all manual assignments and re-calculate the Carousel Options.'
          }
          onClick={handleReset}
          timeOutDelayMs={5_000}
        >
          Reset...
        </TwoStageClick>
        <OptionRotationButtonGroup />
      </div>
      <div>
        <div
          className={'grid gap-1 p-4'}
          style={{
            gridTemplateColumns: `repeat(${entity.carousels.length}, minmax(0, 1fr))`
          }}
        >
          <LazyDtoUiListSome
            renderAs={Carousel}
            entityIdList={carouselIdList}
            entityClass={EntityClassMap.carousel}
            whileLoading={() => <Loader />}
          />
          <LazyDtoUiListAll
            renderAs={MemoOrderManager}
            entityClass={EntityClassMap.carouselOrder}
            whileLoading={() => <Loader />}
          />
        </div>
      </div>
    </>
  );
}

const MemoOrderManager = memo(CarouselOrderManager);
