'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react';
import { Identifier } from 'dto-stores';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(['type'] as Identifier[])
  );

  const setVisibleColumnsIntercept: DispatchState<Selection> = useCallback(
    (selectionDispatch: SetStateAction<Selection>) => {
      console.log('Using callback: ', selectionDispatch);
      setVisibleColumns(selectionDispatch);
    },
    []
  );

  const headerColumns = useMemo(() => {
    console.log('setting visible columns:', visibleColumns);
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  return (
    <Popover shouldCloseOnBlur={false}>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Dropdown
          shouldCloseOnBlur={false}
          shouldCloseOnInteractOutside={() => false}
        >
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
            shouldFocusWrap={true}
            items={columns}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={setVisibleColumns}
          >
            {(item) => <DropdownItem key={item.uid}>{item.name}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </PopoverContent>
    </Popover>
  );
}

interface Pet {
  type: string;
  name: string;
  id: number;
}

const columns: Column<Pet>[] = [
  { uid: 'type', name: 'Type', sortable: true },
  { uid: 'id', name: 'Id', sortable: true },
  { uid: 'name', name: 'Name', sortable: true }
];

const pets: Pet[] = [
  { type: 'Cat', id: 1, name: 'Amber' },
  { type: 'Cat', id: 2, name: 'Lincoln' },
  { type: 'Guinea Pig', id: 3, name: 'Cotton Bud' },
  { type: 'Rabbit', id: 4, name: 'Dandelion' }
];

type DispatchState<T> = Dispatch<SetStateAction<T>>;

interface Column<T> {
  name: string;
  uid: Extract<keyof T, string | number>;
  sortable?: boolean;
}
