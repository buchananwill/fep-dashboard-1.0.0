'use client';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto
} from '@/api/generated-types/generated-types_';
import CellQueryManager from '@/components/tables/CellQueryManager';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import React, { memo } from 'react';
import { getCellDataIdReferenceOrUndefined } from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import WorkProjectSeriesCell from '@/components/work-project-series-metrics/WorkProjectSeriesCell';
import WorkProjectSeriesBuildMetricCell from '@/components/work-project-series-metrics/WorkProjectSeriesBuildMetricCell';
import { MemoCycleSubspanCell } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';
import { useTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';

export default function WorkProjectSeriesMetricTable({
  tableData
}: {
  tableData: GenericTableDto<
    WorkProjectSeriesDto,
    CycleSubspanWithJoinsListDto,
    WorkProjectSeriesMetricDto,
    number[]
  >;
}) {
  console.log(tableData);
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

const MemoCell = memo(WorkProjectSeriesBuildMetricCell);
const MemoRowCell = memo(WorkProjectSeriesCell);