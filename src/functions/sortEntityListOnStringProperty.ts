import { StringPropertyKey } from '@/types';

export type SortDirection = 'asc' | 'desc';

const ascStringPredicate = (entityStringA: string, entityStringB: string) => {
  return entityStringA.localeCompare(entityStringB);
};

export function sortEntityListOnStringProperty<T>(
  entityList: T[],
  stringPropertyKey: StringPropertyKey<T>,
  direction: SortDirection
) {
  const stringKeyPredicate = (entityA: T, entityB: T) => {
    return ascStringPredicate(
      entityA[stringPropertyKey] as string,
      entityB[stringPropertyKey] as string
    );
  };
  const ascSorted = entityList.toSorted(stringKeyPredicate);
  return direction === 'asc' ? ascSorted : ascSorted.reverse();
}
