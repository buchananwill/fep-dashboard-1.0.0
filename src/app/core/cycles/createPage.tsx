'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { DayOfWeekArray } from '@/api/date-and-time';
import { Button, NumberInput, Select } from '@mantine/core';

import { postOne } from '@/api/generated-actions/Cycle';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { CycleDto } from '@/api/generated-types/generated-types';
import { CycleDtoSchema } from '@/api/generated-schemas/schemas_';
import RootCard from '@/components/generic/RootCard';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { isNumber, startCase } from 'lodash';

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
          <Controller
            name={'cycleDayZero'}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  label={'Cycle Start Day'}
                  allowDeselect={false}
                  data={DayOfWeekArray}
                  value={startCase(field.value.toLowerCase())}
                  onChange={(value) => {
                    if (value) {
                      field.onChange(value.toUpperCase());
                    }
                  }}
                />
              );
            }}
          />

          <Controller
            name={'cycleLengthInWeeks'}
            control={control}
            render={({ field }) => (
              <NumberInput
                clampBehavior={'strict'}
                label={'Cycle Length in Weeks'}
                min={1}
                max={52}
                value={field.value}
                onBlur={(blurAction) => {
                  blurAction.currentTarget.value = String(field.value);
                }}
                onChange={(value) =>
                  field.onChange(isNumber(value) && value > 0 ? value : 1)
                }
              />
            )}
          />

          <Button type={'submit'}>Submit</Button>
        </form>
      </RootCard>
    </div>
  );
}
