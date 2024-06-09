'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { ControlledSelect } from '@/components/react-hook-form/ControlledSelect';
import { DayOfWeekArray } from '@/api/date-and-time';
import { SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { CycleDto, CycleDtoSchema } from '@/api/dtos/CycleDtoSchema';
import { postOne } from '@/api/generated-actions/Cycle';
import { initCycleSubspans } from '@/utils/init-database-functions/initCycleSubspans';
import { TransientIdOffset } from '@/api/literals';

const dayArray = DayOfWeekArray.map((day) => ({
  value: day.toUpperCase(),
  label: day
}));

export default function Page() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register
  } = useForm<CycleDto>({
    resolver: zodResolver(CycleDtoSchema.partial()),
    defaultValues: {
      id: TransientIdOffset,
      cycleDayZero: 'MONDAY',
      cycleLengthInDays: 14,
      cycleLengthInWeeks: 2,
      maxGroupSize: 2
    }
  });

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CycleDto> = async (data) => {
    startTransition(async () => {
      const cycleDto = await postOne(data);
      const cycleSubspans = await initCycleSubspans(cycleDto);
      console.log(cycleSubspans);
      appRouterInstance.push(`/cycles/edit/${cycleDto.id}/cycleSubspans`);
    });
  };

  return (
    <Card className={'w-5/6 md:w-3/4 mt-8'}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.log(errors);
          handleSubmit(onSubmit)(event);
        }}
      >
        <CardHeader className={'align-middle items-center justify-center '}>
          Create Cycle
        </CardHeader>
        <CardBody className={'gap-2 justify-center items-center'}>
          <ControlledSelect
            name={'cycleDayZero'}
            control={control}
            label={'Cycle Start Day'}
            className={'max-w-xl'}
          >
            {dayArray.map((day) => (
              <SelectItem key={day.value} value={day.value}>
                {day.label}
              </SelectItem>
            ))}
          </ControlledSelect>
          <label className={'text-default-500 text-sm'}>
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
