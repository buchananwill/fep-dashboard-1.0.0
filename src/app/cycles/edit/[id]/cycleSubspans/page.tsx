'use client';
import data from '../../../../../utils/init-json-data/time/CycleSubspan.json';
import cycle from '../../../../../utils/init-json-data/time/Cycle.json';
import { DtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/app/api/entity-class-map';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DtoComponentWrapperListView } from '@/components/generic/DtoComponentWrapperListView';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';

const entityClass = EntityClassMap.cycleSubspan;

export default function Page() {
  const { groupedByCycleDay, cycleDays } = groupCycleSubspansByDay(data, cycle);

  return (
    <div className={'grid grid-cols-5 w-fit gap-1'}>
      <DtoControllerArray dtoList={data} entityName={entityClass} />
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
