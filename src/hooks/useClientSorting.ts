import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { NumberPropertyKey, StringPropertyKey } from '@/types';
import { useMemo, useState } from 'react';
import { SortDescriptor } from '@nextui-org/react';
import { get, sortBy } from 'lodash';

export function useClientSideSorting<T extends HasIdClass<Identifier>>(
  sortableItems: T[],
  initialSortKey: StringPropertyKey<T> | NumberPropertyKey<T>,
  initialDirection: 'ascending' | 'descending'
) {
  // Set up sorting
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: initialSortKey as string | number,
    direction: initialDirection
  });
  const sortedItems = useMemo(() => {
    const mutableList = [...sortableItems];
    const sorted = sortBy(mutableList, [
      (item) => {
        const value = get(item, String(sortDescriptor.column));
        const valueType = typeof value;
        return valueType === 'string' ? value.toLowerCase() : value;
      }
    ]);
    return (
      sortDescriptor.direction === 'ascending' ? sorted : sorted.reverse()
    ) as T[];

    // return mutableList.sort((a: T, b: T) => {
    //   const first = a[sortDescriptor.column as keyof T] as number;
    //   const second = b[sortDescriptor.column as keyof T] as number;
    //
    //   console.log('a:', a, first, 'b:', b, second);
    //   const cmp = first < second ? -1 : first > second ? 1 : 0;
    //
    //   return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    // });
  }, [sortDescriptor, sortableItems]);
  return { sortDescriptor, onSortChange: setSortDescriptor, sortedItems };
}
