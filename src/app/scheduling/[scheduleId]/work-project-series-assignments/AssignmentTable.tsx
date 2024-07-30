'use client';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import React, { useMemo } from 'react';
import CellQueryManager, {
  CellIdReference
} from '@/components/tables/CellQueryManager';
import RenderOrganizationCell from '@/app/scheduling/[scheduleId]/work-project-series-assignments/RenderOrganizationCell';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import AssignmentCell from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { workProjectSeriesDataRetrieval } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/workProjectSeriesDataRetrieval';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { EditAddDeleteDtoControllerArray, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFilteredRows } from '@/app/work-project-series-schemas/static-allocation/useFilteredRows';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export const selectedAssignmentCell = 'selectedAssignmentCell';
export default function AssignmentTable({
  tableData
}: {
  tableData: GenericTableDto<
    OrganizationDto,
    CycleSubspanDto,
    WorkProjectSeriesAssignmentDto,
    number[]
  >;
}) {
  const rowIdList = tableData.rowList.map((org) => org.id);

  const { currentState: workProjectSeriesSchemas } = NamespacedHooks.useListen(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.MASTER_LIST,
    'AssignmentTable',
    EmptyArray as WorkProjectSeriesSchemaDto[]
  );

  const listenerKey = useUuidListenerKey();
  useGlobalController<number[]>({
    contextKey: selectedAssignmentCell,
    initialValue: EmptyArray,
    listenerKey
  });

  const columnIdList = tableData.columnList.map((cs) => cs.id);
  const tableProps = useFilteredRows(
    tableData,
    tableData.rowList,
    tableData.columnList,
    EntityClassMap.organization
  );

  const tableLookUp = useMemo(() => {
    const tableLookUp: CellIdReference[][] = [];
    for (let i = 0; i < rowIdList.length; i++) {
      tableLookUp.push([]);
      for (let j = 0; j < columnIdList.length; j++) {
        tableLookUp[i].push({
          rowId: rowIdList[i],
          columnId: columnIdList[j]
        });
      }
    }
    return tableLookUp;
  }, [rowIdList, columnIdList]);

  return (
    <>
      <FinderTableButton
        organizations={tableData.rowList}
        workProjectSeriesSchemas={workProjectSeriesSchemas}
      />
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={workProjectSeriesDataRetrieval}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={tableData.columnList}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={memoCell}
        renderSyncedRowCell={CycleSubspanCell}
        renderSyncedColumnCell={memoOrganizationCell}
      />
    </>
  );
}

const memoCell = React.memo(AssignmentCell);
const memoOrganizationCell = React.memo(RenderOrganizationCell);
