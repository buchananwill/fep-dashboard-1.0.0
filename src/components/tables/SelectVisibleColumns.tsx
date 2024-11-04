import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { Column } from '@/types';
import {
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import { useCallback, useMemo } from 'react';
import { EmptyArray } from '@/api/literals';
import { getVisibleColumnsContextKey } from '@/components/tables/SelectFilterPath';
import { MultiSelectMaxDisplayedItems } from '@/components/generic/MultiSelectMaxDisplayedItems';
import { SimpleSelectable } from '@/components/types/types';

export function getOrderedColumnsContextKey(entityClass: string) {
  return `${entityClass}:orderedColumns`;
}

const listenerKey = 'selectVisibleColumns';
export default function SelectVisibleColumns<T>() {
  const { entityClass } = useEntityTableContext();
  const { currentState: orderedColumns } = useGlobalListener({
    contextKey: getOrderedColumnsContextKey(entityClass),
    listenerKey,
    initialValue: EmptyArray as Column<T>[]
  });
  const { currentState: visibleColumns, dispatchWithoutControl } =
    useGlobalDispatchAndListener({
      contextKey: getVisibleColumnsContextKey(entityClass),
      listenerKey,
      initialValue: EmptyArray as Column<T>[]
    });

  const selectOptions: SimpleSelectable[] = useMemo(() => {
    return orderedColumns.map((column) => ({
      value: column.uid,
      label: column.name
    }));
  }, [orderedColumns]);
  const selection = useMemo(() => {
    return orderedColumns
      .filter((column) => visibleColumns.includes(column))
      .map((column) => column.uid);
  }, [orderedColumns, visibleColumns]);

  const onChange = useCallback(
    (value: string[]) => {
      dispatchWithoutControl(
        orderedColumns.filter((column) => value.includes(column.uid))
      );
    },
    [dispatchWithoutControl, orderedColumns]
  );

  return (
    <MultiSelectMaxDisplayedItems
      withinPortal={false}
      label={'Visible Columns'}
      data={selectOptions}
      value={selection}
      onChange={onChange}
    />
  );
}
