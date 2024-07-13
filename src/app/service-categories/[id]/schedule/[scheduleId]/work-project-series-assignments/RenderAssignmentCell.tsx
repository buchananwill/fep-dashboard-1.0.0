'use client';
import { GridChildComponentProps } from 'react-window';
import { useGlobalListener } from 'selective-context';
import {
  AssignmentCell,
  GetAssignmentCellContent
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CycleSubspanQueryManager';
import { useMemo } from 'react';
import clsx from 'clsx';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';

export default function RenderAssignmentCell({
  rowIndex,
  columnIndex,
  data,
  style
}: GridChildComponentProps<AssignmentCell[][]>) {
  const listenerKey = useUuidListenerKey();
  const {
    currentState: { memoizedFunction }
  } = useGlobalListener<
    MemoizedFunction<AssignmentCell, WorkProjectSeriesAssignmentDto | undefined>
  >({
    contextKey: GetAssignmentCellContent,
    initialValue: initialMemoizedFunction,
    listenerKey //: `${rowIndex}:${columnIndex}`
  });

  const isAssigned = useMemo(() => {
    const assignmentCell = data[rowIndex][columnIndex];
    const cellData = memoizedFunction(assignmentCell);
    console.log(cellData);
    return cellData !== undefined;
  }, [memoizedFunction, columnIndex, rowIndex, data]);

  return (
    <div style={style}>
      <div
        className={clsx(
          'h-full w-full border-2 border-rose-500',
          isAssigned ? 'bg-emerald-400' : 'bg-gray-200'
        )}
      >
        {rowIndex},{columnIndex}
      </div>
    </div>
  );
}

const initialMemoizedFunction = {
  memoizedFunction: ({ cycleSubspanId, organizationId }: AssignmentCell) =>
    undefined
};
