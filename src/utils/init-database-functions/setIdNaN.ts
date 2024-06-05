import { HasNumberId } from '@/api/main';

export function setIdNaN<T extends HasNumberId>(entity: T) {
  const clone = structuredClone(entity);
  clone.id = NaN;
  return clone;
}

export function setAllIdNaN<T extends HasNumberId>(entityList: T[]): T[] {
  return entityList.map(setIdNaN);
}
