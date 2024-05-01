import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import { HasId } from '@/app/api/main';
import { Dispatch, SetStateAction } from 'react';
import { RenameContextKey } from '@/components/modals/RenameModal';
import { useEditEntityText } from '@/components/modals/useRenameEntity';

export function getRenameContextKey<T extends HasId>(entityClass: string, entity: T) {
  return `${entityClass}:${entity.id}:${RenameContextKey}`;
}

export function nameAccessor<T extends HasNameDto>(entity: T) {
  return entity.name;
}

export function nameSetter<T extends HasNameDto>(entity: T, value: string) {
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