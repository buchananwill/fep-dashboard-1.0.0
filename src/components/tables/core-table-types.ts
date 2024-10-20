import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { ReactNode } from 'react';
import { Get, Paths } from 'type-fest';
import { Column, ColumnUid } from '@/types';

export interface TableCellDataProps<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  T_PATH extends Paths<T> = Paths<T>,
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
  headerModel?: TableHeaderCell<T, T_ID>;
}

export interface InnerCellProps<T_FIELD_TYPE> {
  value: T_FIELD_TYPE;
  onChange?: (value: T_FIELD_TYPE) => void;
}

export type InnerCell<T_FIELD_TYPE> = (
  props: InnerCellProps<T_FIELD_TYPE>
) => ReactNode;

export type CellComponentRecord<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
> = {
  [K in ColumnUid<T>]?: {
    component: InnerCell<Get<T, K>>;
    updater?: UpdateFunction<T, K>;
  };
};

export type UpdateFunction<
  T,
  T_PATH extends string & Paths<T> = string & Paths<T>,
  T_FIELD_TYPE extends Get<T, T_PATH> = Get<T, T_PATH>
> = (prev: T, value: T_FIELD_TYPE) => T;
