'use client';
import { useTransition } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { getWeekNumberInt } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { Button } from '@nextui-org/button';
import { DtoUiWrapperListView } from '@/components/generic/DtoUiWrapperListView';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { CycleDayFetcherProps } from '@/app/cycles/_components/CycleDayFetcher';

import { TransientIdOffset } from '@/api/main';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { templateCycleSubspan } from '@/app/cycles/_components/CycleViewer';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { DtoControllerArray } from 'dto-stores';

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

  const { currentState, dispatch } = useGlobalController<CycleSubspanDto[]>({
    contextKey: `${cycleSubspan}:day:${cycleDay.zeroIndexedCycleDay}`,
    listenerKey: 'controller',
    initialValue: cycleSubspanDtos
  });

  const { dispatchWithoutListen } = useGlobalDispatch<number[]>(
    `${cycleSubspan}:added`
  );

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
    dispatchWithoutListen((list) => [...list, transientId]);
  };

  return (
    <Card classNames={{ base: 'w-fit', body: 'w-fit' }}>
      <DtoControllerArray entityClass={cycleSubspan} dtoList={currentState} />

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
        <DtoUiWrapperListView
          entityList={currentState}
          entityClass={cycleSubspan}
          renderAs={CycleSubspan}
        />
      </CardBody>
    </Card>
  );
}
