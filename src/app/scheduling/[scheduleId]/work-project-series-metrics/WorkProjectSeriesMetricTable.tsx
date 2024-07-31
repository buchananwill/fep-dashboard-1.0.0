'use client';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto
} from '@/api/generated-types/generated-types';
import FinderTableButton from '@/components/tables/FinderTableButton';
import CellQueryManager from '@/components/tables/CellQueryManager';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import React, { memo } from 'react';
import { getCellDataIdReferenceOrUndefined } from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import { useFilteredRows } from '@/app/work-project-series-schemas/static-allocation/useFilteredRows';
import WorkProjectSeriesCell from '@/app/scheduling/[scheduleId]/work-project-series-metrics/WorkProjectSeriesCell';
import WorkProjectSeriesBuildMetricCell from '@/app/scheduling/[scheduleId]/work-project-series-metrics/WorkProjectSeriesBuildMetricCell';
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
    <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
      <FinderTableButton />
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={getCellDataIdReferenceOrUndefined}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={MemoCell}
        renderSyncedRowCell={MemoCycleSubspanCell}
        renderSyncedColumnCell={WorkProjectSeriesCell}
      />
    </div>
  );
}

const MemoCell = memo(WorkProjectSeriesBuildMetricCell);
