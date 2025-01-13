'use client';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column } from '@/types';
import { useRouter } from 'next/navigation';
import { WorkTypeCell } from '@/components/tables/cells-v2/WorkTypeCell';
import { WORK_TYPE_COLUMNS } from '@/components/tables/selectorTables/workTypeColumns';
import { useGlobalController } from 'selective-context';
import ResourceRequirementItemModal from '@/components/modals/ResourceRequirementItemModal';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export function useNavigationCallback(href: string) {
  const appRouterInstance = useRouter();

  return useCallback(() => {
    appRouterInstance.push(href);
  }, [appRouterInstance, href]);
}

export const workTypeIdInModal = 'workTypeIdInModal';
const noRriModal = 'closed';
export default function WorkTypeEditTable() {
  const goToCreate = useNavigationCallback('/core/work-types/create');

  const { currentState, dispatch } = useGlobalController<number | 'closed'>({
    contextKey: workTypeIdInModal,
    listenerKey: 'workTypeEditTable',
    initialValue: noRriModal
  });

  const onClose = useCallback(() => {
    dispatch(noRriModal);
  }, [dispatch]);

  const modalIsOpen = currentState !== noRriModal;

  return (
    <>
      <EntityTable
        entityClass={EntityClassMap.workType}
        columns={COLUMNS}
        cellModel={WorkTypeCell}
        defaultSort={Sorts['workTypeCategory.name']}
        // addRow={goToCreate}
      />
      {currentState === noRriModal ? null : (
        <ResourceRequirementItemModal
          workTypeId={currentState}
          opened={modalIsOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

const COLUMNS: Column<WorkTypeDto>[] = [
  { name: 'Actions', uid: 'id', sortable: false },
  ...WORK_TYPE_COLUMNS
];
