'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesDto } from '@/api/generated-types/generated-types_';
import { getDomainAlias } from '@/api/getDomainAlias';

import { EntityTableProps } from '@/components/tables/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import EmbeddedWorkTaskTypeCell from '@/components/tables/cells-v2/specific/EmbeddedWorkTaskTypeCell';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';

export default function WorkProjectSeriesSelectorTable({
  entities
}: EntityTableProps<'workProjectSeries'>) {
  return (
    <>
      <EntityTable
        withSelection={'multiple'}
        cellModel={CellRenderFunction}
        columns={WorkProjectSeriesColumns}
        entityClass={EntityClassMap.workProjectSeries}
      />
    </>
  );
}

export const WorkProjectSeriesColumns: Column<WorkProjectSeriesDto>[] = [
  {
    name: 'WorkTaskType Name',
    uid: 'workTaskType.name',
    sortable: true
  },
  { name: 'Id', uid: 'id', sortable: false },
  {
    name: 'ShortCode',
    uid: 'workTaskType.knowledgeDomain.shortCode',
    sortable: true
  },
  {
    name: getDomainAlias('knowledgeLevel'),
    uid: 'workTaskType.knowledgeLevel.levelOrdinal',
    sortable: true
  },
  {
    name: getDomainAlias('knowledgeDomain'),
    uid: 'workTaskType.knowledgeDomain.name',
    sortable: true
  }
];

const CellRenderFunction = getCellRenderFunction<
  'workProjectSeries',
  WorkProjectSeriesDto
>('workProjectSeries', {
  scheduleId: { type: 'IdInnerCell', component: AnyValueToString },
  'workTaskType.knowledgeDomain.shortCode': {
    type: 'EntityInnerCell',
    component: EmbeddedWorkTaskTypeCell
  },
  'workTaskType.knowledgeDomain.name': {
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
