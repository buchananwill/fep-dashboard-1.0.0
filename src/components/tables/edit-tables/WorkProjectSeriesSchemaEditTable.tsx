'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { AdjustAllocationInWrapper } from '@/components/work-project-series-schema/_components/AdjustAllocation';
import { Column, ColumnUid } from '@/types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import EntityEditTable from '@/components/tables/edit-v2/EntityEditTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import { DeleteEntity } from '@/components/tables/cells-v2/DeleteEntity';
import { NumberEditCell } from '@/components/tables/cells-v2/NumberEditCell';
import EmbeddedWorkTaskTypeCell from '@/components/tables/cells-v2/EmbeddedWorkTaskTypeCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';

const entityType = EntityClassMap.workProjectSeriesSchema;

export default function WorkProjectSeriesSchemaEditTable({
  pathVariables
}: LeafComponentProps) {
  const entities =
    useFilterOutDeletedEntities<WorkProjectSeriesSchemaDto>(entityType);

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <EntityEditTable
        entityClass={entityType}
        columns={workProjectSeriesSchemaColumns}
        cellModel={workProjectSeriesSchemaRenderCellFunction}
        defaultSort={Sorts.name}
      />
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
      uid: 'workTaskType.knowledgeDomain.shortCode',
      name: 'Short Code',
      sortable: true
    },
    {
      uid: 'workTaskType.knowledgeLevel.levelOrdinal',
      name: 'levelOrdinal',
      sortable: true
    },
    {
      uid: 'workTaskType.knowledgeLevel.name',
      name: 'levelName',
      sortable: true
    },
    {
      uid: 'userToProviderRatio',
      sortable: true,
      name: `${startCase(getDomainAlias('user'))} limit`
    },
    {
      uid: 'workTaskType.name',
      name: startCase('workTaskType'),
      sortable: true
    }
  ];

const initialColumns: ColumnUid<WorkProjectSeriesSchemaDto>[] = [
  'name',
  'deliveryAllocations',
  'workTaskType.knowledgeDomain.shortCode',
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
    'workTaskType.knowledgeDomain.shortCode': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTaskTypeCell
    },
    'workTaskType.name': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTaskTypeCell
    },
    'workTaskType.knowledgeLevel.name': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTaskTypeCell
    },
    'workTaskType.knowledgeLevel.levelOrdinal': {
      type: 'EntityInnerCell',
      component: EmbeddedWorkTaskTypeCell
    }
  };

export const workProjectSeriesSchemaRenderCellFunction = getCellRenderFunction(
  'workProjectSeriesSchema',
  WorkProjectSeriesSchemaEditTableCellRecord
);
