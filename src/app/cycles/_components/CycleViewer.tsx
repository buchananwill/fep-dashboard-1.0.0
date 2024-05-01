import { createCycleDays } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { deleteIdList } from '@/app/api/generated-actions/CycleSubspan';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import CycleDayFetcher from '@/app/cycles/_components/CycleDayFetcher';
import { ArrayPlaceholder } from 'selective-context';
import DtoIdListChangesTracker from '@/components/generic/DtoChangesTracker';
import {
  interceptPost,
  interceptPut
} from '@/app/cycles/_components/interceptors';

const entityClass = EntityClassMap.cycleSubspan;

export const templateCycleSubspan: CycleSubspanDto = {
  parentCycleId: NaN,
  zeroIndexedCycleDay: NaN,
  description: 'New Period',
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
      <DtoIdListChangesTracker
        dtoList={ArrayPlaceholder}
        entityName={entityClass}
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
