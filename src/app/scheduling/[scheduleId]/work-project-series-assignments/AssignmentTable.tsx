'use client';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import React, { useMemo } from 'react';
import CellQueryManager, {
  CellIdReference
} from '@/components/tables/CellQueryManager';
import { FallbackCellMemo } from '@/components/tables/FallbackCell';
import RenderOrganizationCell from '@/app/scheduling/[scheduleId]/work-project-series-assignments/RenderOrganizationCell';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import VirtualizedOuterCell from '@/components/tables/VirtualizedCell';
import AssignmentCell from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { workProjectSeriesDataRetrieval } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/workProjectSeriesDataRetrieval';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

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
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={tableData.cycleSubspanDtoList}
      />
      <VirtualizedTableWindowed
        rowIdList={rowList}
        columnIdList={columnList}
        itemData={tableLookUp}
        renderCell={memoCell}
        renderSyncedRowCell={CycleSubspanCell}
        renderSyncedColumnCell={memoOrganizationCell}
      />
    </>
  );
}

const memoCell = React.memo(AssignmentCell);
const memoOrganizationCell = React.memo(RenderOrganizationCell);
