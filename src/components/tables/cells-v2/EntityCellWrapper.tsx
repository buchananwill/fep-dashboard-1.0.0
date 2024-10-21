'use client';
import {
  EntityInnerCell,
  IdInnerCell,
  TableCellDataProps
} from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { Identifier, useDtoStore } from 'dto-stores';
import { ReactNode, useCallback, useMemo } from 'react';
import { Get, Paths } from 'type-fest';
import { get } from 'lodash';

export default function EntityCellWrapper<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  T_PATH extends Paths<T> = Paths<T>,
  T_FIELD_TYPE extends Get<T, T_PATH> = Get<T, T_PATH>
>({
  entityClass,
  columnKey,
  entityId,
  entityCell: EntityCell
}: TableCellDataProps<T, T_ID, T_PATH, T_FIELD_TYPE> & {
  entityCell?: EntityInnerCell<T, T_ID, T_PATH>;
}) {
  const storeProps = useDtoStore<T>({
    entityId,
    entityClass
  });

  return EntityCell ? (
    <EntityCell
      columnKey={columnKey}
      {...storeProps}
      entityClass={entityClass}
    />
  ) : null;
}
