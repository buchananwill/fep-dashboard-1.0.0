'use client';

import classes from './testButton.module.css';

import { Button } from '@mantine/core';
import { testAction } from '@/app/data-entry/test/testAction';

export default function page() {
  return (
    <Button
      onClick={async () => {
        const result = await testAction();
        console.log(result);
      }}
      // classNames={{ root: classes.button }}
    >
      Test
    </Button>
  );
}
