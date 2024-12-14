'use client';
import {
  AvailabilityPostRequest,
  AvailabilitySummaryDto,
  DayOfWeek
} from '@/api/generated-types/generated-types_';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { DayOfWeekArray, DayOfWeekObject } from '@/api/date-and-time';
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
): AvailabilitySummaryDto {
  const { start, end } = event;
  if (!start || !end || !start.dateTime || !end.dateTime)
    throw new Error('Start or end missing' + JSON.stringify(event));
  return {
    roleTypeName: '',
    startTime: toLocalTime(start.dateTime),
    endTime: toLocalTime(end.dateTime),
    availabilityCode: 'TRUE',
    day: getDayOfWeek(start as RequiredDeep<DateTimeTimeZone>)
  };
}

function getDayIndex(
  day:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
) {
  return DayOfWeekArray.indexOf(DayOfWeekObject[day]);
}

export function mondayIsDayZero(today: Date) {
  return (today.getDay() + 6) % 7;
}

export function fromLocalTimeToUtc(
  dateTimeString: string,
  day: DayOfWeek
): string {
  // Parse the time string and combine it with the current date
  const [hours, minutes, seconds] = dateTimeString.split(':').map(Number);

  // Map day of week back to a Date
  const dayIndex = getDayIndex(day);
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(monday.getDate() - mondayIsDayZero(monday));
  const targetDate = new Date(today.setDate(monday.getDate() + dayIndex));
  targetDate.setHours(hours, minutes, seconds);

  // Convert back to ISO UTC format
  return targetDate.toISOString();
}

export function availabilityToOutlookEvent(
  availability: AvailabilitySummaryDto
): OutlookEvent {
  const { startTime, endTime, day, roleTypeName } = availability;

  if (!startTime || !endTime || !day)
    throw new Error('Invalid availability: ' + JSON.stringify(availability));

  const startDateTime = fromLocalTimeToUtc(startTime, day);
  const endDateTime = fromLocalTimeToUtc(endTime, day);

  return {
    start: {
      dateTime: startDateTime,
      timeZone: 'UTC'
    } as DateTimeTimeZone,
    end: {
      dateTime: endDateTime,
      timeZone: 'UTC'
    } as DateTimeTimeZone,
    subject: roleTypeName || 'No Role Type Set', // Use roleTypeName as the subject
    id: crypto.randomUUID()
  };
}
