'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { DtoComponentWrapperListView } from '@/components/generic/DtoComponentWrapperListView';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import {
  deleteIdList,
  putList
} from '@/app/api/generated-actions/CycleSubspan';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import { useMemo, useTransition } from 'react';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';
import { useSelectiveContextGlobalController } from 'selective-context';
import { TransientIdOffset } from '@/app/api/main';
import { Button } from '@nextui-org/button';

const entityClass = EntityClassMap.cycleSubspan;

const templateCycleSubspan: CycleSubspanDto = {
  parentCycleId: NaN,
  zeroIndexedCycleDay: NaN,
  description: 'New Period',
  id: TransientIdOffset,
  timeSpanDto: {
    startTimeDivisionInstant: '9:00:00',
    endTimeDivisionInstant: '10:00:00',
    id: TransientIdOffset,
    startTimeDivisionId: TransientIdOffset,
    endTimeDivisionId: TransientIdOffset,
    name: 'New Timespan'
  }
};

export default function CycleDayViewer({
  cycle,
  cycleSubspanData
}: {
  cycle: CycleDto;
  cycleSubspanData: CycleSubspanDto[];
}) {
  const [pending, startTransition] = useTransition();
  const { currentState, dispatch } = useSelectiveContextGlobalController<
    CycleSubspanDto[]
  >({
    contextKey: `${entityClass}:masterList`,
    listenerKey: 'controller',
    initialValue: cycleSubspanData
  });

  const { groupedByCycleDay, cycleDays } = useMemo(() => {
    return groupCycleSubspansByDay(currentState, cycle);
  }, [currentState, cycle]);

  const handleAddCycleSubspan = (cycleDay: number) => {
    const newCycleSubspan: CycleSubspanDto = {
      ...templateCycleSubspan,
      zeroIndexedCycleDay: cycleDay,
      parentCycleId: cycle.id,
      id: TransientIdOffset + currentState.length
    };
    dispatch((csList) => [...csList, newCycleSubspan]);
  };

  return (
    <div className={'grid grid-cols-5 w-fit gap-1'}>
      <DtoListChangesTracker
        dtoList={currentState}
        entityName={entityClass}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      {cycleDays.map((cycleDay) => {
        const cycleSubspanDtoList =
          groupedByCycleDay[cycleDay.zeroIndexCycleDay];
        if (cycleSubspanDtoList === undefined) return null;
        return (
          <Card key={cycleDay.zeroIndexCycleDay} classNames={{ base: 'w-fit' }}>
            <CardHeader className={'text-center justify-center gap-2'}>
              {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
              <Button
                size={'sm'}
                isLoading={pending}
                onPress={() =>
                  startTransition(() =>
                    handleAddCycleSubspan(cycleDay.zeroIndexCycleDay)
                  )
                }
              >
                Add Period
              </Button>
            </CardHeader>
            <CardBody className={'gap-1'}>
              <DtoComponentWrapperListView
                entityList={cycleSubspanDtoList}
                entityClass={entityClass}
                eachAs={CycleSubspan}
              />
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
