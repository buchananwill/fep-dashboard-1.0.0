import { Column } from '@/types';
import { useMemo, useState } from 'react';
import { Selection } from '@nextui-org/react';
import { Identifier } from 'dto-stores';

export function useDynamicColumnVisibility<T>(
  initialColumns: Array<keyof T>,
  columns: Array<Column<T>>
) {
  // Set up column visibility
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns as Identifier[])
  );
  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);
  return { visibleColumns, setVisibleColumns, headerColumns };
}