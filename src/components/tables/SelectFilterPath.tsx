import { Column } from '@/types';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { useGlobalController, useGlobalListener } from 'selective-context';
import { getFilterPropertyContextKey } from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { Paths } from 'type-fest';
import { useCallback, useMemo } from 'react';
import { EmptyArray } from '@/api/literals';
import { ComboboxItem, Select } from '@mantine/core';
import { TypedPaths } from '@/api/custom-types/typePaths';

export function getVisibleColumnsContextKey(entityClass: string) {
  return `${entityClass}:visibleColumns`;
}

export default function SelectFilterPath<T>({
  initialFilter
}: {
  initialFilter: Paths<T>;
}) {
  const { entityClass } = useEntityTableContext();
  const { currentState: columns } = useGlobalListener({
    contextKey: getVisibleColumnsContextKey(entityClass),
    initialValue: EmptyArray as Column<T>[],
    listenerKey: 'selectFilterPath'
  });

  const { currentState, dispatch } = useGlobalController({
    contextKey: getFilterPropertyContextKey(entityClass),
    initialValue: initialFilter as TypedPaths<T, string> | '',
    listenerKey: 'filterPathSelect'
  });

  const filterSelectList = useMemo(() => {
    return columns
      .filter((column) => !column.ignoreFilter)
      .map(
        (column) => ({ value: column.uid, label: column.name }) as Selectable
      )
      .reduce(
        (previousValue, currentValue) => {
          previousValue.push(currentValue);
          return previousValue;
        },
        [] as { label: string; value: string }[]
      );
  }, [columns]);

  const onChange = useCallback(
    (value: string | null) => {
      if (value === null) {
        dispatch('');
      } else {
        dispatch(value as TypedPaths<T, string>);
      }
    },
    [dispatch]
  );

  return (
    <Select
      label={'Filter Path'}
      value={currentState === '' ? null : currentState}
      onChange={onChange}
      data={filterSelectList}
    />
  );
}

type Selectable = {
  label: string;
  value: string;
};
