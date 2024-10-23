'use client';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
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
const noRriModal = 'closed';
export default function WorkTaskTypeEditTable() {
  const goToCreate = useNavigationCallback('/core/work-task-types/create');

  const { currentState, dispatch } = useGlobalController<number | 'closed'>({
    contextKey: workTaskTypeIdInModal,
    listenerKey: 'workTaskTypeEditTable',
    initialValue: noRriModal
  });

  const onClose = useCallback(() => {
    dispatch(noRriModal);
  }, [dispatch]);

  const modalIsOpen = currentState !== noRriModal;

  return (
    <>
      <EntityEditTable
        entityClass={EntityClassMap.workTaskType}
        columns={COLUMNS}
        cellModel={WorkTaskTypeCell}
        defaultSort={Sorts.name}
        // addRow={goToCreate}
      />
      {currentState === noRriModal ? null : (
        <ResourceRequirementItemModal
          workTaskTypeId={currentState}
          opened={modalIsOpen}
          onClose={onClose}
        />
      )}
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
