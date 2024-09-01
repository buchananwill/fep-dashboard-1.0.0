'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useMemo, useTransition } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Overlay } from '@/components/overlays/overlay';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import {
  KnowledgeDomainDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import { WorkTaskTypeDtoSchema } from '@/api/zod-schemas/WorkTaskTypeDtoSchema';
import { FormElementMap } from '@/components/react-hook-form/ControlledFormElement';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import {
  ControlledSelect,
  ItemAccessors
} from '@/components/react-hook-form/ControlledSelect';
import { HasId } from '@/api/types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { ControlledAutoComplete } from '../react-hook-form/ControlledAutoComplete';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import { nameAccessor } from '@/components/modals/nameSetter';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';

const disable = false;

type ControlledFormElement = HTMLSelectElement | HTMLInputElement;

function useNestedSelectChangeHandler<T>(
  nestedPropertyOptions: T[],
  valueAccessor: (item: T) => string
) {
  return useCallback(
    (
      event: ChangeEvent<HTMLSelectElement>,
      onChange: (...event: any[]) => void
    ) => {
      const updatedElement = nestedPropertyOptions.find(
        (kdItem) => valueAccessor(kdItem) === event.target.value
      );
      console.log(event, updatedElement);
      onChange(updatedElement);
    },
    [nestedPropertyOptions]
  );
}
function useNestedAutoCompleteChangeHandler<T extends HasId>(
  nestedPropertyOptions: T[],
  labelAccessor: (item: T) => string
) {
  return useCallback(
    (
      selectionKey: React.Key | null,
      onChange: (...event: any[]) => void,
      setInputValue: (value: string) => void
    ) => {
      const updatedElement = nestedPropertyOptions.find(
        (kdItem) => String(kdItem.id) === selectionKey
      );
      console.log(selectionKey, updatedElement);
      onChange(updatedElement);
      setInputValue(updatedElement ? labelAccessor(updatedElement) : '');
    },
    [nestedPropertyOptions]
  );
}

const defaultWorkTaskTypeValues = {
  id: -1,
  name: 'Planning'
};
export default function CreateWorkTaskType({}: LeafComponentProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
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
      console.log('submitted', data);
      if (!disable) {
        const newWtt = await Api.WorkTaskType.postOne(data); // TODO: define posting action
        // Handle post submit actions, e.g., redirect to a different page
        appRouterInstance.push(`/core/work-task-types/create`); // TODO: set WTT redirect
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
        <CardFooter className={'justify-center'}>
          <Button type={'submit'}>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

const WorkTaskTypeFormMap: FormElementMap<WorkTaskTypeDto> = {
  name: 'Select',
  knowledgeDomain: 'Select',
  knowledgeLevelSeriesId: 'Select',
  knowledgeLevel: 'Select'
};

export type OptionMap<T> = {
  [Property in keyof T]: T[Property][];
};

const knowledgeDomainAccessors: ItemAccessors<KnowledgeDomainDto> = {
  keyAccessor: 'id',
  labelAccessor: 'name',
  valueAccessor: 'id'
};

function idAccessor<T extends HasId>(item: T) {
  return String(item.id);
}
