'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import {
  AutoBuildParametersDto,
  AutoBuildParametersDtoSchema
} from '@/api/dtos/AutoBuildParametersDtoSchema';
import { ControlledSlider } from '@/components/react-hook-form/ControlledSlider';
import { buildScheduleAction } from '@/app/core/scheduling/build/buildScheduleAction';
import { Overlay } from '@/components/overlays/overlay';

export default function AutoBuildForm({
  defaultMultiStepUndoTimeout,
  defaultMultiUndoIncrement,
  disable
}: {
  defaultMultiStepUndoTimeout: number;
  defaultMultiUndoIncrement: number;
  disable?: boolean;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register
  } = useForm<AutoBuildParametersDto>({
    resolver: zodResolver(AutoBuildParametersDtoSchema),
    defaultValues: {
      multiStepUndoTimeoutMs: defaultMultiStepUndoTimeout,
      multiUndoIncrement: defaultMultiUndoIncrement,
      saveBuild: true,
      forceSaveMetrics: false
    }
  });

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<AutoBuildParametersDto> = async (data) => {
    startTransition(async () => {
      console.log('submitted', data);
      if (!disable) {
        const pendingSchedule = await buildScheduleAction(1, data);
        // Handle post submit actions, e.g., redirect to a different page
        appRouterInstance.push(`/core/scheduling/${pendingSchedule.id}`);
      } else {
        alert('Sign in to enable');
      }
    });
  };

  return (
    <Card className={'mt-8 w-64'}>
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
        <CardHeader className={'items-center justify-center align-middle '}>
          Auto Build Parameters
        </CardHeader>
        <CardBody className={'items-center justify-center gap-2'}>
          <ControlledSlider
            control={control}
            maxValue={60_000}
            minValue={1_000}
            step={500}
            size={'sm'}
            name={'multiStepUndoTimeoutMs'}
            aria-label={'Multi-Undo Timeout'}
            hideValue={false}
            label={'Multi-Undo Timeout (ms):'}
          />
          {/*{...register('multiUndoIncrement', { valueAsNumber: true })}*/}
          <ControlledSlider
            control={control}
            maxValue={10}
            minValue={1}
            step={1}
            size={'sm'}
            name={'multiUndoIncrement'}
            aria-label={'multi-undo increment'}
            hideValue={false}
            label={'Multi-undo increment:'}
          />
          <label className={'text-sm text-default-500'}>
            Save Build:
            <input
              {...register('saveBuild')}
              type={'checkbox'}
              className={'checkbox-input ml-2'}
            />
          </label>
          <label className={'text-sm text-default-500'}>
            Force Save Metrics:
            <input
              {...register('forceSaveMetrics')}
              type={'checkbox'}
              className={'checkbox-input ml-2'}
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
