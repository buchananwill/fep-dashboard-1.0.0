'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { ControlledSelect } from '@/components/react-hook-form/ControlledSelect';
import { DayOfWeekArray } from '@/api/date-and-time';
import { Button } from '@mantine/core';

import { postOne } from '@/api/generated-actions/Cycle';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { CycleDto } from '@/api/generated-types/generated-types';
import { CycleDtoSchema } from '@/api/generated-schemas/schemas_';
import RootCard from '@/components/generic/RootCard';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

const dayArray = DayOfWeekArray.map((day) => ({
  name: day,
  id: day.toUpperCase()
}));

export default function CreatePage({ pathVariables }: LeafComponentProps) {
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
    <div className={'p-4'}>
      <RootCard
        layoutId={getRootCardLayoutId(pathVariables)}
        displayHeader={<h1 className={'p-2 text-center'}>Create Cycle</h1>}
      >
        <PendingOverlay pending={pending} />
        <form
          onSubmit={(event) => {
            console.warn(errors);
            handleSubmit(onSubmit)(event);
          }}
          className={'flex flex-col gap-2 p-2'}
        >
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

          <Button type={'submit'}>Submit</Button>
        </form>
      </RootCard>
    </div>
  );
}
