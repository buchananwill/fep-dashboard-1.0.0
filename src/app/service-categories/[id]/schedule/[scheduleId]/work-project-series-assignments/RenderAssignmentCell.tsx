'use client';
import { GridChildComponentProps } from 'react-window';
import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import {
  AssignmentCell,
  AssignmentCellContent,
  GetAssignmentCellContent,
  GetAssignmentCellContentKey
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CycleSubspanQueryManager';
import React, { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import {
  NamedEntityLabel,
  WorkProjectSeriesSchemaCode
} from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/feasibility-report/_components/AssignmentFeasibilityTreeItem';
import { selectedAssignmentCell } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentTable';
import { EmptyArray } from '@/api/literals';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';

export default function RenderAssignmentCell({
  rowIndex,
  columnIndex,
  data,
  style
}: GridChildComponentProps<AssignmentCell[][]>) {
  const listenerKey = useUuidListenerKey();
  const {
    currentState: { memoizedFunction }
  } = useGlobalListener<GetAssignmentCellContent>({
    contextKey: GetAssignmentCellContentKey,
    initialValue: initialMemoizedFunction,
    listenerKey
  });

  const cellData: WorkProjectSeriesAssignmentDto[] | undefined = useMemo(() => {
    const assignmentCell = data[rowIndex][columnIndex];
    return memoizedFunction(assignmentCell);
  }, [memoizedFunction, columnIndex, rowIndex, data]);

  const { dispatchWithoutControl, currentState } = useGlobalDispatchAndListener<
    number[]
  >({
    contextKey: selectedAssignmentCell,
    listenerKey: `${rowIndex}:${columnIndex}`,
    initialValue: EmptyArray
  });

  const handleClick = useCallback(() => {
    dispatchWithoutControl([rowIndex, columnIndex]);
  }, [dispatchWithoutControl, rowIndex, columnIndex]);

  const tooltip = useFloatingTooltip(
    <AssignmentTooltipMemo content={cellData} />
  );

  const selected =
    currentState[0] === rowIndex && currentState[1] === columnIndex;
  const lastInDay = (columnIndex + 1) % 6 === 0;

  return (
    <div
      style={style}
      className={clsx(
        ' flex h-full w-full border ',
        cellData ? 'bg-emerald-400' : 'bg-gray-200 opacity-50',
        selected ? 'border-sky-400' : '',
        lastInDay ? 'border-r-gray-700' : ''
      )}
    >
      <div
        onClick={handleClick}
        className={'mb-auto ml-auto mr-auto mt-auto h-fit w-fit'}
        {...tooltip}
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
            'C:' + cellData.length
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

function AssignmentTooltip({ content }: { content: AssignmentCellContent }) {
  if (content === undefined) return 'No assignment';

  return (
    <div
      className={
        'pointer-events-none flex flex-col rounded-md border border-amber-300 bg-amber-50 p-2 text-black'
      }
    >
      {content.map((assignment) => {
        return (
          <LazyDtoUiWrapper
            key={assignment.id}
            renderAs={NamedEntityLabel}
            entityId={assignment.workProjectSeries.workProjectSeriesSchemaId}
            entityClass={EntityClassMap.workProjectSeriesSchema}
            whileLoading={Loading}
          />
        );
      })}
    </div>
  );
}

const AssignmentTooltipMemo = memo(AssignmentTooltip);
