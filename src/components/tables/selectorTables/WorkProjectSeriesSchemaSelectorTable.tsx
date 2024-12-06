'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  WorkProjectSeriesSchemaDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import { Paths } from 'type-fest';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';
import EmbeddedWorkTaskTypeCell from '@/components/tables/cells-v2/specific/EmbeddedWorkTaskTypeCell';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { EntityInnerCellProps } from '@/components/tables/core-table-types';

export default function WorkProjectSeriesSchemaSelectorTable({
  entities
}: {
  entities?: WorkProjectSeriesSchemaDto[];
}) {
  return (
    <>
      <EntityTable
        cellModel={WpssCellModelReadOnly}
        withSelection={'multiple'}
        columns={WorkProjectSeriesSchemaColumns}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
    </>
  );
}

export const WorkProjectSeriesSchemaColumnsInitial: Paths<WorkProjectSeriesSchemaDto>[] =
  [
    'name',
    'workTaskType.knowledgeDomain.name',
    'workTaskType.knowledgeDomain.shortCode'
  ];
export const WorkProjectSeriesSchemaColumns: Column<WorkProjectSeriesSchemaDto>[] =
  [
    { uid: 'name', name: 'Name', sortable: true },
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
      uid: 'workTaskType.knowledgeDomain.shortCode',
      name: 'Short Code',
      sortable: true,
      style: { padding: '0px' }
    },
    {
      uid: 'workTaskType.name',
      name: startCase('workTaskType'),
      sortable: true
    },
    {
      uid: 'userToProviderRatio',
      sortable: true,
      name: `${startCase(getDomainAlias('user'))} limit`
    }
  ];

export const WpssCellModelReadOnly = getCellRenderFunction<
  'workProjectSeriesSchema',
  WorkProjectSeriesSchemaDto
>('workProjectSeriesSchema', {
  name: { type: 'EntityInnerCell', component: WpssNamespaceCell },
  userToProviderRatio: { type: 'IdInnerCell', component: AnyValueToString },
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
});

function WpssNamespaceCell(
  props: EntityInnerCellProps<WorkProjectSeriesSchemaDto>
) {
  const { entity } = props;

  return getWorkTaskTypeViewIdString(entity.workTaskType);
}

export function getWorkTaskTypeViewIdString(workTaskType: WorkTaskTypeDto) {
  return `${workTaskType.name} - ${workTaskType.knowledgeDomain.name} - ${workTaskType.knowledgeLevel?.name ?? 'no level'}`;
}
