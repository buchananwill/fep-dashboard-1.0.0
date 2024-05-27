import { HasId } from '@/api/main';
import { Dispatch, SetStateAction, useCallback } from 'react';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { getRenameContextKey } from '@/components/modals/nameSetter';
import { useGlobalController } from 'selective-context';
import { useEffectSyncToMemo } from 'react-d3-force-graph';

export function useEditEntityTextAttribute<T extends HasId>(
  entityClass: string,
  entity: T,
  listenerKey: string,
  textAccessor: (entity: T) => string,
  textSetter: (entity: T, value: string) => T,
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>
) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const contextKey = getRenameContextKey(entityClass, entity);
  const { currentState, dispatch: dispatchTextChange } =
    useGlobalController<string>({
      contextKey,
      listenerKey: 'controller',
      initialValue: textAccessor(entity)
    });

  const onConfirm = useCallback(() => {
    if (dispatchWithoutControl !== undefined) {
      dispatchWithoutControl((dto) => textSetter(dto, currentState));
    }
  }, [currentState, dispatchWithoutControl, textSetter]);

  return {
    contextKey,
    onConfirm,
    isOpen,
    onOpenChange,
    onClose,
    onOpen,
    listenerKey,
    dispatchTextChange
  };
}
