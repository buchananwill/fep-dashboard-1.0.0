import {
  OutlookEvent,
  OutlookPatternedRecurrence
} from '@/api/microsoft-graph/helperTypes';
import { format, parseISO } from 'date-fns';
import { DayOfWeek } from '@microsoft/microsoft-graph-types';

export function addRecurrencePattern(event: OutlookEvent) {
  return {
    ...event,
    recurrence: updateRecurrencePatternForEvent(recurrencePattern, event)
  } as OutlookEvent;
}

function updateRecurrencePatternForEvent(
  recurrencePattern: OutlookPatternedRecurrence,
  event: OutlookEvent
): OutlookPatternedRecurrence {
  // Extract event start date
  const eventStart = event.start?.dateTime;

  if (!eventStart) {
    throw new Error('Event start date is missing');
  }

  // Parse the event start date and extract the day of the week
  const eventStartDate = parseISO(eventStart);
  const eventDayOfWeek = format(eventStartDate, 'EEEE').toLowerCase(); // Get full day name in lowercase

  // Update recurrence pattern
  return {
    ...recurrencePattern,
    pattern: {
      ...recurrencePattern.pattern,
      daysOfWeek: [eventDayOfWeek as DayOfWeek], // Set to a single day of the week based on the event
      interval: 1 // Weekly occurrence
    },
    range: {
      ...recurrencePattern.range,
      startDate: format(eventStartDate, 'yyyy-MM-dd') // Update start date of recurrence to event's start date
    }
  };
}

const recurrencePattern: OutlookPatternedRecurrence = {
  pattern: {
    type: 'weekly',
    daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    interval: 1
  },
  range: {
    type: 'endDate',
    startDate: '2024-09-09',
    endDate: '2025-09-09',
    recurrenceTimeZone: 'GMT Standard Time',
    numberOfOccurrences: 30
  }
};