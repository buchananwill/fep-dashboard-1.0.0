'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { Paths } from 'type-fest';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';
import EmbeddedWorkTaskTypeCell from '@/components/tables/cells-v2/EmbeddedWorkTaskTypeCell';
import EntityTable from '@/components/tables/edit-tables/EntityTable';

export default function WorkProjectSeriesSchemaSelectorTable({
  entities
}: {
  entities: WorkProjectSeriesSchemaDto[];
}) {
  return (
    <>
      <EntityTable
        cellModel={WpssCellModelReadOnly}
        withSelection
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

const WpssCellModelReadOnly = getCellRenderFunction<
  'workProjectSeriesSchema',
  WorkProjectSeriesSchemaDto
>('workProjectSeriesSchema', {
  name: { type: 'IdInnerCell', component: AnyValueToString },
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
