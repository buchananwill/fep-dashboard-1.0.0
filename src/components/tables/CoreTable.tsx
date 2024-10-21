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
}: CoreTableProps<T, T_ID> & TableProps) {
  const data = useMemo(() => {
    const body = rowIdList.map((id) =>
      columns.map((column) => (
        <CellModel
          entityId={id}
          columnKey={column.uid}
          key={`${id}.${column.uid}`}
        />
      ))
    );
    const head = columns.map((column) =>
      HeaderModel ? <HeaderModel {...column} key={column.uid} /> : column.name
    );
    return {
      body,
      head
    };
  }, [columns, CellModel, rowIdList, HeaderModel]);

  return <Table data={data} {...otherProps} />;
}
