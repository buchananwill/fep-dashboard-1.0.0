import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import { useCallback } from 'react';
import { EventImpl } from '@fullcalendar/core/internal';
import { produce } from 'immer';
import { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { EventDropArg } from '@fullcalendar/core';
import { addHours } from 'date-fns';
import { NullableOption } from '@microsoft/microsoft-graph-types';
import { DateAndTimeAndZoneDto } from '@/api/generated-types/generated-types';

export const EditableEvents = 'editable-events';

export function useEditableEvents() {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatch } = useGlobalController<OutlookEvent[]>({
    contextKey: EditableEvents,
    listenerKey,
    initialValue: EmptyArray
  });

  const editEvent = useCallback(
    (editedEvent: EventImpl) => {
      dispatch((events) =>
        events.map((event) => {
          if (event.id !== editedEvent.id) {
            console.log('ignoring');
            return event;
          } else {
            console.log('editing');
            let response = event;
            const { start, end } = editedEvent;
            console.log(start, end);
            if (start) {
              response = produce(response, (draft) => {
                draft.start = toDateAndTimeAndZoneDto(start);
              });
            }
            if (end) {
              response = produce(response, (draft) => {
                draft.end = toDateAndTimeAndZoneDto(end);
              });
            }
            return response;
          }
        })
      );
    },
    [dispatch]
  );

  const eventResize = useCallback(
    (eventUpdate: EventResizeDoneArg) => {
      console.log(eventUpdate.event, eventUpdate.oldEvent);
      editEvent(eventUpdate.event);
    },
    [editEvent]
  );

  const eventDrop = useCallback(
    (droppedEvent: EventDropArg) => {
      const { event, oldEvent } = droppedEvent;
      console.log(oldEvent, event);
      editEvent(event);
    },
    [editEvent]
  );
  const dateClick = useCallback(
    (info: DateClickArg) => {
      dispatch((events) => [
        ...events,
        createEvent(
          new Date(info.dateStr),
          addHours(new Date(info.dateStr), 1),
          'availability-calendar'
        )
      ]);
    },
    [dispatch]
  );
  return { currentState, eventResize, eventDrop, dateClick };
}

function toDateAndTimeAndZoneDto(startTime: Date): DateAndTimeAndZoneDto {
  return {
    date: startTime.toISOString().split('T')[0],
    dateTime: startTime.toISOString(),
    timeZone: getTimeZone(startTime) ?? ''
  };
}

function createEvent(
  startTime: Date,
  endTime: Date,
  calendarId: string
): OutlookEvent {
  return {
    id: crypto.randomUUID(),
    subject: 'New Event',
    createdDateTime: new Date(Date.now()).toISOString(),
    start: toDateAndTimeAndZoneDto(startTime),
    end: toDateAndTimeAndZoneDto(endTime)
  };
}

function getTimeZone(date: Date): NullableOption<string> {
  const zone = Intl.DateTimeFormat('en-GB', { timeZoneName: 'short' })
    .format(date)
    .split(', ')
    .pop();
  return zone === undefined ? null : zone;
}