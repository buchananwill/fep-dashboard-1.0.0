'use client';
import { useEffect, useState, useTransition } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { getWeekNumberInt } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { Button } from '@nextui-org/button';
import { DtoComponentWrapperListView } from '@/components/generic/DtoComponentWrapperListView';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { CycleDayFetcherProps } from '@/app/cycles/_components/CycleDayFetcher';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { TransientIdOffset } from '@/api/main';
import {
  ArrayPlaceholder,
  useSelectiveContextGlobalController,
  useSelectiveContextGlobalDispatch
} from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { templateCycleSubspan } from '@/app/cycles/_components/CycleViewer';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

import { useRenameEntity } from '@/components/modals/nameSetter';

export interface CycleDayViewerProps extends CycleDayFetcherProps {
  cycleSubspanDtos: CycleSubspanDto[];
}

const cycleSubspan = EntityClassMap.cycleSubspan;
export default function CycleDayViewer({
  cycleSubspanDtos,
  cycleDay,
  cycle
}: CycleDayViewerProps) {
  const [pending, startTransition] = useTransition();

  const { currentState, dispatch } = useSelectiveContextGlobalController<
    CycleSubspanDto[]
  >({
    contextKey: `${cycleSubspan}:day:${cycleDay.zeroIndexedCycleDay}`,
    listenerKey: 'controller',
    initialValue: cycleSubspanDtos
  });

  const { dispatchWithoutControl } = useSelectiveContextGlobalDispatch<
    number[]
  >({
    contextKey: `${cycleSubspan}:added`,
    listenerKey: `day:${cycleDay.zeroIndexedCycleDay}`,
    initialValue: ArrayPlaceholder
  });

  console.log(currentState);

  const handleAddCycleSubspan = (cycleDay: number) => {
    const transientId =
      TransientIdOffset + currentState.length * (cycleDay + 1);
    const newCycleSubspan: CycleSubspanDto = {
      ...templateCycleSubspan,
      zeroIndexedCycleDay: cycleDay,
      parentCycleId: cycle.id,
      id: transientId
    };
    console.log(newCycleSubspan);
    dispatch((csList) => [...csList, newCycleSubspan]);
    dispatchWithoutControl((list) => [...list, transientId]);
  };

  return (
    <Card classNames={{ base: 'w-fit', body: 'w-fit' }}>
      {currentState.map((entity) => (
        <DtoController dto={entity} entityName={cycleSubspan} key={entity.id} />
      ))}
      <CardHeader className={'text-center justify-center gap-2'}>
        {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
        <Button
          size={'sm'}
          className={'relative'}
          onPress={() =>
            startTransition(async () => {
              handleAddCycleSubspan(cycleDay.zeroIndexedCycleDay);
            })
          }
        >
          Add Period
          <PendingOverlay pending={pending} />
        </Button>
      </CardHeader>
      <CardBody className={'gap-1'}>
        <DtoComponentWrapperListView
          entityList={currentState}
          entityClass={cycleSubspan}
          eachAs={CycleSubspan}
        />
      </CardBody>
    </Card>
  );
}
