'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useTransition } from 'react';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { ControlledSelect } from '@/components/react-hook-form/ControlledSelect';
import { HasId } from '@/api/types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { ControlledAutoComplete } from '../react-hook-form/ControlledAutoComplete';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import { nameAccessor } from '@/functions/nameSetter';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';
import { useNestedAutoCompleteChangeHandler } from '@/components/work-task-types/useNestedAutoCompleteChangeHandler';
import { useNestedSelectChangeHandler } from '@/components/work-task-types/useNestedSelectChangeHandler';
import { WorkTaskTypeDtoSchema } from '@/api/generated-schemas/schemas';
import RootCard from '@/app/core/navigation/RootCard';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

const defaultWorkTaskTypeValues = {
  id: -1,
  name: 'Planning'
};

export default function CreateWorkTaskType({
  pathVariables
}: LeafComponentProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<WorkTaskTypeDto>({
    resolver: zodResolver(WorkTaskTypeDtoSchema),
    defaultValues: defaultWorkTaskTypeValues
  });
  const knowledgeDomains = useSimpleApiFetcher(Api.KnowledgeDomain.getAll);
  const knowledgeLevelSeriesDtos = useSimpleApiFetcher(
    Api.KnowledgeLevelSeries.getAll
  );

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
        <CardHeader className={'items-center justify-center align-middle '}>
          New Work Task Type
        </CardHeader>
        <CardBody className={'items-center justify-center gap-2'}>
          <ControlledAutoComplete
            name={'name'}
            allowsCustomValue={true}
            control={control}
            items={names}
            aria-label={'Work Task Type Name'}
            defaultInputValue={defaultWorkTaskTypeValues.name}
            itemAccessors={{
              labelAccessor: 'name',
              keyAccessor: 'name',
              valueAccessor: 'name'
            }}
          />
          <ControlledAutoComplete
            name={'knowledgeDomain'}
            control={control}
            selectedKeyAccessor={'id'}
            aria-label={'knowledge domain'}
            onChange={onKnowledgeDomainSelectChange}
            items={knowledgeDomains}
          />

          <ControlledSelect
            name={'knowledgeLevelSeriesId'}
            aria-label={'knowledge Level Series Id'}
            control={control}
            items={knowledgeLevelSeriesDtos}
            onChange={knowledgeLevelSeriesChangeHandler}
          />
          <ControlledSelect
            name={'knowledgeLevel'}
            selectedKeyAccessor={'id'}
            aria-label={'knowledge Level'}
            control={control}
            items={knowledgeLevelDtos}
            onChange={knowledgeLevelChangeHandler}
            isDisabled={knowledgeLevelDtos.length === 0}
            placeholder={`Choose a ${getDomainAlias('knowledgeLevel')}`}
          />
        </CardBody>
        <CardFooter className={'justify-center gap-2'}>
          <LinkButton href={workTaskTypesLayoutId} color={'danger'}>
            Cancel
          </LinkButton>
          <Button type={'submit'} color={'success'}>
            Submit
          </Button>
        </CardFooter>
      </form>
    </RootCard>
  );
}

function idAccessor<T extends HasId>(item: T) {
  return String(item.id);
}
