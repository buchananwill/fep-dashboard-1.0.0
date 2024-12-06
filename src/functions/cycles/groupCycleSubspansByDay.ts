import {
  DayOfWeek,
  DayOfWeekArray,
  DayOfWeekObject
} from '@/api/date-and-time';

import { StringObjectRecord } from '@/api/string-object-record';
import { isNotUndefined } from '@/api/main';
import { CycleDto } from '@/api/generated-types/generated-types_';
import { CycleSubspanDto } from '@/api/generated-types/generated-types_';
import { publicToken } from '@/api/auth/schemaName';

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

  const groupedByCycleDay = items.reduce((prev, curr) => {
    let list = prev.get(curr.zeroIndexedCycleDay);
    if (list === undefined) {
      list = [] as T[];
      prev.set(curr.zeroIndexedCycleDay, list);
    }
    list.push(curr);
    return prev;
  }, new Map<number, T[]>());

  const cycleDays: CycleDay[] = [];
  const responseGrouping: StringObjectRecord<T[]> = {};
  // @ts-ignore
  const startDay = DayOfWeekArray.indexOf(DayOfWeekObject[cycle.cycleDayZero]);

  for (let i = 0; i < cycle.cycleLengthInWeeks * 7; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexedCycleDay: i, day: DayOfWeekArray[dayNum] });
    const groupedByCycleDayElement = groupedByCycleDay.get(i);
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

  for (let i = 0; i < cycle.cycleLengthInWeeks * 7; i++) {
    const dayNum = (startDay + i) % 7;
    cycleDays.push({ zeroIndexedCycleDay: i, day: DayOfWeekArray[dayNum] });
  }
  return cycleDays;
}
