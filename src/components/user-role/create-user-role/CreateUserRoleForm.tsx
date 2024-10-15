'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { DatePicker } from '@nextui-org/date-picker';
import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsolute,
  parseDate,
  ZonedDateTime
} from '@internationalized/date';
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
import { useCreateRoleProps } from '@/components/user-role/create-user-role/UseCreateRoleProps';

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
    (field: 'partyDateOfBirth', value: CalendarDate) => {
      const directToString = value.toString();
      setValue(field, directToString);
    },
    [setValue]
  );
  const setDateTimeValue = useCallback(
    (field: 'startDate' | 'thruDate', value: ZonedDateTime) => {
      const absoluteString = value.toAbsoluteString();
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
  const modalProps = useCreateRoleProps(
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
          <DatePicker
            name={'startDate'}
            aria-label={'Start Date'}
            label={'Start Date'}
            value={parseAbsolute(startDate, getLocalTimeZone())}
            onChange={(value) => setDateTimeValue('startDate', value)}
          />
          <DatePicker
            name={'partyDateOfBirth'}
            aria-label={'Date of Birth'}
            label={'Date of Birth'}
            value={parseDate(partyDateOfBirth)}
            onChange={(value) => setDateValue('partyDateOfBirth', value)}
          />
          <ControlledSelector<number, KnowledgeLevelSeriesDto>
            labelPath={'name'}
            entityId={knowledgeLevelSeriesId ?? NaN}
            entityClass={EntityClassMap.knowledgeLevelSeries}
            selectionCallback={knowledgeLevelSeriesSelectionCallback}
            isInvalid={!!errors.knowledgeLevelSeriesId}
            errorMessage={'Required'}
          />
          <ControlledSelector<number, UserRoleTypeDto>
            labelPath={'name'}
            entityId={userRoleType.id}
            entityClass={EntityClassMap.userRoleType}
            selectionCallback={userRoleTypeSelectionCallback}
            isInvalid={!!errors.userRoleType}
            errorMessage={'Required'}
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
        <Button onPress={() => modalProps.onOpenChange(true)}>
          Add Role Type
        </Button>
      </div>
      <CreateNewRoleTypeModal {...modalProps} />
    </FormProvider>
  );
}
