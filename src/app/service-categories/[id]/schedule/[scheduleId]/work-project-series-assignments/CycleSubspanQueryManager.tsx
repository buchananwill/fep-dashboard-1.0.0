'use client';

import { useMemo } from 'react';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import { useGlobalController } from 'selective-context';
import { useEffectSyncWithDispatch } from 'dto-stores';

export const GetAssignmentCellContent = 'getAssignmentCellContent';
export default function CycleSubspanQueryManager({
  tableData
}: {
  tableData: WorkProjectSeriesAssignmentTableDto;
}) {
  const getCellContent: MemoizedFunction<
    AssignmentCell,
    WorkProjectSeriesAssignmentDto | undefined
  > = useMemo(() => {
    Object.keys(tableData.organizationToCycleSubspanIdToAssignmentId).forEach(
      (mapKey) => console.log(typeof mapKey)
    );
    const { organizationToCycleSubspanIdToAssignmentId, assignmentIdToDtoMap } =
      tableData;
    const getOrganizationMap = (id: number) =>
      organizationToCycleSubspanIdToAssignmentId[`${id}`];
    const getAssignmentId = (id: number, innerMap: Record<string, number>) =>
      innerMap ? innerMap[id] : undefined;
    const getAssignment = (id: number | undefined) =>
      id ? assignmentIdToDtoMap[String(id)] : undefined;
    return {
      memoizedFunction: (param) => {
        console.log(typeof param.organizationId, typeof param.cycleSubspanId);
        const organizationMap = getOrganizationMap(param.organizationId);
        console.log(organizationMap);
        const assignmentId = getAssignmentId(
          param.cycleSubspanId,
          organizationMap
        );
        console.log(assignmentId);
        return getAssignment(assignmentId);
      }
    };
  }, [tableData]);

  const { currentState, dispatch } = useGlobalController({
    contextKey: GetAssignmentCellContent,
    listenerKey: 'controller',
    initialValue: getCellContent
  });

  useEffectSyncWithDispatch(getCellContent, dispatch);

  return null;
}

export interface AssignmentCell {
  organizationId: number;
  cycleSubspanId: number;
}
