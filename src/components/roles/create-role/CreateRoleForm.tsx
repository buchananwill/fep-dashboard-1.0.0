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
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { PersonNestedInForm } from '@/components/roles/create-role/PersonNestedInForm';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorDiv } from '@/components/roles/create-role/ErrorDiv';
import { RoleAspectSelectors } from '@/components/roles/create-role/RoleAspectSelectors';
import { useRoleTypeAndTaskTypeSelections } from '@/components/roles/create-role/useRoleTypeAndTaskTypeSelections';
import { useCompileSuitabilityRequests } from '@/components/roles/create-role/useCompileSuitabilityRequests';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { AssetNestedInForm } from '@/components/roles/create-role/AssetNestedInForm';
import { FieldValues } from 'react-hook-form/dist/types';

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

  return (
    <>
      <Card className={'h-full w-64'}>
        <PendingOverlay pending={pending} />
        <form
          onSubmit={(event) => {
            compileAvailabilities();
            compileSuitabilityRequests();
            console.warn(errors);
            handleSubmit(onSubmit)(event);
          }}
          autoComplete={'on'}
        >
          <CardHeader className={'items-center justify-center align-middle '}>
            New Role
          </CardHeader>
          <CardBody className={'items-center justify-center gap-2'}>
            {roleEntity === 'provider' && (
              <PersonNestedInForm></PersonNestedInForm>
            )}
            {roleEntity === 'asset' && <AssetNestedInForm />}
            <Divider />
            <RoleAspectSelectors roleEntity={roleEntity} />
          </CardBody>
          <CardFooter
            className={'flex flex-col items-center justify-center align-middle'}
          >
            <Button type={'submit'} className={'block'}>
              Submit
            </Button>
            <div className={'flex w-64 flex-col gap-2 overflow-clip p-2'}>
              {listFields.map((item) => (
                <ErrorMessage
                  key={item}
                  errors={errors}
                  name={item}
                  render={({ message }) =>
                    message?.length && <ErrorDiv message={message} />
                  }
                />
              ))}
            </div>
          </CardFooter>
        </form>
      </Card>

      <CreateRoleTabs
        knowledgeDomains={knowledgeDomainDtos}
        knowledgeLevels={knowledgeLevels}
        roleEntity={roleEntity}
      />
    </>
  );
}
