import { OutlookEvent } from '@/components/microsoft-graph/helperTypes';
import { EventInput_FC } from '@/full-calendar/types';
import { formatInTimeZone } from 'date-fns-tz';

export function flattenTimesIntoEvent(event: OutlookEvent): EventInput_FC {
  return {
    ...event,
    start: getZonedDateTime(event.start),
    end: getZonedDateTime(event.end)
  };
}

function getZonedDateTime(dateTimeObj: OutlookEvent['start' | 'end']) {
  if (!dateTimeObj) throw new Error('No date time supplied');
  const { dateTime, timeZone } = dateTimeObj;
  if (!dateTime || !timeZone) throw new Error('Missing dateTime or Zone');
  return formatInTimeZone(dateTime, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}