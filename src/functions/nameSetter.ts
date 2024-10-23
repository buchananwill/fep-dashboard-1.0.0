import { HasNameDto } from '@/api/generated-types/generated-types';
import { HasId } from '@/api/types';

export function getEditTextContextKey<T extends HasId>(
  entityClass: string,
  entity: T,
  stringPath: string
) {
  return `${entityClass}:${entity?.id}:${stringPath}`;
}

export function nameAccessor<T extends HasNameDto>(entity: T) {
  return entity.name;
}

export function nameSetter<T extends HasNameDto>(entity: T, value: string) {
  return { ...entity, name: value };
}
