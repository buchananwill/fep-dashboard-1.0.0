'use client';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import VirtualizedTableWindowed from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedTableWindowed';
import RenderAssignmentCell from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/RenderAssignmentCell';
import React, { useMemo } from 'react';
import { AssignmentCell } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CycleSubspanQueryManager';
import { FallbackCellMemo } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/FallbackCell';
import RenderOrganizationCell from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/RenderOrganizationCell';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';

export const selectedAssignmentCell = 'selectedAssignmentCell';
export default function AssignmentTable({
  tableData
}: {
  tableData: WorkProjectSeriesAssignmentTableDto;
}) {
  const rowList = tableData.organizationList.map((org) => org.id);

  const listenerKey = useUuidListenerKey();
  useGlobalController<number[]>({
    contextKey: selectedAssignmentCell,
    initialValue: EmptyArray,
    listenerKey
  });

  const columnList = tableData.cycleSubspanDtoList.map((cs) => cs.id);

  const tableLookUp = useMemo(() => {
    const tableLookUp: AssignmentCell[][] = [];
    for (let i = 0; i < rowList.length; i++) {
      tableLookUp.push([]);
      for (let j = 0; j < columnList.length; j++) {
        tableLookUp[i].push({
          organizationId: rowList[i],
          cycleSubspanId: columnList[j]
        });
      }
    }
    return tableLookUp;
  }, [rowList, columnList]);

  return (
    <VirtualizedTableWindowed
      rowIdList={rowList}
      columnIdList={columnList}
      itemData={tableLookUp}
      renderCell={memoCell}
      renderSyncedRowCell={FallbackCellMemo}
      renderSyncedColumnCell={memoOrganizationCell}
    />
  );
}

const memoCell = React.memo(RenderAssignmentCell);
const memoOrganizationCell = React.memo(RenderOrganizationCell);
