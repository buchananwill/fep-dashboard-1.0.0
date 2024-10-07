import {
  flattenArrayErrorsAndRender,
  PathRenderedErrorMap,
  RenderErrorsMap
} from '@/components/roles/create-role/FlattenArrayErrorsAndRender';
import {
  HasNameDto,
  RolePostRequest,
  SuitabilityPostRequest
} from '@/api/generated-types/generated-types';
import React, { useMemo } from 'react';
import { RoleEntity } from '@/components/roles/types';
import { FieldErrors, useFormContext } from 'react-hook-form';
import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { RoleType } from '@/components/roles/create-role/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { HasNumberId } from '@/api/types';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';

const SuitabilitiesErrorMap: RenderErrorsMap<SuitabilityPostRequest> = {
  each: {
    'workTaskTypeMatrix.workTaskTypeNames': (props) =>
      props.errors?.message && <span>{props.errors.message}</span>,
    roleTypeNames: (props) =>
      props.errors?.message && <span>{props.errors.message}</span>
  }
};

export function RoleAspectSelectors({
  roleEntity
}: {
  roleEntity: RoleEntity;
}) {
  const {
    formState: { errors }
  } = useFormContext<RolePostRequest<any>>();
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
    <>
      {' '}
      <h1>Role</h1>{' '}
      <FilteredEntitySelector<RoleType>
        entityClass={EntityClassMap[`${roleEntity}RoleType`]}
        labelAccessor={'name'}
        label={'Role Type'}
        className={'w-full'}
        isInvalid={!!roleTypeErrors?.length}
        errorMessage={<>{roleTypeErrors && roleTypeErrors}</>}
      />
      <FilteredEntitySelector<HasNumberId & HasNameDto>
        entityClass={WorkTaskTypeName}
        labelAccessor={'name'}
        selectionMode={'multiple'}
        label={'Task Types'}
        className={'w-full'}
        isInvalid={!!taskNameErrors?.length}
        errorMessage={<>{taskNameErrors && taskNameErrors}</>}
      />
    </>
  );
}
