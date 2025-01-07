import { CellIdReference } from '@/components/grids/CellQueryManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalListener } from 'selective-context';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  getCellIdReference,
  OuterCellProps
} from '@/components/grids/getCellIdReference';
import { ObjectPlaceholder } from '@/api/client-literals';
import {
  Cell,
  joinCellId
} from '@/components/work-project-series-schema/static-allocation/createCell';

export default function VirtualizedOuterCellV2<T>({
  rowIndex,
  columnIndex,
  data,
  style,
  innerCell: InnerCell,
  entityClass,
  ...props
}: OuterCellProps & { entityClass: string }) {
  const innerProps = useMemo(() => {
    return { rowIndex, columnIndex, data, ...props };
  }, [rowIndex, props, columnIndex, data]);
  const listenerKey = useUuidListenerKey();

  const cellIdReference = getCellIdReference({ data, rowIndex, columnIndex });
  const { currentState: cell } = useGlobalListener<Cell<T | undefined>>({
    contextKey: `Cell:${joinCellId(entityClass, cellIdReference.rowId, cellIdReference.columnId)}`,
    initialValue: ObjectPlaceholder as Cell<T | undefined>,
    listenerKey
  });

  return (
    <div style={style} className={clsx('h-full w-full')}>
      <InnerCell {...innerProps} cellData={cell.data} />
    </div>
  );
}
