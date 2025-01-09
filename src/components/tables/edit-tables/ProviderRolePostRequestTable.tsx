'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  PersonDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { Column } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { getStringUpdater } from '@/functions/cellUpdaterFunctions';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { ExportDataButton } from '@/components/export/ExportDataButton';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ImportDataButton } from '@/components/import/ImportDataButton';
import { useUploadData } from '@/hooks/useUploadData';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';
import { IdWrapper } from '@/api/types';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { EditRoleDataCell } from '../cells-v2/specific/EditRoleDataCell';
import { EditDateCell } from '@/components/tables/cells-v2/generic/EditDateCell';
import { validate } from '@/functions/validation/validate-provider-role-list';
import EditTextWithModalCell from '@/components/tables/cells-v2/generic/EditTextWithModalCell';

const entityType = EntityClassMap.providerRolePostRequest;

export function ProviderRolePostRequestTable({
  pathVariables
}: LeafComponentProps) {
  const readAnyDto =
    useReadAnyDto<IdWrapper<RolePostRequest<PersonDto>>>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'provider-role-post-request-table',
    EmptyArray as string[]
  );
  const getData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'unwrap'
  });

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<RolePostRequest<PersonDto>>[]
  >(entityType, KEY_TYPES.MASTER_LIST);

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={providerRoleColumns}
          cellModel={providerRolePostRequestCellModel}
          defaultSort={Sorts['data.baseEntity.lName']}
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

export const providerRoleColumns: Column<
  IdWrapper<RolePostRequest<PersonDto>>
>[] = [
  { uid: 'id', name: 'Delete', sortable: false, ignoreFilter: true },
  {
    uid: 'data.roleDataMap',
    name: 'Role Data',
    sortable: false,
    ignoreFilter: true
  },
  { uid: 'data.baseEntity.fName', sortable: true, name: 'First Name' },
  { uid: 'data.baseEntity.lName', sortable: true, name: 'Last Name' },
  { uid: 'data.baseEntity.dateOfBirth', sortable: true, name: 'Type' }
];

const providerRolePostRequestCells: CellComponentRecord<
  IdWrapper<RolePostRequest<PersonDto>>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.baseEntity.fName': {
    type: 'IdInnerCell',
    component: EditTextWithModalCell,
    updater: getStringUpdater('data.baseEntity.fName')
  },
  'data.baseEntity.lName': {
    type: 'IdInnerCell',
    component: EditTextWithModalCell,
    updater: getStringUpdater('data.baseEntity.lName')
  },
  'data.baseEntity.dateOfBirth': {
    component: EditDateCell,
    type: 'IdInnerCell',
    updater: (prev, value) =>
      updateNestedValueWithLodash(prev, 'data.baseEntity.dateOfBirth', value)
  },
  'data.roleDataMap': {
    type: 'IdInnerCell',
    component: EditRoleDataCell,
    updater: (prev, value) =>
      updateNestedValueWithLodash(prev, 'data.roleDataMap', value)
  }
};

export const providerRolePostRequestCellModel = getCellRenderFunction(
  'providerRolePostRequest',
  providerRolePostRequestCells
);
