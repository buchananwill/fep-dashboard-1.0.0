'use client';
import { Button } from '@nextui-org/button';
import { useState, useTransition } from 'react';
import { initDefaultTypes } from '@/utils/init-database-functions/initDefaultTypes';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

export default function Page() {
  const [promiseResult, setPromiseResult] = useState<any>();
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <Button
          isDisabled={isPending}
          onPress={async () => {
            startTransition(async () => {
              const promise = await initDefaultTypes();
              console.log(promise);
              setPromiseResult(promise);
            });
          }}
        >
          Begin
        </Button>
      </CardHeader>
      <CardBody>
        {promiseResult &&
          promiseResult.map((jsonItem: any) => JSON.stringify(jsonItem))}
      </CardBody>
    </Card>
  );
}
