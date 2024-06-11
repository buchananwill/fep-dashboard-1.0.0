'use client';
import React from 'react';
import {
  Button,
  Chip,
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
  TableRow
} from '@nextui-org/react';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useEntitySelection } from '@/app/service-categories/[id]/work-task-types/_components/useEntitySelection';
import { EntityClassMap } from '@/api/entity-class-map';

const INITIAL_VISIBLE_COLUMNS: (keyof WorkTaskTypeDto)[] = [
  'name',
  'knowledgeDomainName',
  'knowledgeLevelName'
];

const columns: {
  name: string;
  uid: keyof WorkTaskTypeDto;
  sortable?: boolean;
}[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Subject', uid: 'knowledgeDomainName', sortable: true },
  { name: 'Year', uid: 'knowledgeLevelName', sortable: true },
  { name: 'Validation', uid: 'deliveryValidationTypeName', sortable: true }
];

export default function WorkTaskTypeTable({
  workTaskTypes
}: {
  workTaskTypes: WorkTaskTypeDto[];
}) {
  const [filterValue, setFilterValue] = React.useState('');

  const { handleChange, selectedSet } = useEntitySelection<
    WorkTaskTypeDto,
    number
  >(EntityClassMap.workTaskType);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredWtt = [...workTaskTypes];

    if (hasSearchFilter) {
      filteredWtt = filteredWtt.filter((wtt) =>
        wtt.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredWtt;
  }, [workTaskTypes, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: WorkTaskTypeDto, b: WorkTaskTypeDto) => {
      const first = a[sortDescriptor.column as keyof WorkTaskTypeDto] as number;
      const second = b[
        sortDescriptor.column as keyof WorkTaskTypeDto
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (workTaskTypeDto: WorkTaskTypeDto, columnKey: React.Key) => {
      const cellValue = workTaskTypeDto[columnKey as keyof WorkTaskTypeDto];

      switch (columnKey) {
        case 'name':
          return <span>{workTaskTypeDto.name}</span>;
        case 'knowledgeDomainName':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small ">{cellValue}</p>
            </div>
          );
        case 'knowledgeLevelName':
          return (
            <Chip
              className="capitalize"
              color={'secondary'}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisHorizontalIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<MagnifyingGlassIcon className={'h-6 w-6'} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
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
            Total {workTaskTypes.length} lesson types.
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
    onClear,
    rowsPerPage,
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    workTaskTypes.length
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedSet.size === workTaskTypes.length
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
        <div className="hidden w-[30%] justify-end gap-2 sm:flex"></div>
      </div>
    );
  }, [selectedSet, page, pages, filteredItems.length, workTaskTypes.length]);

  console.log(selectedSet);

  return (
    <Table
      aria-label="Work Task Type Table to enable selection for related context."
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      // classNames={{
      //   wrapper: 'max-h-[32rem] max-w-[40rem]'
      // }}
      selectedKeys={selectedSet}
      selectionMode="multiple"
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
      <TableBody emptyContent={'No users found'} items={sortedItems}>
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
