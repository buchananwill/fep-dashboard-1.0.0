'use server';
import { auth } from '@/auth';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { SessionWithAccessToken } from '@/api/microsoft-graph/sessionWithAccessToken';
import { MICROSOFT_GRAPH_DELEGATED } from '@/api/server-literals';

export const createEvent = async (event: OutlookEvent) => {
  const session = (await auth()) as SessionWithAccessToken;
  const accessToken = session?.accessToken;
  let response = new Response();
  if (session && accessToken) {
    response = await fetch(`${MICROSOFT_GRAPH_DELEGATED}/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
  }

  return response.json();
};

const testEvent: OutlookEvent = {
  subject: 'Drum Kit',
  body: {
    contentType: 'html',
    content: 'Jane Doe'
  },
  start: {
    dateTime: '2024-09-09T13:00:00:00',
    timeZone: 'Europe/London'
  },
  end: {
    dateTime: '2024-09-09T13:45:00',
    timeZone: 'Europe/London'
  },
  location: {
    displayName: 'Studio 3a'
  }
};
