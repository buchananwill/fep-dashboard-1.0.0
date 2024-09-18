import { EntityTypeMap } from '@/api/entity-type-map';
import { ReactNode } from 'react';

export type EntityTypeKey = keyof EntityTypeMap;
export type TabbedTablesDataProps = {
  [key in keyof EntityTypeMap]?: EntityTypeMap[key][];
};
export type TableComponentMap = {
  [key in keyof EntityTypeMap]?: (props: EntityTableProps<key>) => ReactNode;
};

export interface EntityTableProps<T extends keyof EntityTypeMap> {
  entities: EntityTypeMap[T][];
}
