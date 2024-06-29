import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { Column, DispatchState, NextUiSelection } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

export function ColumnDropdown<T extends HasIdClass<Identifier>>({
  visibleColumns,
  setVisibleColumns,
  columns
}: {
  visibleColumns: NextUiSelection;
  setVisibleColumns: DispatchState<NextUiSelection>;
  columns: Column<T>[];
}) {
  return (
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
  );
}
