'use client';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto
} from '@/api/generated-types/generated-types_';
import FinderTableButton from '@/components/tables/FinderTableButton';
import CellQueryManager from '@/components/tables/CellQueryManager';
import { EntityClassMap } from '@/api/entity-class-map';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import React, { memo } from 'react';
import { getCellDataIdReferenceOrUndefined } from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import { useFilteredRows } from '@/app/work-project-series-schemas/static-allocation/useFilteredRows';
import WorkProjectSeriesCell from '@/components/work-project-series-metrics/WorkProjectSeriesCell';
import WorkProjectSeriesBuildMetricCell from '@/components/work-project-series-metrics/WorkProjectSeriesBuildMetricCell';
import { MemoCycleSubspanCell } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';

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
  const tableProps = useFilteredRows(
    tableData,
    EntityClassMap.workProjectSeries
  );
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
