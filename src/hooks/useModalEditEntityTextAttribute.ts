import React, { useCallback } from 'react';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { getRenameContextKey } from '@/functions/nameSetter';
import { useGlobalController } from 'selective-context';
import { useEditTextProperty } from '@/hooks/useEditTextProperty';
import { StringPropertyKey } from '@/types';
import { HasId } from '@/api/types';

export function useModalEditEntityTextAttribute<T extends HasId>(
  entityClass: string,
  entity: T,
  stringKey: StringPropertyKey<T>,
  dispatchWithoutControl?: React.Dispatch<React.SetStateAction<T>>
) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const contextKey = getRenameContextKey(entityClass, entity);
  const { currentState, dispatch: dispatchTextChange } =
    useGlobalController<string>({
      contextKey,
      listenerKey: 'controller',
      initialValue: entity[stringKey] as string
    });

  const update = useEditTextProperty(dispatchWithoutControl, stringKey);

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