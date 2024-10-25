'use client';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import { RoleEntity } from '@/components/roles/types';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  RolePostRequest
} from '@/api/generated-types/generated-types';
import { FieldName, SubmitHandler, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button, Card, Divider, ScrollArea } from '@mantine/core';
import { PersonNestedInForm } from '@/components/roles/create-role/PersonNestedInForm';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorDiv } from '@/components/roles/create-role/ErrorDiv';
import { RoleAspectSelectors } from '@/components/roles/create-role/RoleAspectSelectors';
import { useRoleTypeAndTaskTypeSelections } from '@/components/roles/create-role/useRoleTypeAndTaskTypeSelections';
import { useCompileSuitabilityRequests } from '@/components/roles/create-role/useCompileSuitabilityRequests';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { AssetNestedInForm } from '@/components/roles/create-role/AssetNestedInForm';
import { FieldValues } from 'react-hook-form/dist/types';
import CreateNewRoleTypeModal from '@/components/entities-with-type/CreateNewRoleTypeModal';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCreateTypeProps } from '@/components/user-role/create-user-role/UseCreateTypeProps';
import { Api } from '@/api/clientApi';
import { flattenErrors } from '@/functions/flatten-errors';

export const listenerKey = 'create-role-form';

export interface RoleFormProps<T extends FieldValues> {
  roleEntity: RoleEntity;
  knowledgeDomainDtos: KnowledgeDomainDto[];
  knowledgeLevels: KnowledgeLevelDto[];
  createRoleAction?: (request: RolePostRequest<T>) => Promise<any>;
  redirectUrl: string;
}

export default function CreateRoleForm<T extends FieldValues>({
  roleEntity,
  knowledgeDomainDtos,
  knowledgeLevels,
  createRoleAction,
  redirectUrl
}: RoleFormProps<T>) {
  const listFields = useMemo(
    () =>
      ['suitabilities', 'availabilities'] as FieldName<RolePostRequest<T>>[],
    []
  );
  const methods = useFormContext<RolePostRequest<T>>();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = methods;

  const { readAny, getWttNameStrings, getRoleTypeNames } =
    useRoleTypeAndTaskTypeSelections(roleEntity);
  const compileSuitabilityRequestWithoutSetting = useCompileSuitabilityRequests(
    getWttNameStrings,
    getRoleTypeNames
  );

  const compileSuitabilityRequests = useCallback(() => {
    setValue('suitabilities', compileSuitabilityRequestWithoutSetting());
  }, [compileSuitabilityRequestWithoutSetting, setValue]);

  const compileAvailabilitiesWithoutSetting = useCompileAvailabilities(
    readAny,
    getRoleTypeNames
  );
  const compileAvailabilities = useCallback(
    () => setValue('availabilities', compileAvailabilitiesWithoutSetting()),
    [setValue, compileAvailabilitiesWithoutSetting]
  );
  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<RolePostRequest<T>> = async (data) => {
    startTransition(async () => {
      if (createRoleAction) {
        await createRoleAction(data);
        // Handle post-submit actions, e.g., redirect to a different page
        appRouterInstance.push(redirectUrl);
      } else {
        console.error('No submission action supplied');
      }
    });
  };

  const modalProps = useCreateTypeProps(
    ApiCreationEndpoints[roleEntity],
    EntityClassMap[`${roleEntity}RoleType`]
  );

  return (
    <>
      <Card className={'h-full w-72'}>
        <PendingOverlay pending={pending} />
        <form
          onSubmit={(event) => {
            compileAvailabilities();
            compileSuitabilityRequests();
            console.warn(errors);
            handleSubmit(onSubmit)(event);
          }}
          autoComplete={'on'}
          className={'flex grow flex-col gap-2 overflow-hidden'}
        >
          <div className={'grow-0 items-center justify-center align-middle '}>
            New Role
          </div>
          <div
            className={'flex grow-0 flex-col items-center justify-center gap-2'}
          >
            {roleEntity === 'provider' && (
              <PersonNestedInForm></PersonNestedInForm>
            )}
            {roleEntity === 'asset' && <AssetNestedInForm />}
            <Divider />
            <RoleAspectSelectors roleEntity={roleEntity} />
          </div>
          <div
            className={
              'flex grow flex-col items-center justify-start overflow-hidden align-middle'
            }
          >
            <div className={'h-fit grow-0'}>
              <Button type={'submit'} className={'block'}>
                Submit
              </Button>
            </div>
            <ScrollArea>
              <div className={'flex w-64 flex-col gap-2 overflow-clip p-2'}>
                {flattenErrors(errors)?.map((summary) => (
                  <ErrorDiv error={summary} key={summary.path} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </form>
        <div
          className={'center-horizontal-with-margin mb-4 w-[90%] border-1'}
        ></div>
        <div className={'center-horizontal-with-margin h-fit grow-0'}>
          <Button onClick={modalProps.onOpen}>Add Role Type</Button>
        </div>
        <CreateNewRoleTypeModal {...modalProps} />
      </Card>

      <CreateRoleTabs
        knowledgeDomains={knowledgeDomainDtos}
        knowledgeLevels={knowledgeLevels}
        roleEntity={roleEntity}
      />
    </>
  );
}

const ApiCreationEndpoints = {
  provider: Api.ProviderRoleType.postOne,
  asset: Api.AssetRoleType.postOne,
  user: Api.UserRoleType.postOne
} as const;
