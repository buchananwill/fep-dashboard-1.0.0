import { Column, DispatchState } from '@/types';
import { SetStateAction, useCallback, useMemo, useState } from 'react';
import { Selection } from '@nextui-org/react';
import { Identifier } from 'dto-stores';

export function useDynamicColumnVisibility<T>(
  initialColumns: (keyof T)[],
  columns: Column<T>[]
) {
  // Set up column visibility
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns as Identifier[])
  );

  const setVisibleColumnsIntercept: DispatchState<Selection> = useCallback(
    (selectionDispatch: SetStateAction<Selection>) => {
      setVisibleColumns(selectionDispatch);
    },
    []
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns, columns]);
  return {
    visibleColumns,
    setVisibleColumns: setVisibleColumnsIntercept,
    headerColumns
  };
}
