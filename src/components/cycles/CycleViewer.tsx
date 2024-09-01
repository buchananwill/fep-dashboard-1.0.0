import { createCycleDays } from '@/functions/cycles/groupCycleSubspansByDay';
import { EntityClassMap } from '@/api/entity-class-map';

import CycleDayFetcher from '@/components/cycles/CycleDayFetcher';
import { ArrayPlaceholder } from 'selective-context';
import { interceptPost, interceptPut } from '@/functions/cycles/interceptors';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { CycleDto } from '@/api/zod-schemas/CycleDtoSchema';
import { deleteIdList } from '@/api/generated-actions/CycleSubspan';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { TransientIdOffset } from '@/api/literals';

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
  },
  dayOrdinal: 1
};

export default function CycleViewer({ cycle }: { cycle: CycleDto }) {
  const cycleDays = createCycleDays(cycle);

  return (
    <div
      className={
        'grid min-w-fit grid-cols-[repeat(7,minmax(min-content,1fr))] gap-1 p-8'
      }
    >
      <EditAddDeleteDtoControllerArray
        dtoList={ArrayPlaceholder}
        entityClass={EntityClassMap.cycleSubspan}
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
