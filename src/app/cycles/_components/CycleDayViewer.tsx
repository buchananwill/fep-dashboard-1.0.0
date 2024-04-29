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
import { useMemo } from 'react';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';
import { useSelectiveContextGlobalController } from 'selective-context';

const entityClass = EntityClassMap.cycleSubspan;

export default function CycleDayViewer({
  cycle,
  cycleSubspanData
}: {
  cycle: CycleDto;
  cycleSubspanData: CycleSubspanDto[];
}) {
  const { currentState } = useSelectiveContextGlobalController<
    CycleSubspanDto[]
  >({
    contextKey: `${entityClass}:masterList`,
    listenerKey: 'controller',
    initialValue: cycleSubspanData
  });

  const { groupedByCycleDay, cycleDays } = useMemo(() => {
    return groupCycleSubspansByDay(currentState, cycle);
  }, [currentState, cycle]);

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
            <CardHeader className={'text-center justify-center'}>
              {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
            </CardHeader>
            <CardBody className={''}>
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
