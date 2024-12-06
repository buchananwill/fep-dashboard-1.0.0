'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
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
import EditTextWithModalCell from '@/components/tables/cells-v2/generic/EditTextWithModalCell';
import { IdWrapper } from '@/api/types';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';
import { validate } from '@/functions/validation/validate-organization-work-hierarchy';
import { SelectOrganizationTypeNameCell } from '../cells-v2/specific/SelectOrganizationTypeTypeNameCell';
import { SelectParentOrganizationNamesCell } from '../cells-v2/specific/SelectParentOrganizationNamesCell';

const entityType = EntityClassMap.organizationWorkHierarchy;

export function OrganizationWorkHierarchyTable({
  pathVariables
}: LeafComponentProps) {
  const readAnyDto =
    useReadAnyDto<IdWrapper<OrganizationWorkHierarchyDto>>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'organization-work-hierarchy-table',
    EmptyArray as string[]
  );
  const getData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'unwrap'
  });

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<OrganizationWorkHierarchyDto>[]
  >(entityType, KEY_TYPES.MASTER_LIST);

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={organizationWorkHierarchyColumns}
          cellModel={organizationWorkHierarchyCellModel}
          defaultSort={Sorts['data.name']}
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

export const organizationWorkHierarchyColumns: Column<
  IdWrapper<OrganizationWorkHierarchyDto>
>[] = [
  {
    uid: 'data.name',
    name: 'Name',
    sortable: true
  },
  {
    uid: 'data.typeName',
    name: 'Type Name',
    sortable: true
  },
  {
    uid: 'data.parentNames',
    name: 'Parent Names',
    sortable: false
  }
];

const organizationWorkHierarchyCellRecord: CellComponentRecord<
  IdWrapper<OrganizationWorkHierarchyDto>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.name': {
    type: 'IdInnerCell',
    component: EditTextWithModalCell,
    updater: getStringUpdater('data.name')
  },
  'data.typeName': {
    type: 'IdInnerCell',
    component: SelectOrganizationTypeNameCell,
    updater: getStringUpdater('data.typeName')
  },
  'data.parentNames': {
    type: 'IdInnerCell',
    component: SelectParentOrganizationNamesCell,
    updater: (prev, value) => ({
      ...prev,
      data: { ...prev.data, parentNames: value }
    })
  }
};

export const organizationWorkHierarchyCellModel = getCellRenderFunction(
  'organizationWorkHierarchy',
  organizationWorkHierarchyCellRecord
);
