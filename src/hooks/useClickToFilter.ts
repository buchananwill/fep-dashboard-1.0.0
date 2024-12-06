import { useGlobalDispatch } from 'selective-context';
import {
  getFilterPropertyContextKey,
  getFilterValueContextKey
} from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { useCallback } from 'react';

export function useClickToFilter(
  entityClass: string,
  columnKey: string,
  value: string
) {
  const { dispatchWithoutListen: dispatchFilterColumn } = useGlobalDispatch(
    getFilterPropertyContextKey(entityClass)
  );
  const { dispatchWithoutListen: dispatchFilterValue } = useGlobalDispatch(
    getFilterValueContextKey(entityClass)
  );

  return useCallback(() => {
    dispatchFilterColumn(columnKey);
    dispatchFilterValue(value);
  }, [dispatchFilterColumn, dispatchFilterValue, value, columnKey]);
}