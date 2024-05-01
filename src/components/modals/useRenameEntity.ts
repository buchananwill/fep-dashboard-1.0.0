import { HasId } from '@/app/api/main';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelectiveContextGlobalController } from 'selective-context';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { getRenameContextKey } from '@/components/modals/nameSetter';

export function useEditEntityText<T extends HasId>(
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
    useSelectiveContextGlobalController<string>({
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
