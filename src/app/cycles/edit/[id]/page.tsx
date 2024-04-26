'use client';
import data from '../../../../utils/init-json-data/time/CycleSubspan.json';
import cycle from '../../../../utils/init-json-data/time/Cycle.json';
import {
  DtoComponentWrapper,
  DtoControllerArray,
  DtoUiComponent
} from 'dto-stores';
import { EntityClassMap } from '@/app/api/entity-class-map';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { HasId } from '@/app/api/main';
import {
  DayOfWeek,
  DayOfWeekArray,
  DayOfWeekObject
} from '@/app/api/date-and-time';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

const StartAtCapitalA = 64;

function numberToWeekLetter(weekNumber: number) {
  return String.fromCharCode(weekNumber + StartAtCapitalA);
}

interface CycleDay {
  zeroIndexCycleDay: number;
  day: DayOfWeek;
}

const entityClass = EntityClassMap.cycleSubspan;

function getWeekNumberInt(cycleDay: CycleDay) {
  return Math.floor(cycleDay.zeroIndexCycleDay / 7) + 1;
}

export default function Page() {
  const groupedByCycleDay = Object.groupBy(
    data,
    (cycleSubspan) => cycleSubspan.zeroIndexedCycleDay
  );

  const cycleDays: CycleDay[] = [];
  // @ts-ignore
  const startDay = DayOfWeekArray.indexOf(DayOfWeekObject[cycle.cycleDayZero]);

  for (let i = 0; i < cycle.cycleLengthInDays; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexCycleDay: i, day: DayOfWeekArray[dayNum] });
  }

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

function DtoComponentWrapperListView<T extends HasId>({
  entityList,
  entityClass,
  eachAs
}: {
  entityList: T[];
  entityClass: string;
  eachAs: DtoUiComponent<T>;
}) {
  return entityList.map((entity) => (
    <DtoComponentWrapper
      entityClass={entityClass}
      id={entity.id}
      key={`${entityClass}:${entity.id}`}
      uiComponent={eachAs}
    />
  ));
}
