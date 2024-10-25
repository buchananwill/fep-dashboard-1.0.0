import {
  flattenArrayErrorsAndRender,
  PathRenderedErrorMap,
  RenderErrorsMap
} from '@/components/roles/create-role/FlattenArrayErrorsAndRender';
import {
  HasNameDto,
  RolePostRequest,
  SuitabilityPostRequest,
  TypeDto
} from '@/api/generated-types/generated-types';
import React, { useMemo } from 'react';
import { RoleEntity } from '@/components/roles/types';
import { FieldErrors, useFormContext } from 'react-hook-form';
import EntitySelector from '@/components/generic/EntitySelector';
import { RoleType } from '@/components/roles/create-role/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { HasNumberId } from '@/api/types';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';
import {
  useEntitySelectionWithSimpleSelectables,
  useEntitySelectionWithStringLabelsOnly
} from '@/hooks/useEntitySelectionWithStringLabelsOnly';
import { Select } from '@mantine/core';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/MultiSelectMaxDisplayedItems';

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
    formState: { errors },
    control
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

  const {
    selectionList: selectionListRoleType,
    onChange,
    labelList
  } = useEntitySelectionWithStringLabelsOnly<TypeDto<any, any>>(
    EntityClassMap[`${roleEntity}RoleType`],
    'name'
  );

  const {
    selectionList: selectionListTaskType,
    onChange: onChangeTaskTypes,
    selectableList
  } = useEntitySelectionWithSimpleSelectables<TypeDto<any, any>>(
    WorkTaskTypeName,
    'name'
  );

  return (
    <>
      {' '}
      <h1>Role</h1>{' '}
      <Select
        data={labelList}
        value={
          selectionListRoleType.length > 0 ? selectionListRoleType[0] : null
        }
        onChange={onChange}
        placeholder={'Role Type'}
        error={
          roleTypeErrors && roleTypeErrors.length > 0
            ? roleTypeErrors
            : undefined
        }
      />
      <MultiSelectMaxDisplayedItems
        pillsInput={{
          error:
            taskNameErrors && taskNameErrors.length > 0
              ? taskNameErrors
              : undefined,
          classNames: {
            root: 'w-full'
          }
        }}
        maxDisplayedValues={1}
        data={selectableList}
        onChange={onChangeTaskTypes}
        value={selectionListTaskType}
      />
    </>
  );
}
