'use client';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import { RoleEntity } from '@/components/roles/types';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  PersonDto,
  RolePostRequest
} from '@/api/generated-types/generated-types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useTransition } from 'react';
import { defaultPersonValues } from '@/components/roles/CreatePersonForm';
import { ProviderRolePostRequestSchema } from '@/api/zod-schemas/RolePostRequestSchemas';
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

export const listenerKey = 'create-role-form';

export default function CreateRoleForm({
  roleEntity,
  knowledgeDomainDtos,
  knowledgeLevels,
  createRoleAction,
  redirectUrl
}: {
  roleEntity: RoleEntity;
  knowledgeDomainDtos: KnowledgeDomainDto[];
  knowledgeLevels: KnowledgeLevelDto[];
  createRoleAction?: (request: RolePostRequest<PersonDto>) => Promise<any>;
  redirectUrl: string;
}) {
  const methods = useForm<RolePostRequest<PersonDto>>({
    resolver: zodResolver(ProviderRolePostRequestSchema),
    defaultValues: {
      baseEntity: defaultPersonValues,
      suitabilities: [],
      availabilities: []
    }
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue
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

  const onSubmit: SubmitHandler<RolePostRequest<PersonDto>> = async (data) => {
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
    <FormProvider {...methods}>
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
              {['suitabilities', 'availabilities'].map((item) => (
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
    </FormProvider>
  );
}
