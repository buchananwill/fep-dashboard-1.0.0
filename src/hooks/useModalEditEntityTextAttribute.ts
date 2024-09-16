import React, { useCallback } from 'react';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { getEditTextContextKey } from '@/functions/nameSetter';
import { useGlobalController } from 'selective-context';
import { useEditTextProperty } from '@/hooks/useEditTextProperty';
import { StringPropertyKey } from '@/types';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { get } from 'lodash';

export function useModalEditEntityTextAttribute<T extends HasId>(
  entityClass: string,
  entity: T,
  stringPath: TypedPaths<T, string>,
  dispatchWithoutControl?: React.Dispatch<React.SetStateAction<T>>
) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const contextKey = getEditTextContextKey(entityClass, entity, stringPath);
  const { currentState, dispatch: dispatchTextChange } =
    useGlobalController<string>({
      contextKey,
      listenerKey: `${entityClass}:${entity.id}:replacement-value-controller`,
      initialValue: get(entity, stringPath)
    });

  const update = useEditTextProperty(dispatchWithoutControl, stringPath);

  const onConfirm = useCallback(() => {
    update(currentState);
  }, [currentState, update]);

  return {
    contextKey,
    onConfirm,
    isOpen,
    onOpenChange,
    onClose,
    onOpen,
    dispatchTextChange
  };
}
