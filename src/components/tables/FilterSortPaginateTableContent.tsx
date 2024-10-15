import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import React, { forwardRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from '@nextui-org/react';
import { Column, GenericDivProps } from '@/types';
import clsx from 'clsx';

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
>({
  headerColumns,
  visibleItems,
  renderCell,
  ...props
}: Omit<TableContentProps<T>, 'BaseComponent'>) {
  return (
    <Table
      // @ts-ignore
      {...props}
      BaseComponent={DoubleDivBaseComponent}
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

const DoubleDivBaseComponent = forwardRef<HTMLDivElement, GenericDivProps>(
  function InnerComponent({ className, ...props }, ref) {
    return (
      <div className={'h-fit w-fit overflow-clip rounded-large shadow-small'}>
        <div
          ref={ref}
          className={clsx(className, 'double-div-base')}
          {...props}
        />
      </div>
    );
  }
);
