import { DispatchState, NumberPropertyKey, StringPropertyKey } from '@/types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { GetFieldType, getValue } from '@/functions/allowingNestedFiltering';
import { Paths } from 'type-fest';

export type FilterablePropertyKey<T> =
  | StringPropertyKey<T>
  | NumberPropertyKey<T>;

export function useClientSideFiltering<
  T extends HasIdClass<Identifier>,
  TPath extends string & GetFieldType<T, TPath> extends string
    ? Paths<T>
    : never
>(
  entities: T[],
  initialFilterProperty: TPath, //FilterablePropertyKey<T>,
  rowsPerPage: number,
  setPage: DispatchState<number>
) {
  // Set up filtering
  const [filterValue, setFilterValue] = useState('');
  const [currentFilterProperty, setCurrentFilterProperty] = useState<TPath>(
    initialFilterProperty
  );
  const filteredItemsRef = useRef<T[]>([]);
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let filteredEntities = [...entities];

    if (hasSearchFilter) {
      filteredEntities = filteredEntities.filter((entity) => {
        const value = String(
          getValue(entity, currentFilterProperty)
        ).toLowerCase() as string;
        return value.toLowerCase().includes(filterValue.toLowerCase());
      });
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
      setCurrentFilterProperty(e.target.value as TPath);
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
