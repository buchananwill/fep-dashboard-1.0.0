'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button, Center } from '@mantine/core';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types_';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { KnowledgeLevelSeriesDtoSchema } from '@/api/generated-schemas/schemas_';
import classes from './knowledgeLevelSeries.module.css';

const defaultKlsValues: KnowledgeLevelSeriesDto = {
  id: -1,
  name: 'Grade Series',
  knowledgeLevelDescriptor: 'Grade',
  knowledgeLevels: []
};

export default function CreateKnowledgeLevelSeriesForm({
  createKlsAction,
  redirectUrl
}: {
  createKlsAction?: (
    knowledgeLevelSeriesDto: KnowledgeLevelSeriesDto
  ) => Promise<KnowledgeLevelSeriesDto>;
  redirectUrl: string;
}) {
  const formReturn = useForm<KnowledgeLevelSeriesDto>({
    resolver: zodResolver(KnowledgeLevelSeriesDtoSchema),
    defaultValues: defaultKlsValues
  });

  const {
    handleSubmit,
    formState: { errors }
  } = formReturn;

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<KnowledgeLevelSeriesDto> = async (data) => {
    startTransition(async () => {
      if (createKlsAction) {
        await createKlsAction(data);
        // Handle post-submit actions, e.g., redirect to a different page
        appRouterInstance.push(redirectUrl);
      } else {
        console.error('No submission action supplied');
      }
    });
  };

  return (
    <>
      <PendingOverlay pending={pending} />
      <FormProvider {...formReturn}>
        <form
          onSubmit={(event) => {
            console.warn(errors);
            handleSubmit(onSubmit)(event);
          }}
          autoComplete={'on'}
          className={classes.createSeriesForm}
        >
          <div className={'items-center justify-center gap-2'}>
            <ControlledInput<KnowledgeLevelSeriesDto>
              name={'name'}
              aria-label={'Name'}
              label={'Name'}
              placeholder={'Enter name'}
              autoComplete={'on'}
            />
            <ControlledInput<KnowledgeLevelSeriesDto>
              name={'knowledgeLevelDescriptor'}
              aria-label={'knowledge level descriptor'}
              label={'Knowledge Level Descriptor'}
              placeholder={'Enter descriptor'}
              autoComplete={'on'}
            />
          </div>
          <Center>
            <Button type={'submit'}>Submit</Button>
          </Center>
        </form>
      </FormProvider>
    </>
  );
}
