'use client';
import {
  DtoStoreParams,
  LazyDtoUiListAll,
  NamespacedHooks,
  useDtoStore
} from 'dto-stores';
import Carousel from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import CarouselOrderManager from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import React, { memo, useCallback, useContext, useTransition } from 'react';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';
import { useGlobalController } from 'selective-context';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import OptionRotationButtonGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionRotationButtonGroup';
import { ControllerKey, InitialSet } from '@/app/_literals';
import {
  FilteredOrders,
  HighlightedSubjects,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_literals';
import { Skeleton } from '@nextui-org/skeleton';
import { EmptyArray } from '@/api/literals';
import { Button } from '@nextui-org/button';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { resetAssignmentsAction } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/resetAssignmentsAction';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { KEY_TYPES } from 'dto-stores/dist/literals';

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
  const [isPending, startTransition] = useTransition();
  const appRouterInstance = useRouter();

  // TODO: Remove this when finished debugging.
  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );
  // const mutableRefObjectListener = useContext(
  //   SelectiveContextGlobal.listenersRefContext
  // );
  console.log(mutableRefObject);

  const handleReset = useCallback(async () => {
    startTransition(() =>
      resetAssignmentsAction({ id: entity?.id ?? '' }).then((r) => {
        dispatchCarouselOrders(r);
        appRouterInstance.refresh();
      })
    );
  }, [entity?.id, appRouterInstance]);

  if (!entity) return null;

  return (
    <Card>
      <PendingOverlay pending={isPending} />
      <CardHeader className={'grid-cols-3 grid w-full'}>
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
