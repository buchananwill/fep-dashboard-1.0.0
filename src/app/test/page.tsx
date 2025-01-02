'use client';
import { Button } from '@mantine/core';
import { testAction } from '@/app/test/test-action';

export default function Page() {
  return (
    <Button
      onClick={async () => {
        const hello = await testAction();
        console.log(hello);
      }}
    >
      Click Me
    </Button>
  );
}
