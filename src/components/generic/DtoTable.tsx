import React, { Key } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table';
import { TableProps } from '@nextui-org/react';
import { HasId } from '@/api/types';
import { Column } from '@/types';

export function DtoTable<T extends HasId>({
  columns,
  data,
  renderCell,
  ...tableProps
}: {
  columns: Column<T>[];
  data: T[];
  renderCell: (item: T, columnKey: Key) => string | number | React.ReactNode;
} & TableProps) {
  return (
    <Table
      {...tableProps}
      isCompact
      isHeaderSticky={true}
      aria-label="Dto table with custom cells"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id} className={'border-b'}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
