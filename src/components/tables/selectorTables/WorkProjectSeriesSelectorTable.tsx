'use client';
import React from 'react';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesDto } from '@/api/generated-types/generated-types_';
import { getDomainAlias } from '@/api/getDomainAlias';

import { EntityTableProps } from '@/components/tables/types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import EmbeddedWorkTypeCell from '@/components/tables/cells-v2/specific/EmbeddedWorkTypeCell';
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
    name: 'WorkType Name',
    uid: 'workType.name',
    sortable: true
  },
  { name: 'Id', uid: 'id', sortable: false },
  {
    name: 'ShortCode',
    uid: 'workType.knowledgeDomain.shortCode',
    sortable: true
  },
  {
    name: getDomainAlias('knowledgeLevel'),
    uid: 'workType.knowledgeLevel.levelOrdinal',
    sortable: true
  },
  {
    name: getDomainAlias('knowledgeDomain'),
    uid: 'workType.knowledgeDomain.name',
    sortable: true
  }
];

const CellRenderFunction = getCellRenderFunction<
  'workProjectSeries',
  WorkProjectSeriesDto
>('workProjectSeries', {
  scheduleId: { type: 'IdInnerCell', component: AnyValueToString },
  'workType.knowledgeDomain.shortCode': {
    type: 'EntityInnerCell',
    component: EmbeddedWorkTypeCell
  },
  'workType.knowledgeDomain.name': {
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
