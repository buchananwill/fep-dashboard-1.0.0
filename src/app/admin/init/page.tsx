'use client';
import { Button, Card } from '@mantine/core';
import { useState, useTransition } from 'react';
import { initDefaultTypes } from '@/utils/init-database-functions/initDefaultTypes';

export default function Page() {
  const [promiseResult, setPromiseResult] = useState<any>();
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <div>
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              const promise = await initDefaultTypes();
              setPromiseResult(promise);
            });
          }}
        >
          Begin
        </Button>
      </div>
      <div>
        {promiseResult &&
          promiseResult.map((jsonItem: any) => JSON.stringify(jsonItem))}
      </div>
    </Card>
  );
}
