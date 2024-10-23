'use client';
import React from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

import { WorkTaskTypeCell } from '@/components/tables/cells-v2/WorkTaskTypeCell';
import { WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTaskTypeColumns';
import { INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS';

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
      renderCell={WorkTaskTypeCell}
      columns={WORK_TASK_TYPE_COLUMNS}
      entityClass={EntityClassMap.workTaskType}
    />
  );
}
