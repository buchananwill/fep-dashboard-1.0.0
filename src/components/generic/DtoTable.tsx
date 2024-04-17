import React, { Key } from 'react';
import { HasId } from '@/app/api/main';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/table';

export interface ColumnMetaData {
  name: string;
  uid: React.Key;
}

export function DtoTable<T extends HasId>({
  columns,
  data,
  renderCell
}: {
  columns: ColumnMetaData[];
  data: T[];
  renderCell: (item: T, columnKey: Key) => string | number | React.JSX.Element;
}) {
  return (
    <Table
      isCompact
      isHeaderSticky={true}
      aria-label="Example table with custom cells"
      classNames={{
        base: 'max-h-[520px] overflow-auto',
        table: 'min-h-[420px]'
      }}
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
