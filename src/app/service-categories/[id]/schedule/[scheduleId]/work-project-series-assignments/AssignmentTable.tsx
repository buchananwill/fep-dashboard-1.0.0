'use client';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import VirtualizedTableWindowed from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedTableWindowed';
import React, { useMemo } from 'react';
import CellQueryManager, {
  CellIdReference
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import { FallbackCellMemo } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/FallbackCell';
import RenderOrganizationCell from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/RenderOrganizationCell';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import VirtualizedOuterCell from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedCell';
import AssignmentCell from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { workProjectSeriesDataRetrieval } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/workProjectSeriesDataRetrieval';

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
    const tableLookUp: CellIdReference[][] = [];
    for (let i = 0; i < rowList.length; i++) {
      tableLookUp.push([]);
      for (let j = 0; j < columnList.length; j++) {
        tableLookUp[i].push({
          rowId: rowList[i],
          columnId: columnList[j]
        });
      }
    }
    return tableLookUp;
  }, [rowList, columnList]);

  return (
    <>
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={workProjectSeriesDataRetrieval}
      />
      <VirtualizedTableWindowed
        rowIdList={rowList}
        columnIdList={columnList}
        itemData={tableLookUp}
        renderCell={memoCell}
        renderSyncedRowCell={FallbackCellMemo}
        renderSyncedColumnCell={memoOrganizationCell}
      />
    </>
  );
}

const memoCell = React.memo(AssignmentCell);
const memoOrganizationCell = React.memo(RenderOrganizationCell);
