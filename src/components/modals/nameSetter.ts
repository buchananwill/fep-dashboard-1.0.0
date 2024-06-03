import { HasId } from '@/api/main';
import { Dispatch, SetStateAction } from 'react';
import { RenameContextKey } from '@/components/modals/RenameModal';
import { useEditEntityTextAttribute } from '@/components/modals/useEditEntityTextAttribute';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';

export function getRenameContextKey<T extends HasId>(
  entityClass: string,
  entity: T
) {
  return `${entityClass}:${entity?.id}:${RenameContextKey}`;
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
  return useEditEntityTextAttribute(
    entityClass,
    entity,
    listenerKey,
    nameAccessor,
    nameSetter,
    dispatchWithoutControl
  );
}
