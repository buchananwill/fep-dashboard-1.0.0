'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  WorkProjectSeriesSchemaDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { Paths } from 'type-fest';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';
import EmbeddedWorkTypeCell from '@/components/tables/cells-v2/specific/EmbeddedWorkTypeCell';
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
    'workType.knowledgeDomain.name',
    'workType.knowledgeDomain.shortCode'
  ];
export const WorkProjectSeriesSchemaColumns: Column<WorkProjectSeriesSchemaDto>[] =
  [
    { uid: 'name', name: 'Name', sortable: true },
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
      uid: 'workType.knowledgeDomain.shortCode',
      name: 'Short Code',
      sortable: true,
      style: { padding: '0px' }
    },
    {
      uid: 'workType.name',
      name: startCase('workType'),
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
});

function WpssNamespaceCell(
  props: EntityInnerCellProps<WorkProjectSeriesSchemaDto>
) {
  const { entity } = props;

  return getWorkTypeViewIdString(entity.workType);
}

export function getWorkTypeViewIdString(workType: WorkTypeDto) {
  return `${workType.name} - ${workType.knowledgeDomain.name} - ${workType.knowledgeLevel?.name ?? 'no level'}`;
}
