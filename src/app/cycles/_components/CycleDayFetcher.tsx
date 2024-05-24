import { CycleDay } from '@/app/cycles/_functions/groupCycleSubspansByDay';

import CycleDayViewer from '@/app/cycles/_components/CycleDayViewer';
import { CycleDto } from '@/api/dtos/CycleDtoSchema';
import { getDtoListByExampleList } from '@/api/generated-actions/CycleSubspan';

export interface CycleDayFetcherProps {
  cycleDay: CycleDay;
  cycle: CycleDto;
}

export default async function CycleDayFetcher({
  cycle,
  cycleDay
}: CycleDayFetcherProps) {
  const cycleSubspanDtos = await getDtoListByExampleList([
    {
      parentCycleId: cycle.id,
      zeroIndexedCycleDay: cycleDay.zeroIndexedCycleDay
    }
  ]);

  return (
    <CycleDayViewer
      cycle={cycle}
      cycleDay={cycleDay}
      cycleSubspanDtos={cycleSubspanDtos}
    />
  );
}
