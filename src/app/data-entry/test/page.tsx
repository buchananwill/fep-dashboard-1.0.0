'use client';

import { Button } from '@mantine/core';
import { testAction } from '@/app/data-entry/test/testAction';
import classes from './testButton.module.css';

export default function page() {
  return (
    <Button
      onClick={async () => {
        const result = await testAction();
        console.log(result);
      }}
      classNames={{ root: classes.gradientButton }}
    >
      Test
    </Button>
  );
}
