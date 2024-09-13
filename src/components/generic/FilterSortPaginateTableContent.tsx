import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import React, { ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from '@nextui-org/react';
import { Column } from '@/types';

export type TableCellRenderer<T extends HasIdClass<Identifier>> = (
  entity: T,
  columnKey: React.Key
) => string | number | React.ReactNode;
export type TableContentProps<T extends HasIdClass<Identifier>> = TableProps & {
  headerColumns: Column<T>[];
  visibleItems: T[];
  renderCell: TableCellRenderer<T>;
};

export function FilterSortPaginateTableContent<
  T extends HasIdClass<Identifier>
>({ headerColumns, visibleItems, renderCell, ...props }: TableContentProps<T>) {
  return (
    <Table {...props}>
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
      <TableBody emptyContent={'No content found'} items={visibleItems}>
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
