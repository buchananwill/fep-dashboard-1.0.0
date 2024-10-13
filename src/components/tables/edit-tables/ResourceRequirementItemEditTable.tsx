'use client';
import {
  ResourceRequirementItemDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { useRouter } from 'next/navigation';
import { WorkTaskTypeCell } from '@/components/tables/edit-tables/WorkTaskTypeCell';
import { WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTaskTypeColumns';
import { INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS';
import { ResourceRequirementItemCells } from '@/components/tables/edit-tables/ResourceRequirementItemCells';

export default function ResourceRequirementItemEditTable() {
  const entities = useFilterOutDeletedEntities<ResourceRequirementItemDto>(
    EntityClassMap.resourceRequirementItem
  );
  // const goToCreate = useNavigationCallback('/core/work-task-types/create');

  return (
    <FilterSelectEntityTable
      isCompact={true}
      classNames={{
        wrapper: 'w-[60vw]'
      }}
      entityClass={EntityClassMap.resourceRequirementItem}
      entities={entities}
      columns={COLUMNS}
      selectionMode={'none'}
      initialColumns={INITIAL_COLUMNS}
      filterProperty={'id'}
      renderCell={ResourceRequirementItemCells}
      // addRow={goToCreate}
    />
  );
}

const COLUMNS: Column<ResourceRequirementItemDto>[] = [
  { name: 'Delete', uid: 'id', sortable: false },
  { name: 'ProviderRoleType', uid: 'providerRoleType' },
  { name: 'AssetRoleType', uid: 'assetRoleType' },
  { name: 'WorkTaskType', uid: 'workTaskTypeId' }
];

const INITIAL_COLUMNS: ColumnUid<ResourceRequirementItemDto>[] = [
  'id',
  'assetRoleType',
  'providerRoleType',
  'workTaskTypeId'
];
