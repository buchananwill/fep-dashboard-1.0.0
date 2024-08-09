import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { Column, StringPropertyKey } from '@/types';
import { useClientSidePagination } from '@/hooks/useClientSidePagination';
import { useDynamicColumnVisibility } from '@/hooks/useDynamicColumnVisibility';
import {
  FilterablePropertyKey,
  useClientSideFiltering
} from '@/hooks/useClientSideFiltering';
import { useClientSideSorting } from '@/hooks/useClientSorting';
import { useClientFilteredSortedPagination } from '@/hooks/useClientFilteredSortedPagination';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import {
  useDeselectVisible,
  useSelectVisible
} from '@/hooks/useDeselectVisible';
import { GetFieldType } from '@/functions/allowingNestedFiltering';
import { Paths } from 'type-fest';

export function useFilterSortPaginateSelect<
  T extends HasIdClass<Identifier>,
  TPath extends string & GetFieldType<T, TPath> extends string
    ? Paths<T>
    : never
>(
  initialColumns: (keyof T)[],
  columns: Column<T>[],
  entities: T[],
  initialFilterProperty: TPath,
  entityClass: string,
  idClass: 'string' | 'number',
  initialRowsPerPage = 10
) {
  const { rowsPerPage, page, setPage, onRowsPerPageChange } =
    useClientSidePagination(initialRowsPerPage);
  const { visibleColumns, setVisibleColumns, headerColumns } =
    useDynamicColumnVisibility(initialColumns, columns);
  const {
    filterValue,
    filteredItems,
    pages,
    onSearchChange,
    onClear,
    filteredItemsRef,
    onFilterPropertyChange,
    currentFilterProperty
  } = useClientSideFiltering(
    entities,
    initialFilterProperty,
    rowsPerPage,
    setPage
  );

  const { sortDescriptor, onSortChange, sortedItems } = useClientSideSorting(
    filteredItems,
    'name' as StringPropertyKey<T>,
    'ascending'
  );

  const { visibleItems, visibleItemsRef } = useClientFilteredSortedPagination(
    page,
    rowsPerPage,
    sortedItems
  );

  // Set up selection
  const { onSelectionChange, selectedKeys, dispatchSelected } =
    useEntitySelection<T, Identifier>(entityClass, filteredItemsRef, idClass);
  const deselectVisible = useDeselectVisible(dispatchSelected, visibleItemsRef);
  const selectVisible = useSelectVisible(dispatchSelected, visibleItemsRef);
  return {
    tableContentProps: {
      onSelectionChange,
      onSortChange,
      selectedKeys,
      visibleItems,
      headerColumns,
      sortDescriptor
    },
    paginationProps: {
      page,
      total: pages,
      onChange: setPage
    },
    columnDropdownProps: {
      visibleColumns,
      setVisibleColumns,
      columns
    },
    filterProps: {
      value: filterValue,
      onValueChange: onSearchChange,
      onClear
    },
    rowsPerPageProps: {
      value: rowsPerPage,
      onChange: onRowsPerPageChange
    },
    filterPropertySelectProps: {
      value: currentFilterProperty,
      onChange: onFilterPropertyChange
    },
    deselectVisible,
    selectVisible,
    filteredItems
  };
}
