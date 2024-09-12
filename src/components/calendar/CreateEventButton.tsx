'use client';
import { Button } from '@nextui-org/button';
import { NamespacedHooks } from 'dto-stores';
import { eventSourceEntityClass } from '@/components/calendar/CalendarWithShowHideSources';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { EventSourceSimple } from '@/components/calendar/eventSourceSimple';
import { useCallback } from 'react';
import {
  OutlookEvent,
  OutlookPatternedRecurrence
} from '@/components/microsoft-graph/helperTypes';
import { format, parseISO } from 'date-fns';
import { DayOfWeek } from '@microsoft/microsoft-graph-types';
import { createEvent } from '@/components/microsoft-graph/createEventAction';

function addRecurrencePattern(event: OutlookEvent) {
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

export default function CreateEventButton() {
  const { currentState } = NamespacedHooks.useListen<EventSourceSimple<any>[]>(
    eventSourceEntityClass,
    KEY_TYPES.MASTER_LIST,
    'add-events-button',
    EmptyArray
  );

  const onPress = useCallback(async () => {
    const allEvents = currentState
      .flatMap((eventSource) => eventSource.events)
      .map((event) => addRecurrencePattern(event));

    const createdEvents = await Promise.all(
      allEvents.map((outgoingEvent) => createEvent(outgoingEvent))
    );
  }, [currentState]);

  return <Button onPress={onPress}>Send Events To Outlook</Button>;
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
