import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { useCellIdReferences } from '@/components/work-task-types/useCellIdReferences';
import MiniPieChart from '@/components/work-task-types/MiniPieChart';
import {
  DropTargetMonitor,
  useDrag,
  useDragDropManager,
  useDrop
} from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { assignOrderItemToOption } from '@/components/carousel-groups/orders/_functions/assignOrderItemToOption';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types';
import { canAssignToOrderItem } from '@/components/carousel-groups/orders/_functions/canAssignOptionToOrderItem';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useGlobalDispatchAndListener } from 'selective-context';
import {
  dropResultContextKey,
  hoverTargetCellIndex
} from '@/components/work-task-types/WorkTaskTypeMatrix';
import { ObjectPlaceholder } from '@/api/literals';
import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { isUndefined } from 'lodash';
import { isNotUndefined } from '@/api/main';

function isWithinRange(
  hoverCellIndex: CellIndex,
  currentItem: CellIndex,
  columnIndex: number,
  rowIndex: number
) {
  if (!hoverCellIndex || !currentItem) return false;
  const { columnIndex: ciTarget, rowIndex: riTarget } = hoverCellIndex;
  const { columnIndex: ciDragging, rowIndex: riDragging } = currentItem;
  const allDefined =
    isNotUndefined(ciTarget) &&
    isNotUndefined(ciDragging) &&
    isNotUndefined(riTarget) &&
    isNotUndefined(riDragging);
  if (!allDefined) return false;
  return (
    liesBetweenOrEqual(ciTarget, ciDragging, columnIndex) &&
    liesBetweenOrEqual(riTarget, riDragging, rowIndex)
  );
}

export type NumberCell = CellIndex & { value: number };
export type DropResult = {
  dragged?: NumberCell;
  dropped?: NumberCell;
};

export function WorkTaskTypeMatrixCell(props: CellWrapperProps) {
  const cellIdReference = useCellIdReferences(props);
  const { rowIndex, columnIndex } = props;
  const cellIndex = {
    rowIndex,
    columnIndex
  };
  const [currentValue, setCurrentValue] = useState(Math.random());

  const cell = useMemo(() => {
    return {
      rowIndex,
      columnIndex,
      value: currentValue
    };
  }, [rowIndex, columnIndex, currentValue]);

  const cellRef = useRef(cell);
  cellRef.current = cell;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.SUITABILITY_SECTOR,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: cellRef
  }));

  const { currentState: hoverCellIndex, dispatchWithoutControl } =
    useGlobalDispatchAndListener({
      contextKey: hoverTargetCellIndex,
      listenerKey: `SuitabilitySector:${props.rowIndex}:${props.columnIndex}`,
      initialValue: ObjectPlaceholder as CellIndex
    });
  const { currentState: dropResult, dispatchWithoutControl: dispatchDrop } =
    useGlobalDispatchAndListener({
      contextKey: dropResultContextKey,
      listenerKey: `SuitabilitySector:${props.rowIndex}:${props.columnIndex}`,
      initialValue: ObjectPlaceholder as DropResult
    });

  // Get drag data and functions
  const [
    { isOver, canDrop, currentItem, currentItemType, getDropResult },
    drop
  ] = useDrop(() => ({
    accept: DragTypes.SUITABILITY_SECTOR,
    drop: (item, monitor) => {
      console.log(item, cell);
      dispatchDrop({ dragged: item.current, dropped: cell });
      return { dragged: item, dropped: cell };
    },
    collect: (
      monitor: DropTargetMonitor<
        MutableRefObject<NumberCell>,
        { dragged: MutableRefObject<NumberCell>; dropped: NumberCell }
      >
    ) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      currentItem: monitor.getItem(),
      currentItemType: monitor.getItemType(),
      getDropResult: monitor.getDropResult()
    }),
    canDrop: (item, monitor) => true,
    hover: (item, monitor) => dispatchWithoutControl(cellIndex)
  }));

  const currentItemRef = currentItem ? currentItem.current : undefined;

  const withinRange = useMemo(() => {
    return (
      currentItem &&
      isWithinRange(hoverCellIndex, currentItem.current, columnIndex, rowIndex)
    );
  }, [hoverCellIndex, currentItem, columnIndex, rowIndex]);

  const withinRangeRef = useRef(withinRange);
  withinRangeRef.current = withinRange;

  console.log(currentItem);

  useEffect(() => {
    if (dropResult?.dragged && dropResult?.dropped) {
      const withinRange = isWithinRange(
        dropResult.dragged,
        dropResult.dropped,
        cell.columnIndex,
        cell.rowIndex
      );
      console.log(withinRange);
      if (withinRange) {
        setCurrentValue(dropResult.dragged.value);
      }
    }
  }, [dropResult, cell]);

  return (
    <div style={props.style}>
      {drop(
        <div
          data-is-over={isOver}
          data-can-drop={canDrop && isOver}
          data-within-range={withinRange}
          className={
            ' rounded-lg outline-2 -outline-offset-2 outline-blue-500 data-[can-drop=true]:animate-pulse data-[within-range=true]:bg-sky-200 data-[is-over=true]:outline'
          }
        >
          {drag(
            <div>
              <MiniPieChart
                value={currentValue}
                className={'h-full w-full p-1'}
                strokeWidthRelative={0.4}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function liesBetweenOrEqual(bound1: number, bound2: number, value: number) {
  return value >= Math.min(bound1, bound2) && value <= Math.max(bound1, bound2);
}
