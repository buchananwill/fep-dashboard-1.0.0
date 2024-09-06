'use server';

import { auth } from '@/auth';

export const createEvent = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
    // body: JSON.stringify(event)
  });
  return response.json();
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
  transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'
};
