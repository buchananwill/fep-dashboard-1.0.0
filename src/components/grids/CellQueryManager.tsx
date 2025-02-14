import { useMemo } from 'react';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { useGlobalController } from 'selective-context';
import { Identifier, useEffectSyncWithDispatch } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { WorkProjectDto } from '@/api/generated-types/generated-types_';

export const GetCellContentKey = 'getCellContent';
export type AssignmentCellContent = WorkProjectDto | undefined;
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

export interface CellIdReference<
  T extends Identifier = Identifier,
  U extends Identifier = Identifier
> {
  rowId: T;
  columnId: U;
}
