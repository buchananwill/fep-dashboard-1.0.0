import {
  DayOfWeek,
  DayOfWeekArray,
  DayOfWeekObject
} from '@/app/api/date-and-time';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';

export interface CycleDay {
  zeroIndexCycleDay: number;
  day: DayOfWeek;
}

export function getWeekNumberInt(cycleDay: CycleDay) {
  return Math.floor(cycleDay.zeroIndexCycleDay / 7) + 1;
}

export function groupCycleSubspansByDay(
  items: CycleSubspanDto[],
  cycle: CycleDto
) {
  const groupedByCycleDay = Object.groupBy(
    items,
    (cycleSubspan) => cycleSubspan.zeroIndexedCycleDay
  );

  const cycleDays: CycleDay[] = [];
  // @ts-ignore
  const startDay = DayOfWeekArray.indexOf(DayOfWeekObject[cycle.cycleDayZero]);

  for (let i = 0; i < cycle.cycleLengthInDays; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexCycleDay: i, day: DayOfWeekArray[dayNum] });
  }
  return { groupedByCycleDay, cycleDays };
}
