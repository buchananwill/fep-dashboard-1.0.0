import { DispatchState, NumberPropertyKey, StringPropertyKey } from '@/types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { HasId, HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { camelCase } from 'lodash';

export type FilterablePropertyKey<T> =
  | StringPropertyKey<T>
  | NumberPropertyKey<T>;

export function useClientSideFiltering<T extends HasIdClass<Identifier>>(
  entities: T[],
  initialFilterProperty: FilterablePropertyKey<T>,
  rowsPerPage: number,
  setPage: DispatchState<number>
) {
  // Set up filtering
  const [filterValue, setFilterValue] = useState('');
  const [currentFilterProperty, setCurrentFilterProperty] = useState(
    initialFilterProperty
  );
  const filteredItemsRef = useRef<T[]>([]);
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let filteredEntities = [...entities];

    if (hasSearchFilter) {
      filteredEntities = filteredEntities.filter((entity) =>
        String(entity[currentFilterProperty])
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    return filteredEntities;
  }, [entities, filterValue, hasSearchFilter, currentFilterProperty]);
  filteredItemsRef.current = filteredItems;

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

  const onFilterPropertyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentFilterProperty(e.target.value as FilterablePropertyKey<T>);
    },
    []
  );
  return {
    filterValue,
    filteredItems,
    pages,
    onSearchChange,
    onClear,
    filteredItemsRef,
    currentFilterProperty,
    onFilterPropertyChange
  };
}
