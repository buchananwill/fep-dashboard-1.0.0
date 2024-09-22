'use client';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import { RoleEntity } from '@/components/roles/types';
import {
  HasName,
  KnowledgeDomainDto,
  KnowledgeLevelDto,
  PersonDto,
  RolePostRequest,
  SuitabilityPostRequest
} from '@/api/generated-types/generated-types';
import {
  FieldErrors,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useTransition } from 'react';
import { defaultPersonValues } from '@/components/roles/CreatePersonForm';
import { ProviderRolePostRequestSchema } from '@/api/zod-schemas/RolePostRequestSchemas';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { isNotUndefined } from '@/api/main';
import { useGlobalReadAny } from 'selective-context';
import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { HasNumberId } from '@/api/types';
import { outlookEventToAvailability } from '@/components/roles/create-role/RoleSubmissionHandler';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import {
  useReadAnyDtoTyped,
  useReadSelectedEntities
} from '@/api/typed-dto-store-hooks';
import { EditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';
import { RoleType } from '@/components/roles/create-role/types';
import { CreateRoleCell } from '@/components/work-task-types/suitabilityMatrixCell';
import { PersonNestedInForm } from '@/components/roles/create-role/PersonNestedInForm';
import {
  flattenArrayErrorsAndRender,
  PathRenderedErrorMap,
  RenderErrorsMap
} from '@/components/roles/create-role/FlattenArrayErrorsAndRender';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorDiv } from '@/components/roles/create-role/ErrorDiv';

const listenerKey = 'create-role-form';
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
    control,
    watch,
    setValue
  } = methods;

  const readAnyDto = useReadAnyDto<CreateRoleCell>(CellEntityClass);
  const { currentState: cellIdList } = NamespacedHooks.useListen<string[]>(
    CellEntityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );
  const { currentState: wttTaskNameIdList } = NamespacedHooks.useListen(
    WorkTaskTypeName,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const readAnyWttName = useReadAnyDto<HasName & HasNumberId>(WorkTaskTypeName);
  const roleTypeNames = useReadSelectedEntities(`${roleEntity}RoleType`);
  const readAnyKnowledgeDomain = useReadAnyDtoTyped('knowledgeDomain');
  const readAnyKnowledgeLevel = useReadAnyDtoTyped('knowledgeLevel');
  const readAny = useGlobalReadAny();

  const getWttNameStrings = useCallback(() => {
    return wttTaskNameIdList
      .map((id) => readAnyWttName(id))
      .filter(isNotUndefined)
      .map((name) => name.name);
  }, [wttTaskNameIdList, readAnyWttName]);

  const getRoleTypeNames = useCallback(() => {
    return roleTypeNames().map((type) => type.name);
  }, [roleTypeNames]);

  const compileSuitabilityRequests = useCallback(() => {
    const suitabilities = cellIdList
      .map((id) => readAnyDto(id))
      .filter(isNotUndefined)
      .filter((cell) => cell.rating > 0)
      .map((cell) => {
        const knowledgeLevel = readAnyKnowledgeLevel(cell.knowledgeLevelId);
        const knowledgeDomain = readAnyKnowledgeDomain(cell.knowledgeDomainId);
        if (knowledgeLevel && knowledgeDomain) {
          const suitabilityRequest: SuitabilityPostRequest = {
            workTaskTypeMatrix: {
              knowledgeDomainDtoList: [knowledgeDomain],
              knowledgeLevelSeriesDtoList: [
                {
                  name: '',
                  id: knowledgeLevel.knowledgeLevelSeriesId,
                  knowledgeLevels: [knowledgeLevel]
                }
              ],
              workTaskTypeNames: getWttNameStrings()
            },
            rating: cell.rating,
            roleTypeNames: getRoleTypeNames()
          };
          return suitabilityRequest;
        } else return undefined;
      })
      .filter(isNotUndefined);
    setValue('suitabilities', suitabilities);
  }, [
    cellIdList,
    getRoleTypeNames,
    getWttNameStrings,
    readAnyDto,
    readAnyKnowledgeDomain,
    readAnyKnowledgeLevel,
    setValue
  ]);

  const compileAvailabilities = useCallback(() => {
    const availabilities = (readAny(EditableEvents) as OutlookEvent[])
      .map((event) => outlookEventToAvailability(event))
      .map((availability) => ({
        ...availability,
        roleTypeNames: getRoleTypeNames()
      }));
    setValue('availabilities', availabilities);
  }, [readAny, getRoleTypeNames, setValue]);

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

  const suitabilityErrors: PathRenderedErrorMap<SuitabilityPostRequest> =
    useMemo(() => {
      const errorList = errors?.suitabilities;
      if (errorList) {
        return flattenArrayErrorsAndRender(
          errorList as FieldErrors<SuitabilityPostRequest>[],
          SuitabilitiesErrorMap
        );
      } else return {};
    }, [errors]);

  const taskNameErrors =
    suitabilityErrors.each?.['workTaskTypeMatrix.workTaskTypeNames'];
  const roleTypeErrors = suitabilityErrors.each?.roleTypeNames;

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
            <h1>Role</h1>
            <FilteredEntitySelector<RoleType>
              entityClass={EntityClassMap[`${roleEntity}RoleType`]}
              labelAccessor={'name'}
              label={'Role Type'}
              className={'w-full'}
              isInvalid={!!roleTypeErrors?.length}
              errorMessage={<>{roleTypeErrors && roleTypeErrors}</>}
            />
            <FilteredEntitySelector<HasNumberId & HasName>
              entityClass={WorkTaskTypeName}
              labelAccessor={'name'}
              selectionMode={'multiple'}
              label={'Task Types'}
              className={'w-full'}
              isInvalid={!!taskNameErrors?.length}
              errorMessage={<>{taskNameErrors && taskNameErrors}</>}
            />
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

const SuitabilitiesErrorMap: RenderErrorsMap<SuitabilityPostRequest> = {
  each: {
    'workTaskTypeMatrix.workTaskTypeNames': (props) =>
      props.errors?.message && <span>{props.errors.message}</span>,
    roleTypeNames: (props) =>
      props.errors?.message && <span>{props.errors.message}</span>
  }
};
