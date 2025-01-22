'use client';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectDto,
  WorkProjectMetricDto
} from '@/api/generated-types/generated-types_';
import CellQueryManager from '@/components/grids/CellQueryManager';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import React, { memo } from 'react';
import { getCellDataIdReferenceOrUndefined } from '@/components/work-schema/static-allocation/getCellDataOrUndefined';
import WorkProjectCell from '@/components/work-project-metrics/WorkProjectCell';
import WorkProjectBuildMetricCell from '@/components/work-project-metrics/WorkProjectBuildMetricCell';
import { MemoCycleSubspanCell } from '@/components/work-schema/static-allocation/StaticAllocationTable';
import { useTableProps } from '@/components/grids/useTableProps';

export default function WorkProjectMetricTable({
  tableData
}: {
  tableData: GenericTableDto<
    WorkProjectDto,
    CycleSubspanWithJoinsListDto,
    WorkProjectMetricDto,
    number[]
  >;
}) {
  const tableProps = useTableProps(tableData.rowList, tableData.columnList);
  return (
    <>
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={getCellDataIdReferenceOrUndefined}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={MemoCell}
        renderSyncedRowCell={MemoCycleSubspanCell}
        renderSyncedColumnCell={MemoRowCell}
      />
    </>
  );
}

const MemoCell = memo(WorkProjectBuildMetricCell);
const MemoRowCell = memo(WorkProjectCell);
