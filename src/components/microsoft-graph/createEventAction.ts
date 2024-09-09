'use server';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { MICROSOFT_GRAPH_DELEGATED } from '@/api/literals';
import { OutlookEvent } from '@/components/microsoft-graph/helperTypes';

interface SessionWithAccessToken extends Session {
  accessToken?: string;
}

export const createEvent = async () => {
  const session = (await auth()) as SessionWithAccessToken;
  const accessToken = session?.accessToken;

  const response = await fetch(
    `${MICROSOFT_GRAPH_DELEGATED}/events?startdatetime=2024-09-09T09:47:00.110Z&enddatetime=2024-09-23T09:47:00.110Z`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
        // 'Content-Type': 'application/json'
      }
      // body: JSON.stringify(event)
    }
  );
  return response.json();
};

const event: OutlookEvent = {
  subject: 'Drum Kit',
  body: {
    contentType: 'html',
    content: 'Jane Doe'
  },
  start: {
    dateTime: '2024-09-09T13:00:00',
    timeZone: 'Europe/London'
  },
  end: {
    dateTime: '2024-09-09T13:45:00',
    timeZone: 'Europe/London'
  },
  location: {
    displayName: 'Studio 3a'
  },
  recurrence: {
    pattern: {
      type: 'weekly',
      interval: 1,
      month: 0,
      dayOfMonth: 0,
      daysOfWeek: ['monday'],
      firstDayOfWeek: 'monday',
      index: 'first'
    },
    range: {
      type: 'endDate',
      startDate: '2024-09-09',
      endDate: '2025-03-03',
      recurrenceTimeZone: 'GMT Standard Time',
      numberOfOccurrences: 0
    }
  }
};
