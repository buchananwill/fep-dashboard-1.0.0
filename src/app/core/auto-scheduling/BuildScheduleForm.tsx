'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useTransition } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import { ControlledSlider } from '@/components/react-hook-form/ControlledSlider';
import { Overlay } from '@/components/overlays/overlay';
import { ScheduleParametersDto } from '@/api/generated-types/generated-types';
import { startCase } from 'lodash';
import FixedOrderMultiSelect, {
  FixedOrderSelectable
} from '@/app/core/auto-scheduling/FixedOrderMultiSelect';
import { MultiValue } from 'react-select';
import { buildScheduleAction } from '@/app/core/auto-scheduling/buildScheduleAction';
import { ScheduleParametersDtoSchema } from '@/api/generated-schemas/schemas';

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
      label: startCase(param.toLowerCase()),
      position: index
    }));
  }, [costParameters]);

  const selectedCostParameterOptions = useMemo(() => {
    return selectedCostParameters.map((param) => ({
      value: param,
      label: startCase(param.toLowerCase()),
      position: costParameters.indexOf(param)
    }));
  }, [selectedCostParameters, costParameters]);

  const handleSelectionChange = useCallback(
    (param: MultiValue<FixedOrderSelectable>) => {
      const updatedParams = param
        .toSorted((a, b) => a.position - b.position)
        .map((option) => option.value);

      setValue('costParameters', updatedParams);
    },
    [setValue]
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
    <div className={'w-96 overflow-visible'}>
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
            <ControlledSlider
              control={control}
              maxValue={60_000}
              minValue={1_000}
              step={500}
              size={'sm'}
              name={'autoBuildParametersDto.multiStepUndoTimeoutMs'}
              aria-label={'Multi-Undo Timeout'}
              hideValue={false}
              label={'Multi-Undo Timeout (ms):'}
            />
            <ControlledSlider
              control={control}
              maxValue={10}
              minValue={1}
              step={1}
              size={'sm'}
              name={'autoBuildParametersDto.multiUndoIncrement'}
              aria-label={'multi-undo increment'}
              hideValue={false}
              label={'Multi-undo increment:'}
            />
            <div
              className={
                'center-horizontal-with-margin flex w-fit flex-col py-2 text-right'
              }
            >
              <label className={'text-sm text-default-500'}>
                Save Build:
                <input
                  {...register('autoBuildParametersDto.saveBuild')}
                  type={'checkbox'}
                  className={'checkbox-input ml-2'}
                />
              </label>
              <label className={'text-sm text-default-500'}>
                Force Save Metrics:
                <input
                  {...register('autoBuildParametersDto.forceSaveMetrics')}
                  type={'checkbox'}
                  className={'checkbox-input ml-2'}
                />
              </label>
            </div>
            <FixedOrderMultiSelect
              options={costParameterOptions}
              currentOptions={selectedCostParameterOptions}
              onChange={handleSelectionChange}
            />
          </div>
          <div className={'justify-center text-center'}>
            <Button type={'submit'}>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
