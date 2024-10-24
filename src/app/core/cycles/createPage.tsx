'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { ControlledSelect } from '@/components/react-hook-form/ControlledSelect';
import { DayOfWeekArray } from '@/api/date-and-time';
import { Button } from '@nextui-org/button';

import { postOne } from '@/api/generated-actions/Cycle';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { CycleDto } from '@/api/generated-types/generated-types';
import { CycleDtoSchema } from '@/api/generated-schemas/schemas_';

const dayArray = DayOfWeekArray.map((day) => ({
  name: day,
  id: day.toUpperCase()
}));

export default function CreatePage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register
  } = useForm<CycleDto>({
    resolver: zodResolver(CycleDtoSchema.partial()),
    defaultValues: {
      id: ABSOLUTE_SMALLEST_TRANSIENT_ID,
      cycleDayZero: 'MONDAY',
      cycleLengthInWeeks: 2
    }
  });

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CycleDto> = async (data) => {
    startTransition(async () => {
      const cycleDto = await postOne(data);

      appRouterInstance.push(`/cycles/edit/${cycleDto.id}/cycleSubspans`);
    });
  };

  return (
    <Card className={'mt-8 w-5/6 md:w-3/4'}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.warn(errors);
          handleSubmit(onSubmit)(event);
        }}
      >
        <CardHeader className={'items-center justify-center align-middle '}>
          Create Cycle
        </CardHeader>
        <CardBody className={'items-center justify-center gap-2'}>
          <ControlledSelect
            name={'cycleDayZero'}
            control={control}
            label={'Cycle Start Day'}
            className={'max-w-xl'}
            listboxProps={{
              classNames: {
                list: 'gap-0'
              }
            }}
            items={dayArray}
          />

          <label className={'text-sm text-default-500'}>
            Cycle Length in Weeks:
            <input
              {...register('cycleLengthInWeeks', { valueAsNumber: true })}
              type={'number'}
              className={'number-input'}
            />
          </label>
        </CardBody>
        <CardFooter className={'justify-center'}>
          <Button type={'submit'}>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
