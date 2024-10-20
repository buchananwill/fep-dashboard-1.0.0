'use client';
import { TableCellDataProps } from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { Identifier, useDtoStore } from 'dto-stores';
import { ReactNode, useCallback, useMemo } from 'react';
import { Get, Paths } from 'type-fest';
import { get } from 'lodash';

export default function TableDtoStoreCellWrapper<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  T_PATH extends Paths<T> = Paths<T>,
  T_FIELD_TYPE extends Get<T, T_PATH> = Get<T, T_PATH>
>({
  entityClass,
  columnKey,
  entityId,
  innerCell: InnerCell,
  updateFunction
}: TableCellDataProps<T, T_ID, T_PATH, T_FIELD_TYPE> & {
  innerCell?: (props: {
    value: T_FIELD_TYPE;
    onChange: (value: T_FIELD_TYPE) => void;
  }) => ReactNode;
  updateFunction?: (prev: T, value: T_FIELD_TYPE) => T;
}) {
  const { entity, dispatchWithoutControl } = useDtoStore<T>({
    entityId,
    entityClass
  });

  const onChange = useCallback(
    (value: T_FIELD_TYPE) => {
      if (updateFunction) {
        dispatchWithoutControl((prev) => updateFunction(prev, value));
      }
    },
    [updateFunction, dispatchWithoutControl]
  );

  const value = useMemo(() => {
    return get(entity, columnKey) as T_FIELD_TYPE;
  }, [entity, columnKey]);

  return InnerCell ? <InnerCell onChange={onChange} value={value} /> : null;
}
