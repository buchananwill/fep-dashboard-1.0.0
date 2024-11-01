'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@mantine/core';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { z as zod } from 'zod';
import { UserRoleDtoSchema } from '@/api/generated-schemas/schemas_';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  KnowledgeLevelSeriesDto,
  UserRoleDto,
  UserRoleTypeDto
} from '@/api/generated-types/generated-types';
import CreateNewRoleTypeModal from '@/components/entities-with-type/CreateNewRoleTypeModal';
import { Api } from '@/api/clientApi';
import { useCreateTypeProps } from '@/components/user-role/create-user-role/UseCreateTypeProps';
import { DatePickerInput, DateValue } from '@mantine/dates';

function splitAndJoinNameHack(data: UserRoleDto) {
  const fixName = { ...data };
  fixName.partyName = fixName.partyName.split(' ').join(', ');
  return fixName;
}

export default function CreateUserRoleForm({
  createUserRoleAction,
  redirectUrl,
  defaultValues
}: {
  createUserRoleAction?: (
    userRole: zod.infer<typeof UserRoleDtoSchema>
  ) => Promise<any>;
  redirectUrl: string;
  defaultValues: UserRoleDto;
}) {
  const formReturn = useForm<UserRoleDto>({
    resolver: zodResolver(UserRoleDtoSchema),
    defaultValues: defaultValues
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger
  } = formReturn;

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();
  const startDate = watch('startDate');
  const thruDate = watch('thruDate');
  const partyDateOfBirth = watch('partyDateOfBirth');
  const knowledgeLevelSeriesId = watch('knowledgeLevelSeriesId');
  const userRoleType = watch('userRoleType');

  const setDateValue = useCallback(
    (field: 'partyDateOfBirth', value: DateValue) => {
      const directToString = value?.toISOString();
      if (directToString) setValue(field, directToString);
    },
    [setValue]
  );
  const setDateTimeValue = useCallback(
    (field: 'startDate' | 'thruDate', value: DateValue) => {
      const absoluteString = value?.toISOString();
      setValue(field, absoluteString);
    },
    [setValue]
  );

  const knowledgeLevelSeriesSelectionCallback = useCallback(
    (knowledgeLevelSeries: KnowledgeLevelSeriesDto | undefined) => {
      if (knowledgeLevelSeries) {
        setValue('knowledgeLevelSeriesId', knowledgeLevelSeries.id);
        setValue('knowledgeLevelSeriesName', knowledgeLevelSeries.name);
      } else {
        setValue('knowledgeLevelSeriesName', '');
        setValue('knowledgeLevelSeriesId', NaN);
      }
      trigger('knowledgeLevelSeriesId');
    },
    [setValue, trigger]
  );

  const userRoleTypeSelectionCallback = useCallback(
    (userRoleType: UserRoleTypeDto | undefined) => {
      if (userRoleType) setValue('userRoleType', userRoleType);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<zod.infer<typeof UserRoleDtoSchema>> = async (
    data
  ) => {
    startTransition(async () => {
      if (createUserRoleAction) {
        const fixName = splitAndJoinNameHack(data); // this is necessary because currently the backend splits user party names on ','
        await createUserRoleAction(fixName);
        appRouterInstance.push(redirectUrl);
      } else {
        console.error('No submission action supplied');
      }
    });
  };
  const modalProps = useCreateTypeProps(
    Api.UserRoleType.postOne,
    EntityClassMap.userRoleType
  );

  return (
    <FormProvider {...formReturn}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.error(errors);
          handleSubmit(onSubmit)(event);
        }}
        autoComplete={'on'}
      >
        <div className={'flex flex-col gap-2 p-4'}>
          <ControlledInput
            name={'partyName'}
            aria-label={'Name'}
            label={'Name'}
            placeholder={'Enter name'}
            autoComplete={'on'}
          />
          <DatePickerInput
            name={'startDate'}
            aria-label={'Start Date'}
            label={'Start Date'}
            value={new Date(startDate)}
            onChange={(value) => setDateTimeValue('startDate', value)}
          />
          <DatePickerInput
            name={'partyDateOfBirth'}
            aria-label={'Date of Birth'}
            label={'Date of Birth'}
            value={new Date(partyDateOfBirth)}
            onChange={(value) => setDateValue('partyDateOfBirth', value)}
          />
          <ControlledSelector<number, KnowledgeLevelSeriesDto>
            labelPath={'name'}
            entityId={knowledgeLevelSeriesId ?? NaN}
            entityClass={EntityClassMap.knowledgeLevelSeries}
            selectionCallback={knowledgeLevelSeriesSelectionCallback}
            error={errors.knowledgeLevelSeriesId ? 'Required' : undefined}
          />
          <ControlledSelector<number, UserRoleTypeDto>
            labelPath={'name'}
            entityId={userRoleType.id}
            entityClass={EntityClassMap.userRoleType}
            selectionCallback={userRoleTypeSelectionCallback}
            error={errors.userRoleType ? 'Required' : undefined}
          />

          <div className={'center-horizontal-with-margin'}>
            <Button type={'submit'}>Submit</Button>
          </div>
        </div>
      </form>
      <div
        className={'center-horizontal-with-margin mb-4 w-[90%] border-1'}
      ></div>
      <div className={'center-horizontal-with-margin'}>
        <Button onClick={modalProps.onOpen}>Add Role Type</Button>
      </div>
      <CreateNewRoleTypeModal {...modalProps} />
    </FormProvider>
  );
}
