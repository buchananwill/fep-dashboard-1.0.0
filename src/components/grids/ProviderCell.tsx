'use client';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { ProviderRoleDto } from '@/api/zod-schemas/ProviderRoleDtoSchema';
import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/tables/CellQueryManager';
import { EntityClassMap } from '@/api/entity-class-map';
import DtoUiWrapperCell from '@/components/grids/DtoUiWrapperCell';

function InnerProviderCell(props: BaseLazyDtoUiProps<ProviderRoleDto>) {
  return (
    <span className={'center-vertical-with-margin inline-block truncate pl-1'}>
      {props.entity.partyName}
    </span>
  );
}

export function ProviderCell(
  props: GridChildComponentProps<CellIdReference[][]>
) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerProviderCell}
      idKey={'rowId'}
      entityClass={EntityClassMap.providerRole}
    />
  );
}
