import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { useMemo, useRef } from 'react';

export function useClientFilteredSortedPagination<
  T extends HasIdClass<Identifier>
>(page: number, rowsPerPage: number, sortedItems: Array<T>) {
  // Determine final visible items
  const visibleItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const visibleItemsRef = useRef(visibleItems);
  visibleItemsRef.current = visibleItems;
  return { visibleItems, visibleItemsRef };
}