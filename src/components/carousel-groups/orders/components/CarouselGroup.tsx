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
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import OptionRotationButtonGroup from '@/components/carousel-groups/orders/components/OptionRotationButtonGroup';
import { ControllerKey, InitialSet } from '@/app/_literals';
import {
  FilteredOrders,
  HighlightedSubjects,
  RotationPrime
} from '@/components/carousel-groups/orders/_literals';
import { Skeleton } from '@nextui-org/skeleton';
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
    <Card>
      <PendingOverlay pending={isPending} />
      <CardHeader className={'grid w-full grid-cols-3'}>
        <TwoStageClick
          primedMessage={
            'This will remove all manual assignments and re-calculate the Carousel Options.'
          }
          onPress={handleReset}
          timeOutDelayMs={5_000}
        >
          Reset...
        </TwoStageClick>
        <OptionRotationButtonGroup />
      </CardHeader>
      <CardBody>
        <div
          className={'grid gap-1 p-4'}
          style={{
            gridTemplateColumns: `repeat(${entity.carousels.length}, minmax(0, 1fr))`
            // gridTemplateRows: `repeat(${entity.carouselGroupOptions.length - entity.carousels.length + 1}, minmax(0, 1fr))`
          }}
        >
          <LazyDtoUiListSome
            renderAs={Carousel}
            entityIdList={carouselIdList}
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
