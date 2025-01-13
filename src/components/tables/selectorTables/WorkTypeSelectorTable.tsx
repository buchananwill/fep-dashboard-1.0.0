'use client';
import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';

import { WorkTypeCell } from '@/components/tables/cells-v2/WorkTypeCell';
import { WORK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTypeColumns';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export default function WorkTypeSelectorTable({
  entities
}: {
  entities: WorkTypeDto[];
}) {
  return (
    <EntityTable
      withSelection={'multiple'}
      entityClass={EntityClassMap.workType}
      columns={WORK_TYPE_COLUMNS}
      cellModel={WorkTypeCell}
      defaultSort={Sorts.name}
    />
  );
}
