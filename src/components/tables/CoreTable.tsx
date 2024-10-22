import { CoreTableProps } from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { useMemo } from 'react';
import { Table, TableProps } from '@mantine/core';

export default function CoreTable<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>({
  rowIdList,
  columns,
  cellModel: CellModel,
  headerModel: HeaderModel,
  ...otherProps
}: CoreTableProps<T, T_ID> & Omit<TableProps, 'data'>) {
  const data = useMemo(() => {
    const body = rowIdList.map((id) => (
      <Table.Tr key={id}>
        {columns.map((column) => (
          <Table.Td key={`${id}.${column.uid}`}>
            <CellModel entityId={id} columnKey={column.uid} />
          </Table.Td>
        ))}
      </Table.Tr>
    ));
    const head = columns.map((column) => (
      <Table.Th
        key={column.uid}
        className={column.className}
        classNames={{ th: column.className }}
        style={{ ...column.style }}
      >
        {HeaderModel ? <HeaderModel {...column} /> : column.name}
      </Table.Th>
    ));
    return {
      body,
      head
    };
  }, [columns, CellModel, rowIdList, HeaderModel]);

  return (
    <Table {...otherProps}>
      <Table.Thead>
        <Table.Tr>{data.head}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{data.body}</Table.Tbody>
    </Table>
  );
}
