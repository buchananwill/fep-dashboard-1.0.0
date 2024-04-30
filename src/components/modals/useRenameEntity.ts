import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { HasId } from '@/app/api/main';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelectiveContextGlobalController } from 'selective-context';
import { RenameContextKey } from '@/components/modals/RenameModal';
import { useDisclosure } from '@nextui-org/use-disclosure';

function getRenameContextKey<T extends HasId>(entityClass: string, entity: T) {
  return `${entityClass}:${entity.id}:${RenameContextKey}`;
}

function nameAccessor<T extends HasNameDto>(entity: T) {
  return entity.name;
}
function nameSetter<T extends HasNameDto>(entity: T, value: string) {
  return { ...entity, name: value };
}

export function useRenameEntity<T extends HasNameDto & HasId>(
  entityClass: string,
  entity: T,
  listenerKey: string,
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>
) {
  return useEditEntityText(
    entityClass,
    entity,
    listenerKey,
    nameAccessor,
    nameSetter,
    dispatchWithoutControl
  );
}

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
