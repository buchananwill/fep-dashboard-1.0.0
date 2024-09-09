'use client';
import { Button } from '@nextui-org/button';
import { createEvent } from '@/components/microsoft-graph/createEventAction';

export default function CreateEventButton() {
  return (
    <Button
      onPress={async () => {
        // const response = await fetch('/api/microsoft-graph', { method: 'GET' });
        // const response2 = await readUser({});
        const event = await createEvent();
        console.log(event);
      }}
    >
      Create Event
    </Button>
  );
}
