import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { useCellIdReferences } from '@/components/work-task-types/useCellIdReferences';
import MiniPieChart from '@/components/work-task-types/MiniPieChart';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useGlobalDispatchAndListener } from 'selective-context';
import {
  dropResultContextKey,
  hoverTargetCellIndex
} from '@/components/work-task-types/WorkTaskTypeMatrix';
import { ObjectPlaceholder } from '@/api/literals';
import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { isWithinRange } from '@/components/work-task-types/isWithinRange';
import clsx from 'clsx';
import { PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Popover } from '@nextui-org/react';
import { Slider } from '@nextui-org/slider';
import { Button } from '@nextui-org/button';
import {
  BoltIcon,
  BoltSlashIcon,
  LockClosedIcon,
  LockOpenIcon
} from '@heroicons/react/24/outline';

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
  const [currentCell, setCurrentCell] = useState<{
    value: number;
    isDynamic: boolean;
  }>({ value: Math.random(), isDynamic: true });

  const [open, setOpen] = useState(false);

  const cell = useMemo(() => {
    return {
      rowIndex,
      columnIndex,
      value: currentCell.value
    };
  }, [rowIndex, columnIndex, currentCell]);

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

  const withinRange = useMemo(() => {
    return (
      currentItem &&
      isWithinRange(hoverCellIndex, currentItem.current, {
        columnIndex,
        rowIndex
      })
    );
  }, [hoverCellIndex, currentItem, columnIndex, rowIndex]);

  const withinRangeRef = useRef(withinRange);
  withinRangeRef.current = withinRange;

  useEffect(() => {
    if (dropResult?.dragged && dropResult?.dropped && currentCell.isDynamic) {
      const { dragged, dropped } = dropResult;
      const withinRange = isWithinRange(dragged, dropped, cell);
      if (withinRange) {
        setCurrentCell((current) => ({ ...current, value: dragged.value }));
      }
    }
  }, [dropResult, cell, currentCell]);

  return (
    <div style={props.style}>
      {drop(
        <div
          data-is-over={isOver}
          data-can-drop={canDrop && isOver}
          data-within-range={withinRange}
          className={clsx(
            ' rounded-lg outline-2 -outline-offset-2 outline-blue-500 data-[can-drop=true]:animate-pulse data-[within-range=true]:bg-sky-200 data-[is-over=true]:outline',
            open && 'outline'
          )}
        >
          {drag(
            <div
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className={clsx(!currentCell.isDynamic && 'bg-yellow-100')}
            >
              <Popover
                isOpen={open}
                shouldCloseOnBlur={true}
                showArrow={true}
                onOpenChange={setOpen}
                shouldCloseOnInteractOutside={() => true}
              >
                <PopoverTrigger>
                  <div></div>
                </PopoverTrigger>
                <PopoverContent className={'flex flex-row gap-2'}>
                  <Slider
                    className={'w-24'}
                    value={currentCell.value * 100}
                    onChange={(result) => {
                      if (typeof result === 'number') {
                        setCurrentCell((prev) => ({
                          ...prev,
                          value: result / 100
                        }));
                      }
                    }}
                  ></Slider>
                  <Button
                    isIconOnly={true}
                    className={clsx(
                      'p-1',
                      !currentCell.isDynamic && 'bg-yellow-100'
                    )}
                    size={'sm'}
                    onPress={() =>
                      setCurrentCell((prev) => ({
                        ...prev,
                        isDynamic: !prev.isDynamic
                      }))
                    }
                  >
                    {currentCell.isDynamic ? <BoltSlashIcon /> : <BoltIcon />}
                  </Button>
                </PopoverContent>
              </Popover>
              <MiniPieChart
                value={currentCell.value}
                className={'h-full w-full p-1 '}
                strokeWidthRelative={0.4}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const CellStates = ['dynamic', 'static-zero', 'static-non-zero'] as const;

type CellState = (typeof CellStates)[number];

const rotateCellState = rotateArrayConst<CellState>([...CellStates]);

function rotateArrayConst<T>(arrayConst: T[]): (current: T) => T {
  return (current: T) => {
    const currentIndex = arrayConst.indexOf(current);
    const nextIndex = (currentIndex + 1) % arrayConst.length;
    return arrayConst[nextIndex];
  };
}
