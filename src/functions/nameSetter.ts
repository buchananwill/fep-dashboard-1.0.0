import { HasNameDto } from '@/api/generated-types/generated-types_';
import { HasId, IdWrapper } from '@/api/types';

export function getEditTextContextKey<T extends HasId>(
  entityClass: string,
  entity: T,
  stringPath: string
) {
  return `${entityClass}:${entity?.id}:${stringPath}`;
}

export function nameAccessor<T extends HasNameDto>(entity?: T) {
  if (entity === undefined) throw Error('Entity undefined');
  return entity.name;
}

export function nameAccessorInWrapper<T extends HasNameDto>(
  entity?: IdWrapper<T>
) {
  return nameAccessor(entity?.data);
}

export function nameSetter<T extends HasNameDto>(entity: T, value: string) {
  return { ...entity, name: value };
}

export function identityFunction<T>(param: T) {
  return param;
}
