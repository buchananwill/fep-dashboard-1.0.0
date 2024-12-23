'use client';

import { Button } from '@mantine/core';
import { submitWorkPlanRequest } from '@/app/data-entry/test/submitWorkPlanRequest';
import classes from './testButton.module.css';

export default function page() {
  return (
    <Button
      onClick={async () => {
        const result = await submitWorkPlanRequest();
        console.log(result);
      }}
      classNames={{ root: classes.gradientButton }}
    >
      Test
    </Button>
  );
}
