import {
  DayOfWeek,
  DayOfWeekArray,
  DayOfWeekObject
} from '@/app/api/date-and-time';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { CycleDto } from '@/app/api/dtos/CycleDtoSchema';
import { StringMap } from '@/app/api/string-map';
import { isNotUndefined } from '@/app/api/main';

export interface CycleDay {
  zeroIndexedCycleDay: number;
  day: DayOfWeek;
}

export function getWeekNumberInt(cycleDay: CycleDay) {
  return Math.floor(cycleDay.zeroIndexedCycleDay / 7) + 1;
}

export function groupCycleSubspansByDay<T extends CycleSubspanDto>(
  items: T[],
  cycle: CycleDto
) {
  if (!Array.isArray(items)) throw Error('Items is not an array:', items);

  const groupedByCycleDay = Object.groupBy(
    items,
    (cycleSubspan) => cycleSubspan.zeroIndexedCycleDay
  );

  const cycleDays: CycleDay[] = [];
  const responseGrouping: StringMap<CycleSubspanDto[]> = {};
  // @ts-ignore
  const startDay = DayOfWeekArray.indexOf(DayOfWeekObject[cycle.cycleDayZero]);

  for (let i = 0; i < cycle.cycleLengthInDays; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexedCycleDay: i, day: DayOfWeekArray[dayNum] });
    const groupedByCycleDayElement = groupedByCycleDay[i];
    responseGrouping[i] = isNotUndefined(groupedByCycleDayElement)
      ? groupedByCycleDayElement
      : [];
  }
  return { groupedByCycleDay: responseGrouping, cycleDays };
}

export function createCycleDays<T extends CycleSubspanDto>(cycle: CycleDto) {
  const cycleDays: CycleDay[] = [];
  // @ts-ignore
  const startDay = DayOfWeekArray.indexOf(DayOfWeekObject[cycle.cycleDayZero]);

  for (let i = 0; i < cycle.cycleLengthInDays; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexedCycleDay: i, day: DayOfWeekArray[dayNum] });
  }
  return cycleDays;
}
