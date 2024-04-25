'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { CycleDto, CycleDtoSchema } from '@/app/api/dtos/CycleDtoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { postOne } from '@/app/api/generated-actions/Cycle';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { ControlledSelect } from '@/components/react-hook-form/ControlledSelect';
import { DayOfWeekArray } from '@/app/api/date-and-time';
import { SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { TransientIdOffset } from '@/app/api/main';

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
      cycleLengthInDays: 7,
      cycleSubspanGroupSizes: []
    }
  });

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CycleDto> = async (data) => {
    startTransition(async () => {
      const actionResponse = await postOne(data);
      if (actionResponse.status === 200) {
        alert(actionResponse.message);
        appRouterInstance.push('/');
      }
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
            Cycle Length in Days:
            <input
              {...register('cycleLengthInDays', { valueAsNumber: true })}
              type={'number'}
              className={
                'text-right no-spinner p-2 rounded-xl outline-primary-400 bg-default-100 text-black text-medium w-24 ml-2'
              }
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
