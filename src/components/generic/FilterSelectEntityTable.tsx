import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from '@nextui-org/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useEntitySelection } from '@/hooks/useEntitySelection';
import { Identifier } from 'dto-stores';
import { Column, StringPropertyKey } from '@/types';
import { HasIdClass } from '@/api/types';

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
  const [filterValue, setFilterValue] = useState('');

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns as Identifier[])
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

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

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const visibleItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const visibleItemsRef = useRef(visibleItems);
  visibleItemsRef.current = visibleItems;

  const { handleChange, selectedSet, dispatchSelected } = useEntitySelection<
    T,
    Identifier
  >(entityClass, visibleItemsRef, idClass);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const deselectVisible = useCallback(() => {
    dispatchSelected((selectionList) => {
      const newSelectionSet = new Set(selectionList);
      visibleItemsRef.current.forEach((entityItem) =>
        newSelectionSet.delete(entityItem.id)
      );
      return [...newSelectionSet.values()];
    });
  }, [dispatchSelected]);

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
