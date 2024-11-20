'use client';
import { resetSchema } from '@/api/actions-custom/schemas/migrate-schema';
import fillSandbox from '@/api/actions-custom/schemas/fill-sandbox';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@mantine/core';

export function ResetButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      color={'red'}
      onClick={() => {
        const doReset = async () => {
          const isConfirmed = confirm(
            'This will delete all data and revert to the initial sandbox template.'
          );
          if (isConfirmed) {
            resetSchema()
              .then((resettingMessage) => {
                if (resettingMessage) {
                  alert(resettingMessage);
                  redirect('/core');
                }
              })
              .catch((error) => {
                console.error('Error occurred:', error);
              });
          }
        };
        startTransition(doReset);
      }}
      loading={isPending}
    >
      Clean and re-initialize sandbox
    </Button>
  );
}
