'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { AdjustAllocationInWrapper } from '@/components/work-project-series-schema/_components/AdjustAllocation';
import { Column, ColumnUid } from '@/types';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/generic/EditNameCell';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import { NumberEditCell } from '@/components/tables/cells-v2/generic/NumberEditCell';
import EmbeddedWorkTypeCell from '@/components/tables/cells-v2/specific/EmbeddedWorkTypeCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';

const entityType = EntityClassMap.workProjectSeriesSchema;

export default function WorkProjectSeriesSchemaEditTable({
  pathVariables
}: LeafComponentProps) {
  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'flex h-[600px] max-w-[80rem] flex-col p-2'}>
        <EntityTable
          entityClass={entityType}
          columns={workProjectSeriesSchemaColumns}
          cellModel={workProjectSeriesSchemaRenderCellFunction}
          defaultSort={Sorts.name}
        />
      </div>
    </RootCard>
  );
}

export const workProjectSeriesSchemaColumns: Column<WorkProjectSeriesSchemaDto>[] =
  [
    { uid: 'name', name: 'Name', sortable: true },
    {
      uid: 'deliveryAllocations',
      name: startCase(getDomainAlias('deliveryAllocations')),
      sortable: false,
      ignoreFilter: true
    },
    {
      uid: 'workType.knowledgeDomain.shortCode',
      name: 'Short Code',
      sortable: true,
      style: { padding: '0px' }
    },
    {
      uid: 'workType.knowledgeLevel.levelOrdinal',
      name: 'levelOrdinal',
      sortable: true
    },
    {
      uid: 'workType.knowledgeLevel.name',
      name: 'levelName',
      sortable: true
    },
    {
      uid: 'userToProviderRatio',
      sortable: true,
      name: `${startCase(getDomainAlias('user'))} limit`
    },
    {
      uid: 'workType.name',
      name: startCase('workType'),
      sortable: true
    }
  ];

const initialColumns: ColumnUid<WorkProjectSeriesSchemaDto>[] = [
  'name',
  'deliveryAllocations',
  'workType.knowledgeDomain.shortCode',
  'userToProviderRatio'
];

const WorkProjectSeriesSchemaEditTableCellRecord: CellComponentRecord<WorkProjectSeriesSchemaDto> =
  {
    id: { type: 'CustomCell', component: DeleteEntity },
    name: { type: 'IdInnerCell', component: EditNameCell },
    userToProviderRatio: {
      type: 'IdInnerCell',
      component: NumberEditCell,
      updater: (prev, value) => ({ ...prev, userToProviderRatio: value })
    },
    deliveryAllocations: {
      type: 'EntityInnerCell',
      component: AdjustAllocationInWrapper
    },
    'workType.knowledgeDomain.shortCode': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTypeCell
    },
    'workType.name': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTypeCell
    },
    'workType.knowledgeLevel.name': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTypeCell
    },
    'workType.knowledgeLevel.levelOrdinal': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTypeCell
    }
  };

export const workProjectSeriesSchemaRenderCellFunction = getCellRenderFunction(
  'workProjectSeriesSchema',
  WorkProjectSeriesSchemaEditTableCellRecord
);
