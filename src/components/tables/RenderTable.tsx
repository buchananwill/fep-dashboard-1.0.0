import { EntityTypeMap } from '@/api/entity-type-map';
import {
  EntityTableProps,
  TabbedTablesDataProps,
  TableComponentMap
} from '@/components/tables/types';
import { ReactNode } from 'react';

export function RenderTable<T extends keyof EntityTypeMap>({
  type,
  data,
  tableMap
}: {
  type: T;
  data: TabbedTablesDataProps;
  tableMap: TableComponentMap;
}) {
  const entities = data[type];
  const TableComponent = tableMap[type] as (
    props: EntityTableProps<T>
  ) => ReactNode;

  if (!entities || !TableComponent)
    return <div>Component or data not found!</div>;

  return <TableComponent entities={entities} />;
}
