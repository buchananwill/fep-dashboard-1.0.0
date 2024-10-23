'use client';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { useRouter } from 'next/navigation';
import { WorkTaskTypeCell } from '@/components/tables/cells/WorkTaskTypeCell';
import { WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTaskTypeColumns';
import { INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS } from '@/components/tables/selectorTables/INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS';
import { useGlobalController } from 'selective-context';
import ResourceRequirementItemModal from '@/components/modals/ResourceRequirementItemModal';
import EntityEditTable from '@/components/tables/edit-v2/EntityEditTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export function useNavigationCallback(href: string) {
  const appRouterInstance = useRouter();

  return useCallback(() => {
    appRouterInstance.push(href);
  }, [appRouterInstance, href]);
}

export const workTaskTypeIdInModal = 'workTaskTypeIdInModal';
export default function WorkTaskTypeEditTable() {
  const goToCreate = useNavigationCallback('/core/work-task-types/create');

  const { currentState, dispatch } = useGlobalController<number | 'closed'>({
    contextKey: workTaskTypeIdInModal,
    listenerKey: 'workTaskTypeEditTable',
    initialValue: 'closed'
  });

  const modalIsOpen = currentState !== 'closed';

  return (
    <>
      <EntityEditTable
        entityClass={EntityClassMap.workTaskType}
        columns={COLUMNS}
        cellModel={WorkTaskTypeCell}
        defaultSort={Sorts.name}
        // addRow={goToCreate}
      />
      <ResourceRequirementItemModal
        workTaskTypeId={currentState === 'closed' ? undefined : currentState}
        isOpen={modalIsOpen}
      />
    </>
  );
}

const COLUMNS: Column<WorkTaskTypeDto>[] = [
  { name: 'Actions', uid: 'id', sortable: false },
  ...WORK_TASK_TYPE_COLUMNS
];

const INITIAL_COLUMNS: ColumnUid<WorkTaskTypeDto>[] = [
  ...INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS,
  'id'
];
