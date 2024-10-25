'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@mantine/core';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { Api } from '@/api/clientApi_';
import { HasId } from '@/api/types';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import { nameAccessor } from '@/functions/nameSetter';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';
import { useNestedAutoCompleteChangeHandler } from '@/components/work-task-types/useNestedAutoCompleteChangeHandler';
import { useNestedSelectChangeHandler } from '@/components/work-task-types/useNestedSelectChangeHandler';
import { WorkTaskTypeDtoSchema } from '@/api/generated-schemas/schemas_';
import RootCard from '@/components/generic/RootCard';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

const defaultWorkTaskTypeValues = {
  id: -1,
  name: 'Planning'
};

export default function CreateWorkTaskType({
  pathVariables
}: LeafComponentProps) {
  const formReturn = useForm<WorkTaskTypeDto>({
    resolver: zodResolver(WorkTaskTypeDtoSchema),
    defaultValues: defaultWorkTaskTypeValues
  });
  const knowledgeDomains = useSimpleApiFetcher(Api.KnowledgeDomain.getAll);
  const knowledgeLevelSeriesDtos = useSimpleApiFetcher(
    Api.KnowledgeLevelSeries.getAll
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = formReturn;

  const klsId = watch('knowledgeLevelSeriesId');

  const fetchKnowledgeLevels = useCallback(async () => {
    if (!klsId) return [];
    return await Api.KnowledgeLevel.getDtoListByExampleList([
      { knowledgeLevelSeriesId: klsId }
    ]);
  }, [klsId]);

  const knowledgeLevelDtos = useSimpleApiFetcher(fetchKnowledgeLevels);

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const names = useSimpleApiFetcher(getNames);

  const klsIdList = useMemo(() => {
    return knowledgeLevelSeriesDtos.map((kls) => kls.id);
  }, [knowledgeLevelSeriesDtos]);

  const onKnowledgeDomainSelectChange = useNestedAutoCompleteChangeHandler(
    knowledgeDomains,
    nameAccessor
  );

  const knowledgeLevelChangeHandler = useNestedSelectChangeHandler(
    knowledgeLevelDtos,
    idAccessor
  );

  const knowledgeLevelSeriesChangeHandler = useNestedSelectChangeHandler(
    klsIdList,
    String
  );

  const onSubmit: SubmitHandler<WorkTaskTypeDto> = async (data) => {
    startTransition(async () => {
      const newWtt = await Api.WorkTaskType.postOne(data); // TODO: define posting action
      // Handle post submit actions, e.g., redirect to a different page
      appRouterInstance.push(`/core/work-task-types`); // TODO: set WTT redirect
    });
  };

  const workTaskTypesLayoutId = getRootCardLayoutId(pathVariables);

  return (
    <RootCard layoutId={workTaskTypesLayoutId}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.warn(errors);
          handleSubmit(onSubmit)(event);
        }}
      >
        <FormProvider {...formReturn}>
          <h1 className={'items-center justify-center align-middle '}>
            New Work Task Type
          </h1>
          <div className={'items-center justify-center gap-2'}>
            {/*
            AutoComplete: WorkTaskTypeName
            AutoComplete: KnowledgeDomain
            Select: KLS
            Select: KL
            */}
          </div>
          <div className={'justify-center gap-2'}>
            <LinkButton href={workTaskTypesLayoutId} color={'danger'}>
              Cancel
            </LinkButton>
            <Button type={'submit'} color={'success'}>
              Submit
            </Button>
          </div>
        </FormProvider>
      </form>
    </RootCard>
  );
}

function idAccessor<T extends HasId>(item: T) {
  return String(item.id);
}
