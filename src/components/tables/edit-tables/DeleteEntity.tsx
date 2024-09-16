import { HasId } from '@/api/types';
import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { useDtoStoreDelete } from 'dto-stores/dist/hooks/main/store/useDtoStoreDelete';
import React, { useCallback } from 'react';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { TrashIcon } from '@heroicons/react/24/outline';

export function DeleteEntity<T extends HasId>({
  entity,
  entityClass
}: NextUiCellComponentProps<T>) {
  const { dispatchDeletion, deleted } = useDtoStoreDelete(
    entity.id,
    entityClass
  );

  const handleDelete = useCallback(() => {
    dispatchDeletion((list) => [...list, entity.id]);
  }, [entity, dispatchDeletion]);

  return (
    <TwoStageClick
      onPress={handleDelete}
      isDisabled={deleted}
      isIconOnly={true}
      className={'p-1'}
    >
      <TrashIcon />
    </TwoStageClick>
  );
}
