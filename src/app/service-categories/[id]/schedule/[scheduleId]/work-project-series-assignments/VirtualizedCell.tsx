import { GridChildComponentProps } from 'react-window';
import {
  CellIdReference,
  GetCellContentKey,
  GetCellContent
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { selectedAssignmentCell } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentTable';
import { EmptyArray } from '@/api/literals';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import clsx from 'clsx';
import { LazyDtoUiWrapper } from 'dto-stores';
import { WorkProjectSeriesSchemaCode } from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/feasibility-report/_components/AssignmentFeasibilityTreeItem';
import { InnerCellContent } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentCell';

export type OuterCellProps = GridChildComponentProps<CellIdReference[][]> & {
  innerCell: (props: InnerCellContent) => ReactNode;
};

export type CellWrapperProps = GridChildComponentProps<CellIdReference[][]>;

export default function VirtualizedOuterCell({
  rowIndex,
  columnIndex,
  data,
  style,
  innerCell: InnerCell,
  ...props
}: OuterCellProps) {
  const innerProps = useMemo(() => {
    return { rowIndex, columnIndex, data, ...props };
  }, [rowIndex, props, columnIndex, data]);
  const listenerKey = useUuidListenerKey();
  const {
    currentState: { memoizedFunction }
  } = useGlobalListener<GetCellContent>({
    contextKey: GetCellContentKey,
    initialValue: initialMemoizedFunction,
    listenerKey
  });

  const cellData: WorkProjectSeriesAssignmentDto[] | undefined = useMemo(() => {
    const assignmentCell = data[rowIndex][columnIndex];
    return memoizedFunction(assignmentCell);
  }, [memoizedFunction, columnIndex, rowIndex, data]);

  return (
    <div style={style} className={clsx(' h-full w-full')}>
      <InnerCell {...innerProps} cellData={cellData} />
    </div>
  );
}

const initialMemoizedFunction = {
  memoizedFunction: ({ columnId, rowId }: CellIdReference) => undefined
};
