import { HasIdClass, Identifier } from 'dto-stores';

export function getIdList<T extends HasIdClass<U>, U extends Identifier>(
  entities: T[]
): U[] {
  return entities.map((role) => role.id);
}