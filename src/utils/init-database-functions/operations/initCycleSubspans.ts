'use server';
import data from '@/utils/init-json-data/time/CycleSubspan.json';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/CycleSubspan';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import { CycleDto } from '@/api/generated-types/generated-types';

export async function initCycleSubspans(cycle: CycleDto) {
  const cycleLengthInDays = cycle.cycleLengthInWeeks * 7;
  const daysWithinNewCycle = data
    .filter(
      (cycleSubspan) => cycleSubspan.zeroIndexedCycleDay < cycleLengthInDays
    )
    .map((cycleSubspan) => ({
      ...cycleSubspan,
      parentCycleId: cycle.id,
      dayOrdinal: NaN
    }));
  return initSafely(
    () => getDtoListByExampleList(daysWithinNewCycle),
    () => postList(daysWithinNewCycle)
  );
}
