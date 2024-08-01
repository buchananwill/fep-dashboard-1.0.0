'use client';
import { GridChildComponentProps } from 'react-window';
import {
  AssignmentCellContent,
  CellIdReference
} from '@/components/tables/CellQueryManager';
import React, { memo, useCallback, useMemo } from 'react';
import {
  NamedEntityLabel,
  WorkProjectSeriesSchemaCode
} from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { LazyDtoUiWrapper, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/scheduling/feasibility-report/_components/AssignmentFeasibilityTreeItem';
import { useGlobalDispatchAndListener } from 'selective-context';
import { selectedAssignmentCell } from '@/components/work-project-series-assignments/AssignmentTable';
import { EmptyArray } from '@/api/literals';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import clsx from 'clsx';
import VirtualizedOuterCell from '@/components/tables/VirtualizedCell';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export default function AssignmentCell(props: CellWrapperProps) {
  return <VirtualizedOuterCell {...props} innerCell={InnerAssignmentCell} />;
}

function InnerAssignmentCell({
  rowIndex,
  columnIndex,
  cellData
}: InnerCellContent<WorkProjectSeriesAssignmentDto>) {
  const { dispatchWithoutControl, currentState } = useGlobalDispatchAndListener<
    number[]
  >({
    contextKey: selectedAssignmentCell,
    listenerKey: `${rowIndex}:${columnIndex}`,
    initialValue: EmptyArray
  });
  const listenerKey = `assignmentCell:${rowIndex}:${columnIndex}`;

  // const schemaIdSet = useMemo(() => {
  //   return cellData
  //     ? cellData.reduce(
  //         (prev, curr) =>
  //           prev.add(curr.workProjectSeries.workProjectSeriesSchemaId),
  //         new Set<string>()
  //       )
  //     : new Set<string>();
  // }, [cellData]);

  const selectSchemaIdList = NamespacedHooks.useListen(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as string[]
  );

  const showCell = useMemo(() => {
    return (
      selectSchemaIdList.currentState.length === 0 ||
      selectSchemaIdList.currentState.some(
        (someId) =>
          someId === cellData?.workProjectSeries.workProjectSeriesSchemaId
      )
    );
  }, [cellData, selectSchemaIdList]);

  const handleClick = useCallback(() => {
    dispatchWithoutControl([rowIndex, columnIndex]);
  }, [dispatchWithoutControl, rowIndex, columnIndex]);

  const tooltip = useFloatingTooltip(
    <AssignmentTooltipMemo content={cellData} />
  );

  const selected =
    currentState[0] === rowIndex && currentState[1] === columnIndex;
  const lastInDay = (columnIndex + 1) % 6 === 0;

  if (!showCell) return null;

  return (
    <div
      onClick={handleClick}
      className={clsx(
        cellData ? '' : 'bg-gray-200 opacity-50',
        selected ? 'border-sky-400' : '',
        lastInDay ? 'border-r border-r-gray-700' : '',
        'mb-auto ml-auto mr-auto mt-auto h-full w-full'
      )}
      {...tooltip}
    >
      {
        cellData && (
          // cellData.length == 1 ? (
          <LazyDtoUiWrapper
            renderAs={WorkProjectSeriesSchemaCode}
            entityId={cellData.workProjectSeries.workProjectSeriesSchemaId}
            entityClass={EntityClassMap.workProjectSeriesSchema}
            whileLoading={Loading}
          />
        )
        //   : (
        //     <div className={'flex h-full items-center justify-center'}>
        //       C:{cellData.length}
        //     </div>
        //   )
        // ) : (
        //   ''
      }
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
      <LazyDtoUiWrapper
        key={content.id}
        renderAs={NamedEntityLabel}
        entityId={content.workProjectSeries.workProjectSeriesSchemaId}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        whileLoading={Loading}
      />
    </div>
  );
}

const AssignmentTooltipMemo = memo(AssignmentTooltip);

export type InnerCellContent<T = any> = {
  cellData?: T;
} & Omit<GridChildComponentProps<CellIdReference[][]>, 'style'>;
