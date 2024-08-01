import { CycleDay } from '@/functions/cycles/groupCycleSubspansByDay';

import CycleDayViewer from '@/components/cycles/CycleDayViewer';
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
