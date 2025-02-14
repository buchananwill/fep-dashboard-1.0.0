'use client';
import { Button } from '@mantine/core';
import { NamespacedHooks } from 'dto-stores';
import { eventSourceEntityClass } from '@/components/calendar/CalendarWithShowHideSources';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { useCallback } from 'react';
import { createEvent } from '@/api/microsoft-graph/createEventAction';
import { addRecurrencePattern } from '@/functions/addRecurrencePattern';

export default function CreateEventButton() {
  const { currentState } = NamespacedHooks.useListen<EventSourceSimple<any>[]>(
    eventSourceEntityClass,
    KEY_TYPES.MASTER_LIST,
    'add-events-button',
    EmptyArray
  );

  const onClick = useCallback(async () => {
    const allEvents = currentState
      .flatMap((eventSource) => eventSource.events)
      .map((event) => addRecurrencePattern(event));

    const createdEvents = await Promise.all(
      allEvents.map((outgoingEvent) => createEvent(outgoingEvent))
    );
  }, [currentState]);

  return <Button onClick={onClick}>Send Events To Outlook</Button>;
}
