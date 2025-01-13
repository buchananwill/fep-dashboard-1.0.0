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
} from '@/api/generated-types/generated-types_';
import React, { useMemo } from 'react';
import { RoleEntity } from '@/components/roles/types';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTypeCategory } from '@/components/roles/create-role/literals';
import { useEntitySelectionWithStringLabelsOnly } from '@/hooks/useEntitySelectionWithStringLabelsOnly';
import { Select } from '@mantine/core';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/combo-boxes/MultiSelectMaxDisplayedItems';
import { useEntitySelectionWithSimpleSelectables } from '@/hooks/useEntitySelectionWithSimpleSelectables';
import { ErrorDiv } from '@/components/roles/create-role/ErrorDiv';

const RoleDataErrorsMap: RenderErrorsMap<RoleData> = {
  each: {
    suitabilities: (props) =>
      props.errors?.message && <span>{props.errors.message}</span>,
    availabilities: (props) =>
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
    WorkTypeCategory,
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
      />
      <MultiSelectMaxDisplayedItems
        pillsInput={{
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
