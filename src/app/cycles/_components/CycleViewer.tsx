import { createCycleDays } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { EntityClassMap } from '@/api/entity-class-map';

import { TransientIdOffset } from '@/api/main';
import CycleDayFetcher from '@/app/cycles/_components/CycleDayFetcher';
import { ArrayPlaceholder } from 'selective-context';
import {
  interceptPost,
  interceptPut
} from '@/app/cycles/_components/interceptors';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { CycleDto } from '@/api/dtos/CycleDtoSchema';
import { deleteIdList } from '@/api/generated-actions/CycleSubspan';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';

const entityClass = EntityClassMap.cycleSubspan;

export const templateCycleSubspan: CycleSubspanDto = {
  parentCycleId: NaN,
  zeroIndexedCycleDay: NaN,
  name: 'New Period',
  id: TransientIdOffset,
  timeSpanDto: {
    startTimeDivisionInstant: '09:00:00',
    endTimeDivisionInstant: '10:00:00',
    id: TransientIdOffset,
    startTimeDivisionId: TransientIdOffset,
    endTimeDivisionId: TransientIdOffset,
    name: 'New Timespan'
  }
};

export default function CycleViewer({ cycle }: { cycle: CycleDto }) {
  const cycleDays = createCycleDays(cycle);

  return (
    <div
      className={
        'p-8 grid grid-cols-[repeat(7,minmax(min-content,1fr))] gap-1 min-w-fit'
      }
    >
      <EditAddDeleteDtoControllerArray
        dtoList={ArrayPlaceholder}
        entityClass={entityClass}
        updateServerAction={interceptPut}
        deleteServerAction={deleteIdList}
        postServerAction={interceptPost}
      />
      {cycleDays.map((cycleDay) => (
        <CycleDayFetcher
          key={cycleDay.zeroIndexedCycleDay}
          cycleDay={cycleDay}
          cycle={cycle}
        />
      ))}
    </div>
  );
}
