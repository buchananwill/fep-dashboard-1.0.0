'use client';
import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';

import { WorkTaskTypeCell } from '@/components/tables/cells-v2/WorkTaskTypeCell';
import { WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTaskTypeColumns';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export default function WorkTaskTypeSelectorTable({
  entities
}: {
  entities: WorkTaskTypeDto[];
}) {
  return (
    <EntityTable
      withSelection={'multiple'}
      entityClass={EntityClassMap.workTaskType}
      columns={WORK_TASK_TYPE_COLUMNS}
      cellModel={WorkTaskTypeCell}
      defaultSort={Sorts.name}
    />
  );
}
