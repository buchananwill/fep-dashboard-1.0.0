import { useMemo } from 'react';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import { useGlobalController } from 'selective-context';
import { Identifier, useEffectSyncWithDispatch } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

export const GetCellContentKey = 'getAssignmentCellContent';
export type AssignmentCellContent =
  | WorkProjectSeriesAssignmentDto[]
  | undefined;
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

  const { currentState, dispatch } = useGlobalController({
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
