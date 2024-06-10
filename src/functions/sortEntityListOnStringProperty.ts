import { StringPropertyKey } from '@/types';

export type SortDirection = 'asc' | 'desc';

const ascStringComparator = (entityStringA: string, entityStringB: string) => {
  return entityStringA.localeCompare(entityStringB);
};

export function sortEntityListOnStringProperty<T>(
  entityList: T[],
  stringPropertyKey: StringPropertyKey<T>,
  direction: SortDirection
) {
  const stringComparator = getEntityStringComparator<T>(stringPropertyKey);
  const ascSorted = entityList.toSorted(stringComparator);
  return direction === 'asc' ? ascSorted : ascSorted.reverse();
}

export function getEntityStringComparator<T>(
  stringPropertyKey: StringPropertyKey<T>
) {
  return (entityA: T, entityB: T) => {
    return ascStringComparator(
      entityA[stringPropertyKey] as string,
      entityB[stringPropertyKey] as string
    );
  };
}
