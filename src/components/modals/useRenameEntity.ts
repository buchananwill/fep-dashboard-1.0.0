import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { HasId } from '@/app/api/main';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelectiveContextGlobalController } from 'selective-context';
import { RenameContextKey } from '@/components/modals/RenameModal';
import { useDisclosure } from '@nextui-org/use-disclosure';

function getRenameContextKey<T extends HasId>(entityClass: string, entity: T) {
  return `${entityClass}:${entity.id}:${RenameContextKey}`;
}

export function useRenameEntity<T extends HasNameDto & HasId>(
  entityClass: string,
  entity: T,
  listenerKey: string,
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>
) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const contextKey = getRenameContextKey(entityClass, entity);
  const { currentState, dispatch: dispatchRename } =
    useSelectiveContextGlobalController<string>({
      contextKey,
      listenerKey: 'controller',
      initialValue: entity.name
    });

  const onConfirm = useCallback(() => {
    if (dispatchWithoutControl !== undefined) {
      dispatchWithoutControl((dto) => ({ ...dto, name: currentState }));
    }
  }, [currentState, dispatchWithoutControl]);
  return {
    contextKey,
    onConfirm,
    isOpen,
    onOpenChange,
    onClose,
    onOpen,
    listenerKey,
    dispatchRename
  };
}
