'use client';

import { useMemo } from 'react';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import { useGlobalController } from 'selective-context';
import { useEffectSyncWithDispatch } from 'dto-stores';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

export const GetAssignmentCellContentKey = 'getAssignmentCellContent';
export type AssignmentCellContent =
  | WorkProjectSeriesAssignmentDto[]
  | undefined;
export type GetAssignmentCellContent = MemoizedFunction<
  AssignmentCell,
  AssignmentCellContent
>;
export default function CycleSubspanQueryManager({
  tableData
}: {
  tableData: WorkProjectSeriesAssignmentTableDto;
}) {
  const listenerKey = useUuidListenerKey();
  const getCellContent: GetAssignmentCellContent = useMemo(() => {
    const { organizationToCycleSubspanIdToAssignmentId, assignmentIdToDtoMap } =
      tableData;

    return {
      memoizedFunction: ({ organizationId, cycleSubspanId }) => {
        const cycleSubspanIdToAssignmentIdElement =
          organizationToCycleSubspanIdToAssignmentId[`${organizationId}`];
        const assignmentIdElement = cycleSubspanIdToAssignmentIdElement
          ? cycleSubspanIdToAssignmentIdElement[`${cycleSubspanId}`]
          : undefined;
        return assignmentIdElement
          ? assignmentIdElement.map(
              (itemId) => assignmentIdToDtoMap[`${itemId}`]
            )
          : undefined;
      }
    };
  }, [tableData]);

  const { currentState, dispatch } = useGlobalController({
    contextKey: GetAssignmentCellContentKey,
    listenerKey: listenerKey,
    initialValue: getCellContent
  });

  useEffectSyncWithDispatch(getCellContent, dispatch);

  return null;
}

export interface AssignmentCell {
  organizationId: number;
  cycleSubspanId: number;
}
