import { CoreTableProps } from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { useMemo } from 'react';
import { Table, TableProps } from '@mantine/core';
import SelectionCell from '@/components/tables/cells-v2/SelectionCell';
import HeaderSelectionCell from '@/components/tables/cells-v2/HeaderSelectionCell';
import { motion } from 'framer-motion';

export default function CoreTable<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>({
  rowIdList,
  columns,
  cellModel: CellModel,
  headerModel: HeaderModel,
  withSelection,
  ...otherProps
}: CoreTableProps<T, T_ID> & Omit<TableProps, 'data'>) {
  const showSelectionCell =
    withSelection === 'single' || withSelection == 'multiple';
  const data = useMemo(() => {
    const body = rowIdList.map((id) => (
      <motion.tr key={id} layout className={'mantine-Table-tr'}>
        {showSelectionCell && (
          <Table.Td>
            <SelectionCell entityId={id} />
          </Table.Td>
        )}
        {columns.map((column) => (
          <Table.Td
            key={`${id}.${column.uid}`}
            styles={{ td: column.style }}
            onClick={() => {}}
          >
            <CellModel entityId={id} columnKey={column.uid} />
          </Table.Td>
        ))}
      </motion.tr>
    ));
    let head = columns.map((column) => (
      <Table.Th
        key={column.uid}
        className={column.className}
        classNames={{ th: column.className }}
        style={{ ...column.style }}
      >
        {HeaderModel ? <HeaderModel {...column} /> : column.name}
      </Table.Th>
    ));
    if (showSelectionCell) {
      head = [
        <Table.Th key={'selection'} styles={{ th: { width: '2em' } }}>
          <HeaderSelectionCell />
        </Table.Th>,
        ...head
      ];
    }
    return {
      body,
      head
    };
  }, [showSelectionCell, columns, CellModel, rowIdList, HeaderModel]);

  return (
    <Table {...otherProps}>
      <Table.Thead>
        <Table.Tr>{data.head}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{data.body}</Table.Tbody>
    </Table>
  );
}
