import React, { ReactElement, useMemo } from 'react';
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import { Identifier } from 'dto-stores';
import { Column, StringPropertyKey } from '@/types';
import { HasIdClass } from '@/api/types';
import { useClientSidePagination } from '@/hooks/useClientSidePagination';
import { useDynamicColumnVisibility } from '@/hooks/useDynamicColumnVisibility';
import { useClientSideFiltering } from '@/hooks/useClientSideFiltering';
import { useClientFilteredSortedPagination } from '@/hooks/useClientFilteredSortedPagination';
import { useClientSideSorting } from '@/hooks/useClientSorting';
import { useDeselectVisible } from '@/hooks/useDeselectVisible';
import { ColumnDropdown } from '@/components/generic/ColumnDropdown';

export default function FilterSelectEntityTable<
  T extends HasIdClass<Identifier>
>({
  entities,
  initialColumns,
  filterProperty,
  idClass,
  renderCell,
  columns,
  entityClass,
  selectionMode = 'multiple'
}: {
  entityClass: string;
  idClass?: 'string' | 'number';
  entities: T[];
  columns: Column<T>[];
  initialColumns: (keyof T)[];
  filterProperty: StringPropertyKey<T>;
  renderCell: (
    entity: T,
    columnKey: React.Key
  ) => string | number | ReactElement;
} & Pick<TableProps, 'selectionMode'>) {
  const { rowsPerPage, page, setPage, onRowsPerPageChange } =
    useClientSidePagination(10);
  const { visibleColumns, setVisibleColumns, headerColumns } =
    useDynamicColumnVisibility(initialColumns, columns);
  const { filterValue, filteredItems, pages, onSearchChange, onClear } =
    useClientSideFiltering(entities, filterProperty, rowsPerPage, setPage);

  const { sortDescriptor, setSortDescriptor, sortedItems } =
    useClientSideSorting(
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
  const { handleChange, selectedSet, dispatchSelected } = useEntitySelection<
    T,
    Identifier
  >(entityClass, visibleItemsRef, idClass);
  const deselectVisible = useDeselectVisible(dispatchSelected, visibleItemsRef);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<MagnifyingGlassIcon className={'h-6 w-6'} />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Button onPress={deselectVisible}>Deselect Page</Button>
          <div className="flex gap-3">
            <ColumnDropdown
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
              columns={columns}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {entities.length} {entityClass}.
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    columns,
    entityClass,
    onClear,
    rowsPerPage,
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    entities.length
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedSet.size === entities.length
            ? 'All items selected'
            : `${selectedSet.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedSet, page, pages, filteredItems.length, entities.length]);

  return (
    <Table
      aria-label="Work Task Type Table to enable selection for related context."
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'h-[55vh] max-w-[45vw] ml-auto mr-auto'
      }}
      selectedKeys={selectedSet}
      className={'pointer-events-auto'}
      selectionMode={selectionMode}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={handleChange}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={visibleItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
