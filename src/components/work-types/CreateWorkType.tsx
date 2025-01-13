'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Autocomplete, Button, Select } from '@mantine/core';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  KnowledgeLevelSeriesDto,
  WorkTypeCategoryDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { Api } from '@/api/clientApi';
import { HasId } from '@/api/types';
import { getNames } from '@/components/work-types/getNamesServerAction';
import { nameAccessor } from '@/functions/nameSetter';
import { useSimpleApiFetcher } from '@/components/work-types/useSimpleApiFetcher';
import { WorkTypeDtoSchema } from '@/api/generated-schemas/schemas_';
import RootCard from '@/components/generic/RootCard';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { useAutocompleteApi } from '@/hooks/select-adaptors/useAutocompleteApi';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { flattenErrors } from '@/functions/flatten-errors';
import { useQuery } from '@tanstack/react-query';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/client-literals';

const defaultWorkTypeValues = {
  id: -1,
  name: 'Planning'
};

export default function CreateWorkType({ pathVariables }: LeafComponentProps) {
  const formReturn = useForm<WorkTypeDto>({
    resolver: zodResolver(WorkTypeDtoSchema),
    defaultValues: defaultWorkTypeValues
  });
  const knowledgeDomains = useSimpleApiFetcher(Api.KnowledgeDomain.getAll);
  const knowledgeLevelSeriesDtos = useSimpleApiFetcher(
    Api.KnowledgeLevelSeries.getAll
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger
  } = formReturn;

  const klsId = watch('knowledgeLevel.knowledgeLevelSeriesId');
  const kl = watch('knowledgeLevel');
  const knowledgeDomain = watch('knowledgeDomain');
  const workTypeCategory = watch('workTypeCategory');

  const fetchKnowledgeLevels = useCallback(async () => {
    if (!klsId) return [];
    return await Api.KnowledgeLevel.getDtoListByExampleList([
      { knowledgeLevelSeriesId: klsId }
    ]);
  }, [klsId]);

  const knowledgeLevelDtos = useSimpleApiFetcher(fetchKnowledgeLevels);

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const { data: names, isFetching } = useQuery({
    queryFn: Api.WorkTypeCategory.getAll,
    queryKey: [EntityClassMap.workTypeCategory, 'all']
  });

  const klsIdList = useMemo(() => {
    return knowledgeLevelSeriesDtos.map((kls) => kls.id);
  }, [knowledgeLevelSeriesDtos]);

  const propagateKdChange = useCallback(
    (knowledgeDomain: KnowledgeDomainDto | undefined) => {
      setValue('knowledgeDomain', knowledgeDomain as KnowledgeDomainDto);
    },
    [setValue]
  );

  const autocompleteApi = useSelectAutocompleteApi({
    rawData: knowledgeDomains,
    type: 'singleFlat',
    labelMaker: nameAccessor,
    value: knowledgeDomain,
    propagateChange: propagateKdChange,
    allowUndefined: false
  });

  const updateCategory = useCallback(
    (value: WorkTypeCategoryDto | undefined) => {
      if (value) {
        setValue('workTypeCategory', value);
      }
    },
    [setValue]
  );

  const namesData = useMemo(() => {
    return names ?? (EmptyArray as WorkTypeCategoryDto[]);
  }, [names]);

  const categorySelectProps = useSelectAutocompleteApi({
    type: 'singleFlat',
    rawData: namesData,
    value: workTypeCategory,
    propagateChange: updateCategory,
    labelMaker: nameAccessor,
    allowUndefined: false
  });

  const kls = useMemo(() => {
    return knowledgeLevelSeriesDtos.find((kls) => kls.id === klsId);
  }, [knowledgeLevelSeriesDtos, klsId]);

  const updateKls = useCallback(
    (value: KnowledgeLevelSeriesDto | undefined) => {
      if (value) setValue('knowledgeLevel.knowledgeLevelSeriesId', value.id);
    },
    [setValue]
  );

  const updateKl = useCallback(
    (kl: KnowledgeLevelDto | undefined) => {
      if (kl) {
        setValue('knowledgeLevel', kl);
      }
    },
    [setValue]
  );

  const klSelectApi = useSelectApi({
    rawData: knowledgeLevelDtos,
    propagateChange: updateKl,
    type: 'singleFlat',
    value: kl?.name ? kl : undefined,
    labelMaker: nameAccessor
  });

  const klsSelectApi = useSelectApi({
    rawData: knowledgeLevelSeriesDtos,
    value: kls,
    labelMaker: nameAccessor,
    type: 'singleFlat',
    propagateChange: updateKls
  });

  const onSubmit: SubmitHandler<WorkTypeDto> = async (data) => {
    startTransition(async () => {
      const newWtt = await Api.WorkType.postOne(data); // TODO: define posting action
      // Handle post submit actions, e.g., redirect to a different page
      appRouterInstance.push(`/core/work-types`); // TODO: set WTT redirect
    });
  };

  const workTypesLayoutId = getRootCardLayoutId(pathVariables);

  useEffect(() => {
    trigger('knowledgeDomain');
  }, [knowledgeDomain, trigger]);

  useEffect(() => {
    trigger('workTypeCategory');
  }, [workTypeCategory, trigger]);

  useEffect(() => {
    setValue('knowledgeLevel', {
      knowledgeLevelSeriesId: klsId
    } as KnowledgeLevelDto);
  }, [klsId, setValue]);

  useEffect(() => {
    trigger('knowledgeLevel');
  }, [kl, trigger]);

  return (
    <RootCard layoutId={workTypesLayoutId}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.warn(errors);
          handleSubmit(onSubmit)(event);
        }}
        className={'flex flex-col items-center gap-2'}
      >
        <FormProvider {...formReturn}>
          <h1 className={'items-center justify-center align-middle '}>
            New Work Type
          </h1>
          <div className={'flex flex-col items-center justify-center gap-2'}>
            <Autocomplete
              {...categorySelectProps}
              error={errors.workTypeCategory?.message}
            />
            <Autocomplete
              label={getStartCaseDomainAlias('knowledgeDomain')}
              {...autocompleteApi}
              error={errors.knowledgeDomain?.message}
            />
            {klsSelectApi.type === 'singleFlat' && (
              <Select
                {...klsSelectApi}
                error={errors.knowledgeLevel?.knowledgeLevelSeriesId?.message}
              />
            )}
            {klSelectApi.type === 'singleFlat' && (
              <Select
                {...klSelectApi}
                error={flattenErrors(errors.knowledgeLevel)
                  .map((summary) => summary.message)
                  .shift()}
              />
            )}
          </div>
          <div className={'m-2 flex items-center justify-center gap-4'}>
            <LinkButton href={workTypesLayoutId} color={'danger'}>
              Cancel
            </LinkButton>
            <Button type={'submit'}>Submit</Button>
          </div>
        </FormProvider>
      </form>
    </RootCard>
  );
}

function idAccessor<T extends HasId>(item: T) {
  return String(item.id);
}
