'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeManualDefinitionDto } from '@/api/generated-types/generated-types_';
import { Column } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import {
  getStringUpdater,
  getStringUpdaterAllowUndefined
} from '@/functions/cellUpdaterFunctions';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { ExportDataButton } from '@/components/export/ExportDataButton';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ImportDataButton } from '@/components/import/ImportDataButton';
import { useUploadData } from '@/hooks/useUploadData';
import EditTextWithModalCell from '@/components/tables/cells-v2/generic/EditTextWithModalCell';
import { IdWrapper } from '@/api/types';
import { useDataExportCallback } from '@/hooks/useDataExportCallback';
import { validate } from '@/functions/validation/validateWorkSchemaNodeManualDefinitionList';
import { DeliveryAllocationListParserCell } from '@/components/tables/cells-v2/specific/DeliveryAllocationListParserCell';
import { SelectKnowledgeDomainNameCell } from '@/components/tables/cells-v2/specific/SelectKnowledgeDomainNameCell';
import { SelectTaskTypeNameNameCell } from '@/components/tables/cells-v2/specific/SelectWorkTypeCategoryCell';
import { SelectKnowledgeLevelCell } from '@/components/tables/cells-v2/specific/SelectKnowledgeLevelCell';
import { SelectChildrenAsCell } from '@/components/tables/cells-v2/specific/SelectChildrenAsCell';
import { SelectParentNodeNameCell } from '@/components/tables/cells-v2/specific/SelectParentNodeNameCell';
import { EditWorkSchemaNodeNameCell } from '@/components/tables/cells-v2/specific/UpdateWorkSchemaNodeNameCell';

const entityType = EntityClassMap.workSchemaNodeManualDefinition;

export function WorkSchemaNodeManualDefinitionTable({
  pathVariables
}: LeafComponentProps) {
  const readAnyDto =
    useReadAnyDto<IdWrapper<WorkSchemaNodeManualDefinitionDto>>(entityType);
  const { currentState } = NamespacedHooks.useListen(
    entityType,
    KEY_TYPES.ID_LIST,
    'work-schema-node-manual-definition-table',
    EmptyArray as string[]
  );
  const getData = useDataExportCallback({
    idList: currentState,
    readAnyDto,
    type: 'unwrap'
  });

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<WorkSchemaNodeManualDefinitionDto>[]
  >(entityType, KEY_TYPES.MASTER_LIST);

  const onChange = useUploadData({ validate, dispatch, type: 'single' });

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={workSchemaNodeManualDefinitionColumns}
          cellModel={workSchemaNodeManualDefinitionCellModel}
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

export const workSchemaNodeManualDefinitionColumns: Column<
  IdWrapper<WorkSchemaNodeManualDefinitionDto>
>[] = [
  {
    uid: 'data.name',
    name: 'Name',
    sortable: true
  },
  {
    uid: 'data.childrenAs',
    name: 'Children As',
    sortable: true
  },
  {
    uid: 'data.parentNodeName',
    name: 'Parent Node',
    sortable: true
  },
  {
    uid: 'data.taskTypeName',
    name: 'Task Type Name',
    sortable: true
  },
  {
    uid: 'data.knowledgeDomainName',
    name: 'Knowledge Domain',
    sortable: true
  },
  {
    uid: 'data.knowledgeLevelName',
    name: 'Knowledge Level',
    sortable: true
  },
  {
    uid: 'data.allocationList',
    name: 'Allocation List',
    sortable: true
  }
];

const workSchemaNodeManualDefinitionCellRecord: CellComponentRecord<
  IdWrapper<WorkSchemaNodeManualDefinitionDto>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.name': {
    type: 'IdInnerCell',
    component: EditWorkSchemaNodeNameCell,
    updater: getStringUpdater('data.name')
  },
  'data.taskTypeName': {
    type: 'IdInnerCell',
    component: SelectTaskTypeNameNameCell,
    updater: getStringUpdaterAllowUndefined('data.taskTypeName')
  },
  'data.knowledgeDomainName': {
    type: 'IdInnerCell',
    component: SelectKnowledgeDomainNameCell,
    updater: getStringUpdaterAllowUndefined('data.knowledgeDomainName')
  },
  'data.knowledgeLevelName': {
    type: 'IdInnerCell',
    component: SelectKnowledgeLevelCell,
    updater: getStringUpdaterAllowUndefined('data.knowledgeLevelName')
  },
  'data.allocationList': {
    type: 'IdInnerCell',
    component: DeliveryAllocationListParserCell,
    updater: getStringUpdaterAllowUndefined('data.allocationList')
  },
  'data.childrenAs': {
    type: 'IdInnerCell',
    component: SelectChildrenAsCell,
    updater: getStringUpdater('data.childrenAs')
  },
  'data.parentNodeName': {
    type: 'IdInnerCell',
    component: SelectParentNodeNameCell,
    updater: getStringUpdaterAllowUndefined('data.parentNodeName')
  }
};

export const workSchemaNodeManualDefinitionCellModel = getCellRenderFunction(
  'workSchemaNodeManualDefinition',
  workSchemaNodeManualDefinitionCellRecord
);
