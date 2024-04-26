'use client';

import cycleSubspans from '../../../../../utils/init-json-data/time/CycleSubspan.json';
import cycleSubspanGroups from '../../../../../utils/init-json-data/time/CycleSubspanGroup.json';
import cycle from '../../../../../utils/init-json-data/time/Cycle.json';
import { EntityClassMap } from '@/app/api/entity-class-map';
import {
  getWeekNumberInt,
  groupCycleSubspansByDay
} from '@/app/cycles/_functions/groupCycleSubspansByDay';

import { DtoControllerArray } from 'dto-stores';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DtoComponentWrapperListView } from '@/components/generic/DtoComponentWrapperListView';
import CycleSubspan from '@/app/cycles/_components/CycleSubspan';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';
import { useSelectiveContextGlobalController } from 'selective-context';
import CycleSubspanGroup from '@/app/cycles/_components/CycleSubspanGroup';
import { useMemo } from 'react';

const cycleSubspan = EntityClassMap.cycleSubspan;
const cycleSubspanGroup = EntityClassMap.cycleSubspanGroup;

export default function Page() {
  const { currentState } = useSelectiveContextGlobalController({
    contextKey: `${cycleSubspanGroup}:masterList`,
    listenerKey: 'controller',
    initialValue: cycleSubspanGroups
  });

  const { cycleDays } = useMemo(
    () => groupCycleSubspansByDay(cycleSubspans, cycle),
    [cycleSubspans, cycle]
  );

  useSelectiveContextGlobalController({
    contextKey: 'cycleDayList',
    initialValue: cycleDays,
    listenerKey: 'controller'
  });

  return (
    <div>
      <DtoControllerArray dtoList={cycleSubspans} entityName={cycleSubspan} />
      <DtoControllerArray
        dtoList={currentState}
        entityName={cycleSubspanGroup}
      />

      <Card classNames={{ base: 'w-fit' }}>
        <CardHeader className={'text-center justify-center'}>Groups</CardHeader>
        <CardBody className={''}>
          <DtoComponentWrapperListView
            entityList={currentState}
            entityClass={cycleSubspanGroup}
            eachAs={CycleSubspanGroup}
          />
        </CardBody>
      </Card>
    </div>
  );
}
