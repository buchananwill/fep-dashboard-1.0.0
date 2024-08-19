'use client';
import React from 'react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { Paths } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { renderWorkTaskTypeAttributeCell } from '@/components/tables/selectorTables/renderWorkTaskTypeAttributeCell';

export const INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS: Paths<WorkTaskTypeDto>[] =
  ['name', 'knowledgeDomain.name', 'knowledgeLevel.levelOrdinal'];
export const WORK_TASK_TYPE_COLUMNS: Column<WorkTaskTypeDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Subject', uid: 'knowledgeDomain.name', sortable: true },
  { name: 'Year', uid: 'knowledgeLevel.levelOrdinal', sortable: true }
];

export default function WorkTaskTypeSelectorTable({
  workTaskTypes
}: {
  workTaskTypes: WorkTaskTypeDto[];
}) {
  return (
    <FilterSelectEntityTable
      entities={workTaskTypes}
      initialColumns={INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS}
      filterProperty={'name'}
      renderCell={renderWorkTaskTypeAttributeCell}
      columns={WORK_TASK_TYPE_COLUMNS}
      entityClass={EntityClassMap.workTaskType}
    />
  );
}
