'use client';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import { RoleEntity } from '@/components/roles/types';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  RoleData,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { FieldName, SubmitHandler, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button, Card, Divider, ScrollArea } from '@mantine/core';
import { PersonNestedInForm } from '@/components/roles/create-role/PersonNestedInForm';
import { ErrorDiv } from '@/components/roles/create-role/ErrorDiv';
import { RoleAspectSelectors } from '@/components/roles/create-role/RoleAspectSelectors';
import { useRoleTypeAndTaskTypeSelections } from '@/components/roles/create-role/useRoleTypeAndTaskTypeSelections';
import { useCompileSuitabilitySummaries } from '@/components/roles/create-role/useCompileSuitabilitySummaries';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { AssetNestedInForm } from '@/components/roles/create-role/AssetNestedInForm';
import { FieldValues } from 'react-hook-form/dist/types';
import CreateNewRoleTypeModal from '@/components/entities-with-type/CreateNewRoleTypeModal';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCreateTypeProps } from '@/components/user-role/create-user-role/UseCreateTypeProps';
import { Api } from '@/api/clientApi';
import { flattenErrors } from '@/functions/flatten-errors';
import { usePropagateRoleDataChange } from '@/components/roles/create-role/usePropagateRoleDataChange';

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
  const methods = useFormContext<RolePostRequest<T>>();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = methods;

  const { readAny, getWorkTypeCategoryNameStrings, getRoleTypeNames } =
    useRoleTypeAndTaskTypeSelections(roleEntity);
  const compileSuitabilityRequestWithoutSetting =
    useCompileSuitabilitySummaries(
      getWorkTypeCategoryNameStrings,
      getRoleTypeNames
    );
  const compileAvailabilitiesWithoutSetting = useCompileAvailabilities(
    readAny,
    getRoleTypeNames
  );

  const propagateRoleDataChange = useCallback(
    (update: Record<string, RoleData>) => {
      setValue('roleDataMap', update);
    },
    [setValue]
  );

  const compileRoleDataMap = usePropagateRoleDataChange({
    compileSuitabilityRequestWithoutSetting,
    compileAvailabilitiesWithoutSetting,
    propagateRoleDataChange
  });

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
            compileRoleDataMap();
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
          className={'center-horizontal-with-margin border-1 mb-4 w-[90%]'}
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
