'use client';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/grids/CellQueryManager';
import { EntityClassMap } from '@/api/entity-class-map';
import DtoUiWrapperCell from '@/components/grids/DtoUiWrapperCell';
import { AssetRoleDto } from '@/api/generated-types/generated-types_';

function InnerAssetCell(props: BaseLazyDtoUiProps<AssetRoleDto>) {
  return (
    <span className={'center-vertical-with-margin inline-block truncate pl-1'}>
      {props.entity.assetName}
    </span>
  );
}

export function AssetCell(props: GridChildComponentProps<CellIdReference[][]>) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerAssetCell}
      idKey={'rowId'}
      entityClass={EntityClassMap.assetRole}
    />
  );
}
