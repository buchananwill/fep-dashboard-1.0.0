import React, { useMemo } from 'react';
import {
  Button,
  ButtonGroup,
  Input,
  Pagination,
  TableProps
} from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Identifier } from 'dto-stores';
import { Column, StringPropertyKey } from '@/types';
import { HasIdClass } from '@/api/types';
import { ColumnDropdown } from '@/components/generic/ColumnDropdown';
import { useFilterSortPaginateSelect } from '@/hooks/useFilterSortPaginateSelect';
import {
  FilterSortPaginateTableContent,
  TableCellRenderer
} from '@/components/generic/FilterSortPaginateTableContent';

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
  selectionMode = 'multiple',
  dynamicColumns = true
}: {
  entityClass: string;
  idClass?: 'string' | 'number';
  entities: T[];
  columns: Column<T>[];
  initialColumns: (keyof T)[];
  filterProperty: StringPropertyKey<T>;
  renderCell: TableCellRenderer<T>;
  dynamicColumns?: boolean;
} & Pick<TableProps, 'selectionMode'>) {
  const {
    paginationProps,
    columnDropdownProps,
    filterProps,
    tableContentProps,
    rowsPerPageProps,
    deselectVisible,
    selectVisible,
    filterPropertySelectProps,
    filteredItems
  } = useFilterSortPaginateSelect(
    initialColumns,
    columns,
    entities,
    filterProperty,
    entityClass,
    idClass ?? 'number'
  );

  const { selectedKeys } = tableContentProps;

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<MagnifyingGlassIcon className={'h-6 w-6'} />}
            {...filterProps}
          />

          <ButtonGroup>
            Page:
            <Button onPress={selectVisible}>Select</Button>
            <Button onPress={deselectVisible}>Deselect</Button>
          </ButtonGroup>
          {dynamicColumns && (
            <div className="flex gap-3">
              <ColumnDropdown {...columnDropdownProps} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {entities.length} {entityClass}.
          </span>
          <label className="flex items-center text-small text-default-400">
            Filter By:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              value={filterPropertySelectProps.value as string}
              onChange={filterPropertySelectProps.onChange}
            >
              {columns.map((column) => {
                return (
                  <option key={column.uid} value={column.uid}>
                    {column.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              {...rowsPerPageProps}
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
    filterPropertySelectProps.onChange,
    filterPropertySelectProps.value,
    dynamicColumns,
    columns,
    selectVisible,
    deselectVisible,
    entityClass,
    filterProps,
    columnDropdownProps,
    rowsPerPageProps,
    entities.length
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.size === entities.length
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          {...paginationProps}
        />
      </div>
    );
  }, [paginationProps, selectedKeys, entities.length, filteredItems]);

  return (
    <FilterSortPaginateTableContent
      {...tableContentProps}
      selectionMode={selectionMode}
      isHeaderSticky
      aria-label="Table to enable selection for related context."
      topContent={topContent}
      topContentPlacement={'outside'}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'h-[55vh] max-w-[45vw] ml-auto mr-auto'
      }}
      className={'pointer-events-auto'}
      renderCell={renderCell}
    />
  );
}
