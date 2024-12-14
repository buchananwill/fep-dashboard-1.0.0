'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  AssetDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { Column } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { getStringUpdater } from '@/functions/cellUpdaterFunctions';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ExportDataButton } from '@/components/export/ExportDataButton';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ImportDataButton } from '@/components/import/ImportDataButton';
import { useUploadData } from '@/hooks/useUploadData';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';
import { IdWrapper } from '@/api/types';
import { validate } from '@/functions/validation/validate-asset-role-list';
import EditNameCell from '@/components/tables/cells-v2/generic/EditNameCell';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { SelectAssetTypeCell } from '../cells-v2/specific/SelectAssetTypeCell';
import { EditRoleDataCell } from '../cells-v2/specific/EditRoleDataCell';

const entityType = EntityClassMap.assetRolePostRequest;

export function AssetRolePostRequestTable({
  pathVariables
}: LeafComponentProps) {
  const readAnyDto =
    useReadAnyDto<IdWrapper<RolePostRequest<AssetDto>>>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'asset-role-post-request-table',
    EmptyArray as string[]
  );
  const getData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'unwrap'
  });

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<RolePostRequest<AssetDto>>[]
  >(entityType, KEY_TYPES.MASTER_LIST);

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={assetRoleColumns}
          cellModel={assetRolePostRequestCellModel}
          defaultSort={Sorts['data.baseEntity.name']}
        />
      </div>
      <div className={'center-all-margin flex w-fit gap-2 p-2'}>
        <ImportDataButton onChange={onChange} accept={'application/json'} />
        <ExportDataButton
          downloadProps={{ getData }}
          rightSection={<ArrowDownTrayIcon className={'w-6'} />}
        >
          Export
        </ExportDataButton>
      </div>
    </RootCard>
  );
}

export const assetRoleColumns: Column<IdWrapper<RolePostRequest<AssetDto>>>[] =
  [
    { uid: 'id', name: 'Delete', sortable: false, ignoreFilter: true },
    {
      uid: 'data.roleDataMap',
      name: 'Role Data',
      sortable: false,
      ignoreFilter: true
    },
    { uid: 'data.baseEntity.name', sortable: true, name: 'Name' },
    { uid: 'data.baseEntity.type', sortable: true, name: 'Type' }
  ];

const assetRolePostRequestCells: CellComponentRecord<
  IdWrapper<RolePostRequest<AssetDto>>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.baseEntity.name': {
    type: 'IdInnerCell',
    component: EditNameCell,
    updater: getStringUpdater('data.baseEntity.name')
  },
  'data.baseEntity.type': {
    component: SelectAssetTypeCell,
    type: 'IdInnerCell',
    updater: (prev, value) =>
      updateNestedValueWithLodash(prev, 'data.baseEntity.type', value)
  },
  'data.roleDataMap': {
    type: 'IdInnerCell',
    component: EditRoleDataCell,
    updater: (prev, value) =>
      updateNestedValueWithLodash(prev, 'data.roleDataMap', value)
  }
};

export const assetRolePostRequestCellModel = getCellRenderFunction(
  'assetRolePostRequest',
  assetRolePostRequestCells
);
