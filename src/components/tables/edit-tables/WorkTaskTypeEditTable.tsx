'use client';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { useRouter } from 'next/navigation';
import { WorkTaskTypeCell } from '@/components/tables/edit-tables/WorkTaskTypeCell';
import { WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTaskTypeColumns';
import { INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS';

export default function WorkTaskTypeEditTable() {
  const entities = useFilterOutDeletedEntities<WorkTaskTypeDto>(
    EntityClassMap.workTaskType
  );

  const appRouterInstance = useRouter();

  const goToCreate = useCallback(() => {
    appRouterInstance.push('/core/work-task-types/create');
  }, [appRouterInstance]);

  return (
    <FilterSelectEntityTable
      isCompact={true}
      classNames={{
        wrapper: 'w-[60vw]'
      }}
      entityClass={EntityClassMap.workTaskType}
      entities={entities}
      columns={COLUMNS}
      selectionMode={'none'}
      initialColumns={INITIAL_COLUMNS}
      filterProperty={'name'}
      renderCell={WorkTaskTypeCell}
      addRow={goToCreate}
    />
  );
}

const COLUMNS: Column<WorkTaskTypeDto>[] = [
  { name: 'Delete', uid: 'id', sortable: false },
  ...WORK_TASK_TYPE_COLUMNS
];

const INITIAL_COLUMNS: ColumnUid<WorkTaskTypeDto>[] = [
  ...INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  'id'
];
