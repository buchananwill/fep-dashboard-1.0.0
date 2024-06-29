import { DispatchState, StringPropertyKey } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { HasId, HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';

export function useClientSideFiltering<T extends HasIdClass<Identifier>>(
  entities: T[],
  filterProperty: StringPropertyKey<T>,
  rowsPerPage: number,
  setPage: DispatchState<number>
) {
  // Set up filtering
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let filteredEntities = [...entities];

    if (hasSearchFilter) {
      filteredEntities = filteredEntities.filter((entity) =>
        (entity[filterProperty] as string)
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredEntities;
  }, [entities, filterValue, hasSearchFilter, filterProperty]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue('');
      }
    },
    [setPage]
  );

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, [setPage]);
  return { filterValue, filteredItems, pages, onSearchChange, onClear };
}
