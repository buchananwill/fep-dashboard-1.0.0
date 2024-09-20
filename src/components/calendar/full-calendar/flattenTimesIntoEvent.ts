import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { EventInput_FC } from '@/components/calendar/full-calendar/types';
import { formatInTimeZone } from 'date-fns-tz';
import { EventDto } from '@/api/generated-types/generated-types';

export function flattenTimesIntoEvent(event: OutlookEvent): EventInput_FC {
  return {
    ...event,
    start: getZonedDateTime(event.start),
    end: getZonedDateTime(event.end),
    title: event.subject ?? ''
  };
}

function getZonedDateTime(dateTimeObj: OutlookEvent['start' | 'end']) {
  if (!dateTimeObj) throw new Error('No date time supplied');
  const { dateTime, timeZone } = dateTimeObj;
  if (!dateTime || !timeZone) throw new Error('Missing dateTime or Zone');
  return formatInTimeZone(dateTime, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}
