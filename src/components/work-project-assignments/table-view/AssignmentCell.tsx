'use client';
import { GridChildComponentProps } from 'react-window';
import {
  AssignmentCellContent,
  CellIdReference
} from '@/components/grids/CellQueryManager';
import React, { memo, useCallback, useMemo } from 'react';
import { EntityWithWorkTypeShortCode } from '@/components/feasibility-report/WorkSchemaLabel';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useGlobalDispatchAndListener } from 'selective-context';
import { selectedAssignmentCell } from '@/components/work-project-assignments/table-view/AssignmentTable';
import { EmptyArray } from '@/api/client-literals';
import { usePopoverSingleton } from '@/components/tooltip/usePopoverSingleton';
import clsx from 'clsx';
import VirtualizedOuterCell from '@/components/grids/VirtualizedCell';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectAssignmentDto
} from '@/api/generated-types/generated-types_';
import { InnerWorkProjectCell } from '@/components/work-project-metrics/WorkProjectCell';

export default function AssignmentCell(props: CellWrapperProps) {
  return <VirtualizedOuterCell {...props} innerCell={InnerAssignmentCell} />;
}

function InnerAssignmentCell({
  rowIndex,
  columnIndex,
  cellData,
  data
}: InnerCellContent<WorkProjectAssignmentDto>) {
  const { dispatchWithoutControl, currentState } = useGlobalDispatchAndListener<
    number[]
  >({
    contextKey: selectedAssignmentCell,
    listenerKey: `${rowIndex}:${columnIndex}`,
    initialValue: EmptyArray
  });
  const listenerKey = `assignmentCell:${rowIndex}:${columnIndex}`;

  const selectSchemaIdList = NamespacedHooks.useListen(
    EntityClassMap.workSchema,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );

  const showCell = useMemo(() => {
    return (
      selectSchemaIdList.currentState.length === 0 ||
      selectSchemaIdList.currentState.some(
        (someId) => someId === cellData?.workProject.workSchemaId
      )
    );
  }, [cellData?.workProject.workSchemaId, selectSchemaIdList.currentState]);

  const handleClick = useCallback(() => {
    dispatchWithoutControl([rowIndex, columnIndex]);
  }, [dispatchWithoutControl, rowIndex, columnIndex]);

  const tooltip = usePopoverSingleton(
    <AssignmentTooltipMemo content={cellData} />
  );

  const selected =
    currentState[0] === rowIndex && currentState[1] === columnIndex;

  const readAnyDto = useReadAnyDto<CycleSubspanWithJoinsListDto>(
    EntityClassMap.cycleSubspan
  );

  const firstInDay = useMemo(() => {
    return readAnyDto(data[rowIndex][columnIndex].columnId)?.dayOrdinal === 0;
  }, [readAnyDto, data, rowIndex, columnIndex]);

  if (!showCell) return null;

  return (
    <div
      onClick={handleClick}
      className={clsx(
        cellData ? '' : 'bg-gray-200 opacity-50',
        selected ? 'border-sky-400' : '',
        firstInDay ? 'border-l border-l-gray-700' : '',
        'mb-auto ml-auto mr-auto mt-auto h-full w-full'
      )}
      {...tooltip}
    >
      {cellData && (
        <EntityWithWorkTypeShortCode entity={cellData.workProject} />
      )}
    </div>
  );
}

function AssignmentTooltip({ content }: { content: AssignmentCellContent }) {
  if (content === undefined) return 'No assignment';

  return (
    <div
      className={
        'pointer-events-none flex flex-col rounded-md border border-amber-300 bg-amber-50 p-2 text-black'
      }
    >
      <InnerWorkProjectCell entity={content.workProject} />
    </div>
  );
}

const AssignmentTooltipMemo = memo(AssignmentTooltip);

export type InnerCellContent<T = any> = {
  cellData?: T;
} & Omit<GridChildComponentProps<CellIdReference[][]>, 'style'>;
