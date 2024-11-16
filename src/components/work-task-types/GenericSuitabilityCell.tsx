import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { SuitabilityMatrixCell } from '@/components/work-task-types/suitabilityMatrixCell';
import { DispatchState } from '@/types';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { useGlobalDispatchAndListener } from 'selective-context';
import {
  dropResultContextKey,
  hoverTargetCellIndex
} from '@/components/work-task-types/WorkTaskTypeMatrix';
import { ObjectPlaceholder } from '@/api/literals';
import {
  isWithinRange,
  liesOnBoundary
} from '@/components/work-task-types/isWithinRange';
import clsx from 'clsx';
import { Button, Popover, Slider } from '@mantine/core';
import { BoltSlashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { BoltIcon } from '@heroicons/react/24/solid';
import MiniPieChart from '@/components/work-task-types/MiniPieChart';

export type NumberCell = CellIndex & { value: number };
export type DropResult = {
  dragged?: NumberCell;
  dropped?: NumberCell;
};

export function GenericSuitabilityCell({
  currentCell,
  setCurrentCell,
  ...props
}: {
  currentCell: SuitabilityMatrixCell;
  setCurrentCell?: DispatchState<SuitabilityMatrixCell>;
} & Pick<CellWrapperProps, 'columnIndex' | 'rowIndex'>) {
  const { rowIndex, columnIndex } = props;
  const cellIndex = {
    rowIndex,
    columnIndex
  };

  const { isDynamic, rating } = currentCell;

  const [open, setOpen] = useState(false);

  const cell = useMemo(() => {
    return {
      rowIndex,
      columnIndex,
      value: rating
    };
  }, [rowIndex, columnIndex, rating]);

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

  const withinRange = useMemo(() => {
    return (
      currentItem &&
      isWithinRange(
        {
          columnIndex,
          rowIndex
        },
        hoverCellIndex,
        currentItem.current
      )
    );
  }, [hoverCellIndex, currentItem, columnIndex, rowIndex]);

  const withinRangeRef = useRef(withinRange);
  withinRangeRef.current = withinRange;

  useEffect(() => {
    if (dropResult?.dragged && dropResult?.dropped && !isDynamic) {
      const { dragged, dropped } = dropResult;
      const withinRange = isWithinRange(cell, dragged, dropped);
      if (withinRange && setCurrentCell) {
        setCurrentCell((current) => ({ ...current, rating: dragged.value }));
      }
    }
  }, [dropResult, cell, isDynamic, setCurrentCell]);

  const isOnLastBoundary = useMemo(() => {
    return liesOnBoundary(cell, dropResult?.dragged, dropResult?.dropped);
  }, [cell, dropResult]);

  return drop(
    <div
      data-is-over={isOver}
      data-can-drop={canDrop && isOver}
      data-within-range={withinRange}
      className={clsx(
        ' rounded-lg outline-2 -outline-offset-2 outline-blue-500 data-[can-drop=true]:animate-pulse data-[within-range=true]:bg-sky-200 data-[is-over=true]:outline',
        open && 'outline'
      )}
    >
      <div
        className={clsx(
          currentCell?.isDynamic && 'bg-yellow-100',
          'border-1 box-content h-full w-full border-transparent',

          isOnLastBoundary.top && 'border-t-red-500',
          isOnLastBoundary.right && 'border-r-red-500',
          isOnLastBoundary.left && 'border-l-red-500',
          isOnLastBoundary.bottom && 'border-b-red-500',
          isOnLastBoundary.top && isOnLastBoundary.left && 'rounded-tl',
          isOnLastBoundary.top && isOnLastBoundary.right && 'rounded-tr',
          isOnLastBoundary.bottom && isOnLastBoundary.left && 'rounded-bl',
          isOnLastBoundary.bottom && isOnLastBoundary.right && 'rounded-br'
        )}
      >
        {drag(
          <div
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={'relative'}
          >
            <Popover withArrow trapFocus>
              <Popover.Target>
                <button className={'absolute h-[92%] w-[92%]'}></button>
              </Popover.Target>
              <Popover.Dropdown
                className={'flex flex-row items-center gap-2 align-middle'}
              >
                <Slider
                  className={'w-24'}
                  value={Math.round(currentCell.rating * 100)}
                  aria-label={'Suitability'}
                  disabled={
                    isWithinRange(
                      cell,
                      dropResult.dropped,
                      dropResult.dragged
                    ) && !currentCell.isDynamic
                  }
                  thumbSize={20}
                  showLabelOnHover={false}
                  onChange={(result) => {
                    if (typeof result === 'number' && setCurrentCell) {
                      setCurrentCell((prev) => ({
                        ...prev,
                        rating: result / 100
                      }));
                    }
                  }}
                />
                <Button
                  variant={'bordered'}
                  className={clsx(
                    'p-1',
                    currentCell.isDynamic && 'bg-yellow-50'
                  )}
                  size={'sm'}
                  onClick={() => {
                    if (setCurrentCell)
                      setCurrentCell((prev) => ({
                        ...prev,
                        isDynamic: !prev.isDynamic
                      }));
                  }}
                >
                  {!currentCell?.isDynamic ? (
                    <BoltSlashIcon className={'w-6'} />
                  ) : (
                    <BoltIcon className={'w-6 fill-yellow-400'} />
                  )}
                </Button>
              </Popover.Dropdown>
            </Popover>
            {currentCell.rating > 0 ? (
              <MiniPieChart
                value={currentCell.rating}
                className={'h-full w-full p-1 '}
                strokeWidthRelative={0.4}
              />
            ) : (
              <XCircleIcon
                className={'stroke-2'}
                style={{ color: 'var(--mantine-color-placeholder)' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
