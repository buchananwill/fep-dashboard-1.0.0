'use client';
import { HasId } from '@/api/types';
import { useDtoStoreDelete } from 'dto-stores/dist/hooks/main/store/useDtoStoreDelete';
import React, { useCallback } from 'react';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { TrashIcon } from '@heroicons/react/24/outline';
import { TableCellDataProps } from '@/components/tables/core-table-types';
import { Identifier } from 'dto-stores';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';

export function DeleteEntity<T extends HasId>({
  entityId
}: TableCellDataProps<T, Identifier>) {
  const { entityClass } = useEntityTableContext();
  const { dispatchDeletion, deleted } = useDtoStoreDelete(
    entityId,
    entityClass
  );
  const handleDelete = useCallback(() => {
    dispatchDeletion((list) => [...list, entityId]);
  }, [entityId, dispatchDeletion]);

  return (
    <TwoStageClick onClick={handleDelete} disabled={deleted}>
      <TrashIcon className={'h-6 w-6'} />
    </TwoStageClick>
  );
}
