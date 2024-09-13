import { HasId } from '@/api/types';
import { NextUiCellComponentProps } from '@/app/work-project-series-schemas/_components/GetCellRenderFunction';
import { DtoUiWrapper } from 'dto-stores';
import {
  NestedBaseDtoStoreNumberInputProps,
  NestedDtoStoreNumberInput
} from '@/components/generic/NestedDtoStoreNumberInput';
import { TypedPaths } from '@/functions/typePaths';
import React from 'react';

export function NestedDtoStoreNumberEditCell<T extends HasId>({
  entity,
  path,
  entityClass
}: NextUiCellComponentProps<T>) {
  return (
    <DtoUiWrapper<T, NestedBaseDtoStoreNumberInputProps<T>>
      renderAs={NestedDtoStoreNumberInput}
      entityClass={entityClass}
      entityId={entity.id}
      numberPath={path as TypedPaths<T, number>}
    />
  );
}
