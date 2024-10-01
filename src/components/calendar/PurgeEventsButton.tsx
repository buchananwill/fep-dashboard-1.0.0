'use client';
import { useCallback } from 'react';
import { getEventsAction } from '@/api/microsoft-graph/getEventsAction';
import { Button } from '@nextui-org/button';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { deleteEventsAction } from '@/api/microsoft-graph/deleteEventsAction';

export default function PurgeEventsButton() {
  const onPress = useCallback(async () => {
    const events = await getEventsAction([
      "$filter=start/dateTime ge '2024-09-09T00:00:00'",
      '$select=id',
      '$top=1000'
    ]);
    const value: OutlookEvent[] = events.value;
    const idList = value.map((event) => event.id);
    const response = await deleteEventsAction(idList as string[]);
    console.log(response); // KEEP LOG
  }, []);

  return <Button onPress={onPress}>Purge</Button>;
}
