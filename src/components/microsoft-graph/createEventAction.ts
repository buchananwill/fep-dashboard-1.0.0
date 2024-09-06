'use server';

import { graphClient } from '@/components/microsoft-graph/graphClient';
import { auth } from '@/auth';

export const readUser = async (req: any) => {
  return await graphClient.api(`/users`).top(1).get();
};
export const createEvent = async () => {
  const userId = '4e1a7c2c-7365-45c7-9d3c-84671ceacb3b';
  try {
    const events = await graphClient
      .api(`/users/${userId}/calendar/events`)
      .get();

    console.log('User Events:', events);
    return events;
  } catch (error) {
    if (error.response) {
      // Inspect the actual error response from the Graph API
      console.error('Error Response:', error.response);
    } else {
      // Handle errors in the client library itself
      console.error('Graph Client Error:', error);
    }
  }
};

const event = {
  subject: "Let's go for lunch",
  body: {
    contentType: 'HTML',
    content: 'Does mid month work for you?'
  },
  start: {
    dateTime: '2019-03-15T12:00:00',
    timeZone: 'Pacific Standard Time'
  },
  end: {
    dateTime: '2019-03-15T14:00:00',
    timeZone: 'Pacific Standard Time'
  },
  location: {
    displayName: "Harry's Bar"
  },
  attendees: [
    {
      emailAddress: {
        address: 'adelev@contoso.com',
        name: 'Adele Vance'
      },
      type: 'required'
    }
  ],
  transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'
};
