import { HasId, HasIdClass } from '@/api/types';
import { DtoStoreReturn, Identifier } from 'dto-stores';
import { ReactNode } from 'react';
import { Get, Paths } from 'type-fest';
import { Column, ColumnUid } from '@/types';
import { ColorDto } from '@/api/generated-types/generated-types';

export interface TableCellDataProps<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  T_PATH extends ColumnUid<T> = ColumnUid<T>,
  T_FIELD_TYPE extends Get<T, T_PATH> = Get<T, T_PATH> // NEEDED FOR WRAPPER DEFINITION
> {
  entityId: T_ID;
  columnKey: T_PATH;
  entityClass: string;
}

export type TableCellDataWrapper<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
> = (
  props: Pick<TableCellDataProps<T, T_ID>, 'columnKey' | 'entityId'>
) => ReactNode;

export type TableHeaderCell<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
> = (props: Column<T>) => ReactNode;

export interface CoreTableProps<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
> {
  rowIdList: T_ID[];
  columns: Column<T>[];
  cellModel: TableCellDataWrapper<T, T_ID>;
  withSelection?: boolean;
  headerModel?: TableHeaderCell<T, T_ID>;
}

export interface IdInnerCellProps<T_FIELD_TYPE> {
  entityId: Identifier;
  entityClass: string;
  value: T_FIELD_TYPE;
  onChange?: (value: T_FIELD_TYPE) => void;
}

export type IdInnerCell<T_FIELD_TYPE> = (
  props: IdInnerCellProps<T_FIELD_TYPE>
) => ReactNode;

export interface EntityInnerCellProps<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier = T['id'],
  K extends string & ColumnUid<T> = ColumnUid<T>
> extends DtoStoreReturn<T> {
  columnKey: K;
}

export type EntityInnerCell<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
> = (
  props: EntityInnerCellProps<T, T_ID, K> & { entityClass: string }
) => ReactNode;

type InnerCellMapping<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
> = {
  component: IdInnerCell<Get<T, K>>;
  updater?: UpdateFunction<T, K>;
  type: 'IdInnerCell';
};

type EntityCellMapping<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
> = {
  component: EntityInnerCell<T, T_ID, K>;
  type: 'EntityInnerCell';
};

type CustomCellMapping<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
> = {
  type: 'CustomCell';
  component: (props: TableCellDataProps<T, T_ID>) => ReactNode;
};

type CellMapping<
  T extends HasIdClass<T_ID>,
  K extends string & ColumnUid<T>,
  T_ID extends Identifier = T['id']
> =
  | InnerCellMapping<T, T_ID, K>
  | EntityCellMapping<T, T_ID, K>
  | CustomCellMapping<T, T_ID, K>;

export type CellComponentRecord<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier = T['id']
> = {
  [K in ColumnUid<T>]?: CellMapping<T, K, T_ID>;
};

export type UpdateFunction<
  T,
  T_PATH extends string & Paths<T> = string & Paths<T>,
  T_FIELD_TYPE extends Get<T, T_PATH> = Get<T, T_PATH>
> = (prev: T, value: T_FIELD_TYPE) => T;

export type SortState<T> = {
  direction: 'asc' | 'desc';
  path: Paths<T> | '';
};

export interface OptionallyHasColorDto extends HasId {
  color?: ColorDto;
}
