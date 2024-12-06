import { TypeDto } from '@/api/generated-types/generated-types_';
import { NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useCallback, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export function useCreateTypeProps<T extends TypeDto<any, any>>(
  serverAction: (newType: T) => Promise<T>,
  entityClass: string
) {
  const dispatch = NamespacedHooks.useDispatch<T[]>(
    entityClass,
    KEY_TYPES.MASTER_LIST
  );

  const onConfirm = useCallback(
    async (newType: T) => {
      const userRoleTypeDto = await serverAction(newType);
      dispatch((prevList) => [...prevList, userRoleTypeDto]);
    },
    [dispatch, serverAction]
  );

  const [opened, { open, close }] = useDisclosure();
  return {
    onConfirm,
    opened: opened,
    onClose: close,
    onOpen: open,
    entityClass
  };
}
