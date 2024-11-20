'use client';
import {
  AvailabilityPostRequest,
  DayOfWeek
} from '@/api/generated-types/generated-types';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { DayOfWeekArray } from '@/api/date-and-time';
import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types';
import { RequiredDeep } from 'type-fest';
import { format } from 'date-fns';

export function getDayOfWeek(dateTimeTimeZone: RequiredDeep<DateTimeTimeZone>) {
  return DayOfWeekArray[
    (new Date(dateTimeTimeZone.dateTime).getDay() + 6) % 7
  ].toUpperCase() as DayOfWeek;
}

export function toLocalTime(dateTimeString: string) {
  return format(new Date(dateTimeString), 'HH:mm:SS');
}

export function outlookEventToAvailability(
  event: OutlookEvent
): AvailabilityPostRequest {
  const { start, end } = event;
  if (!start || !end || !start.dateTime || !end.dateTime)
    throw new Error('Start or end missing' + JSON.stringify(event));
  return {
    roleTypeNames: [],
    startTime: toLocalTime(start.dateTime),
    endTime: toLocalTime(end.dateTime),
    availabilityCode: 'TRUE',
    day: getDayOfWeek(start as RequiredDeep<DateTimeTimeZone>)
  };
}
