import { useMemo } from 'react';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { useGlobalController } from 'selective-context';
import { Identifier, useEffectSyncWithDispatch } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { WorkProjectSeriesAssignmentDto } from '@/api/generated-types/generated-types';

export const GetCellContentKey = 'getCellContent';
export type AssignmentCellContent = WorkProjectSeriesAssignmentDto | undefined;
export type GetCellContent<T> = MemoizedFunction<
  CellIdReference,
  T | undefined
>;

export default function CellQueryManager<T, U>({
  tableData,
  getDataRetrievalMemoizedFunction
}: {
  tableData: T;
  getDataRetrievalMemoizedFunction: (tableData: T) => GetCellContent<U>;
}) {
  const listenerKey = useUuidListenerKey();
  const getCellContent: GetCellContent<U> = useMemo(() => {
    return getDataRetrievalMemoizedFunction(tableData);
  }, [tableData, getDataRetrievalMemoizedFunction]);

  const { dispatch } = useGlobalController({
    contextKey: GetCellContentKey,
    listenerKey: listenerKey,
    initialValue: getCellContent
  });

  useEffectSyncWithDispatch(getCellContent, dispatch);

  return null;
}

export interface CellIdReference {
  rowId: Identifier;
  columnId: Identifier;
}
