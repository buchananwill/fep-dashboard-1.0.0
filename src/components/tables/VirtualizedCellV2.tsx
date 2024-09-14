import { CellIdReference } from '@/components/tables/CellQueryManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalListener } from 'selective-context';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  getCellIdReference,
  OuterCellProps
} from '@/components/tables/getCellIdReference';
import {
  Cell,
  getCellId
} from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import { ObjectPlaceholder } from '@/api/literals';

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
    contextKey: `Cell:${getCellId(entityClass, cellIdReference.rowId, cellIdReference.columnId)}`,
    initialValue: ObjectPlaceholder as Cell<T | undefined>,
    listenerKey
  });

  return (
    <div style={style} className={clsx(' h-full w-full')}>
      <InnerCell {...innerProps} cellData={cell.data} />
    </div>
  );
}
