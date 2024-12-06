'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button, Checkbox } from '@mantine/core';
import { ControlledSlider } from '@/components/react-hook-form/ControlledSlider';
import { Overlay } from '@/components/overlays/overlay';
import { ScheduleParametersDto } from '@/api/generated-types/generated-types_';
import { startCase } from 'lodash';
import { buildScheduleAction } from '@/app/core/auto-scheduling/buildScheduleAction';
import { ScheduleParametersDtoSchema } from '@/api/generated-schemas/schemas_';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/combo-boxes/MultiSelectMaxDisplayedItems';

export default function AutoBuildForm({
  defaultMultiStepUndoTimeout,
  defaultMultiUndoIncrement,
  disable,
  costParameters
}: {
  defaultMultiStepUndoTimeout: number;
  defaultMultiUndoIncrement: number;
  disable?: boolean;
  costParameters: string[];
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
    setValue
  } = useForm<ScheduleParametersDto>({
    resolver: zodResolver(ScheduleParametersDtoSchema),
    defaultValues: {
      autoBuildParametersDto: {
        multiStepUndoTimeoutMs: defaultMultiStepUndoTimeout,
        multiUndoIncrement: defaultMultiUndoIncrement,
        saveBuild: true,
        forceSaveMetrics: false
      },
      costParameters: costParameters
    }
  });

  // Watch the current values of the costParameters field
  const selectedCostParameters = watch('costParameters');

  const costParameterOptions = useMemo(() => {
    return costParameters.map((param, index) => ({
      value: param,
      label: startCase(param.toLowerCase())
      // position: index
    }));
  }, [costParameters]);

  const handleSelectionChange = useCallback(
    (param: string[]) => {
      const updatedParams = param
        .toSorted(
          (a, b) => costParameters.indexOf(a) - costParameters.indexOf(b)
        )
        .map((option) => option);

      setValue('costParameters', updatedParams);
    },
    [setValue, costParameters]
  );

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ScheduleParametersDto> = async (data) => {
    startTransition(async () => {
      if (!disable) {
        const pendingSchedule = await buildScheduleAction(1, data);
        // Handle post submit actions, e.g., redirect to a different page
        appRouterInstance.push(`/core/schedules/${pendingSchedule.id}`);
      } else {
        alert('Sign in to enable');
      }
    });
  };

  return (
    <div className={'w-96 overflow-visible p-2'}>
      {disable && (
        <Overlay>
          <div className={'rounded-lg bg-white p-2'}>Sign in to Enable</div>
        </Overlay>
      )}
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.warn(errors);
          handleSubmit(onSubmit)(event);
        }}
      >
        <div className={'flex flex-col gap-2'}>
          <h1 className={'items-center justify-center align-middle '}>
            Auto Build Parameters
          </h1>
          <div className={'items-center justify-center gap-2 overflow-visible'}>
            <label htmlFor={'autoBuildParametersDto.multiStepUndoTimeoutMs'}>
              {startCase('multiStepUndoTimeout')}
            </label>
            <ControlledSlider
              control={control}
              max={60_000}
              min={1_000}
              step={500}
              size={'lg'}
              showText={false}
              name={'autoBuildParametersDto.multiStepUndoTimeoutMs'}
              aria-label={'Multi-Undo Timeout'}
              label={(value) => `${(value / 1000).toFixed(1)}s`}
            />
            <ControlledSlider
              control={control}
              max={10}
              min={1}
              step={1}
              size={'lg'}
              name={'autoBuildParametersDto.multiUndoIncrement'}
              aria-label={'multi-undo increment'}
              label={(value) => `${value}`}
            />
            <div
              className={
                'center-horizontal-with-margin flex w-fit flex-col gap-1 py-2 text-right'
              }
            >
              <Checkbox
                {...register('autoBuildParametersDto.saveBuild')}
                label={'Save Build'}
                className={'checkbox-input ml-2'}
              />
              <Checkbox
                {...register('autoBuildParametersDto.forceSaveMetrics')}
                label={'Force Save Metrics'}
                className={'checkbox-input ml-2'}
              />
            </div>
            <MultiSelectMaxDisplayedItems
              data={costParameterOptions}
              onChange={handleSelectionChange}
              value={selectedCostParameters}
            />
          </div>
          <div className={'justify-center text-center'}>
            <Button type={'submit'} disabled={disable}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
