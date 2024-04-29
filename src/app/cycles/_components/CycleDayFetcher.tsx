import { CycleDay } from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';
import { getDtoListByExampleList } from '@/app/api/generated-actions/CycleSubspan';
import CycleDayViewer from '@/app/cycles/_components/CycleDayViewer';

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
