'use client';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  WORK_TASK_TYPE_COLUMNS
} from '@/components/tables/selectorTables/WorkTaskTypeSelectorTable';
import { Column, ColumnUid } from '@/types';
import { get } from 'lodash';
import { DeleteEntity } from '@/components/tables/edit-tables/DeleteEntity';
import {
  getCellRenderFunction,
  NextUiCellComponentProps
} from '@/components/tables/GetCellRenderFunction';
import { HasId } from '@/api/types';
import { StringValueChip } from '@/components/generic/StringValueChip';
import { useFilterOutDeletedEntities } from '@/components/tables/edit-tables/useFilterOutDeletedEntities';
import { useRouter } from 'next/navigation';

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
  { name: 'Delete', uid: 'action', sortable: false },
  ...WORK_TASK_TYPE_COLUMNS
];

const INITIAL_COLUMNS: ColumnUid<WorkTaskTypeDto>[] = [
  ...INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  'action'
];

export const WorkTaskTypeCell = getCellRenderFunction<WorkTaskTypeDto>(
  {
    name: SimpleValueToString,
    'knowledgeDomain.name': SimpleValueToString,
    'knowledgeDomain.shortCode': StringValueChip,
    'knowledgeLevel.levelOrdinal': SimpleValueToString,
    'knowledgeLevel.name': SimpleValueToString,
    action: DeleteEntity
  },
  EntityClassMap.workTaskType
);

function SimpleValueToString<T extends HasId>({
  entity,
  path
}: NextUiCellComponentProps<T>) {
  const value = get(entity, path);

  return String(value);
}
