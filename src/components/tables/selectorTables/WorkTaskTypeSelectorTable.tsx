'use client';
import React from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { Paths } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { renderWorkTaskTypeAttributeCell } from '@/components/tables/selectorTables/renderWorkTaskTypeAttributeCell';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';

export const INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS: Paths<WorkTaskTypeDto>[] =
  [
    'name',
    'knowledgeDomain.name',
    'knowledgeDomain.shortCode',
    'knowledgeLevel.levelOrdinal'
  ];
export const WORK_TASK_TYPE_COLUMNS: Column<WorkTaskTypeDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'knowledgeDomain.name',
    sortable: true
  },
  { name: 'ShortCode', uid: 'knowledgeDomain.shortCode', sortable: true },
  {
    name: startCase(getDomainAlias('knowledgeLevel')),
    uid: 'knowledgeLevel.levelOrdinal',
    sortable: true
  },
  {
    name: startCase(getDomainAlias('knowledgeLevel') + 'Name'),
    uid: 'knowledgeLevel.name',
    sortable: true
  }
];

export default function WorkTaskTypeSelectorTable({
  entities
}: {
  entities: WorkTaskTypeDto[];
}) {
  return (
    <FilterSelectEntityTable
      entities={entities}
      initialColumns={INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS}
      filterProperty={'name'}
      renderCell={renderWorkTaskTypeAttributeCell}
      columns={WORK_TASK_TYPE_COLUMNS}
      entityClass={EntityClassMap.workTaskType}
    />
  );
}
