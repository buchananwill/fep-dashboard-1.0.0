import {
  CellIdReference,
  GetCellContent,
  GetCellContentKey
} from '@/components/grids/CellQueryManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalListener } from 'selective-context';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  getCellIdReference,
  OuterCellProps
} from '@/components/grids/getCellIdReference';

export default function VirtualizedOuterCell<T>({
  rowIndex,
  columnIndex,
  data,
  style,
  innerCell: InnerCell,
  ...props
}: OuterCellProps) {
  const innerProps = useMemo(() => {
    return { rowIndex, columnIndex, data, ...props };
  }, [rowIndex, props, columnIndex, data]);
  const listenerKey = useUuidListenerKey();
  const {
    currentState: { memoizedFunction }
  } = useGlobalListener<GetCellContent<T>>({
    contextKey: GetCellContentKey,
    initialValue: initialMemoizedFunction,
    listenerKey
  });

  const cellData: T | undefined = useMemo(() => {
    const assignmentCell = getCellIdReference({ data, rowIndex, columnIndex });
    return memoizedFunction(assignmentCell);
  }, [memoizedFunction, columnIndex, rowIndex, data]);

  return (
    <div style={style} className={clsx(' h-full w-full')}>
      <InnerCell {...innerProps} cellData={cellData} />
    </div>
  );
}

const initialMemoizedFunction = {
  memoizedFunction: ({ columnId, rowId }: CellIdReference) => undefined
};
