import { RenameContextKey } from '@/components/modals/RenameModal';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import { HasId } from '@/api/types';

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

