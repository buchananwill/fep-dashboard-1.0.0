import {
  flattenArrayErrorsAndRender,
  PathRenderedErrorMap,
  RenderErrorsMap
} from '@/components/roles/create-role/FlattenArrayErrorsAndRender';
import {
  RoleData,
  RolePostRequest,
  SuitabilityPostRequest,
  TypeDto
} from '@/api/generated-types/generated-types';
import React, { useMemo } from 'react';
import { RoleEntity } from '@/components/roles/types';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';
import { useEntitySelectionWithStringLabelsOnly } from '@/hooks/useEntitySelectionWithStringLabelsOnly';
import { Select } from '@mantine/core';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/combo-boxes/MultiSelectMaxDisplayedItems';
import { useEntitySelectionWithSimpleSelectables } from '@/hooks/useEntitySelectionWithSimpleSelectables';

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
      const errorList = errors?.roleDataMap;
      if (errorList) {
        return flattenArrayErrorsAndRender(
          Object.values(errorList) as FieldErrors<RoleData>[],
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
