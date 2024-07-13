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
import { WorkProjectSeriesSchemaCode } from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/feasibility-report/_components/AssignmentFeasibilityTreeItem';

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
    MemoizedFunction<
      AssignmentCell,
      WorkProjectSeriesAssignmentDto[] | undefined
    >
  >({
    contextKey: GetAssignmentCellContent,
    initialValue: initialMemoizedFunction,
    listenerKey //: `${rowIndex}:${columnIndex}`
  });

  const cellData = useMemo(() => {
    const assignmentCell = data[rowIndex][columnIndex];
    return memoizedFunction(assignmentCell);
  }, [memoizedFunction, columnIndex, rowIndex, data]);

  return (
    <div style={style}>
      <div
        className={clsx(
          'h-full w-full border border-gray-400',
          cellData ? 'bg-emerald-400' : 'bg-gray-200 opacity-50'
        )}
      >
        {cellData ? (
          cellData.length == 1 ? (
            <LazyDtoUiWrapper
              renderAs={WorkProjectSeriesSchemaCode}
              entityId={cellData[0].workProjectSeries.workProjectSeriesSchemaId}
              entityClass={EntityClassMap.workProjectSeriesSchema}
              whileLoading={Loading}
            />
          ) : (
            'C'
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

const initialMemoizedFunction = {
  memoizedFunction: ({ cycleSubspanId, organizationId }: AssignmentCell) =>
    undefined
};
