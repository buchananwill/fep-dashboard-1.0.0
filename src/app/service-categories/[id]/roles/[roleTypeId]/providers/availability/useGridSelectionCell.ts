import {
  useGlobalController,
  useGlobalDispatchAndListener
} from 'selective-context';
import { useCallback, useMemo } from 'react';

interface GridSelection {
  fromRowInc: number;
  toRowEx: number;
  fromColumnInc: number;
  toColumnEx: number;
}

const gridSelectionContextKey = 'gridSelection';

export function useGridSelectionController() {
  useGlobalController<GridSelection | undefined>({
    contextKey: gridSelectionContextKey,
    initialValue: undefined,
    listenerKey: 'Controller'
  });
}

export function useGridSelectionCell(rowIndex: number, columnIndex: number) {
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener<
    GridSelection | undefined
  >({
    contextKey: gridSelectionContextKey,
    listenerKey: `${rowIndex}:${columnIndex}`,
    initialValue: undefined
  });

  const handleClick = useCallback(() => {
    dispatchWithoutControl({
      fromRowInc: rowIndex,
      toRowEx: rowIndex + 1,
      fromColumnInc: columnIndex,
      toColumnEx: columnIndex + 1
    });
  }, [dispatchWithoutControl, columnIndex, rowIndex]);

  return useMemo(() => {
    const isSelected =
      currentState &&
      rowIndex >= currentState.fromRowInc &&
      rowIndex < currentState.toRowEx &&
      columnIndex >= currentState.fromColumnInc &&
      columnIndex < currentState.toColumnEx;
    return { isSelected, handleClick };
  }, [currentState, columnIndex, rowIndex]);
}
