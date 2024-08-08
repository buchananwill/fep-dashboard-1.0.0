'use client';
import FinderTableButton from '@/components/tables/FinderTableButton';
import React, { useEffect, useState } from 'react';
import {
  WorkProjectSeriesDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { GenericTableDto } from '@/api/types';
import WorkProjectSeriesMetricTable from '@/components/work-project-series-metrics/WorkProjectSeriesMetricTable';
import {
  EditAddDeleteDtoControllerArray,
  KEY_TYPES,
  NamespacedHooks,
  useEffectSyncWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { getWorkProjectSeriesMetricsByWpsIdList } from '@/components/work-project-series-metrics/getWorkProjectSeriesMetricsByWpsIdList';

export default function WorkProjectSeriesTableDataFetcher({
  workProjectSeries
}: {
  workProjectSeries: WorkProjectSeriesWithSchemaLabelsDto[];
}) {
  const [tableData, setTableData] = useState(emptyTable);
  const { currentState: selectedList } = NamespacedHooks.useListen<string[]>(
    EntityClassMap.workProjectSeries,
    KEY_TYPES.SELECTED,
    'heatMapDataFetcher',
    EmptyArray
  );

  useEffect(() => {
    const fetchData = async () => {
      const metricTableDto =
        await getWorkProjectSeriesMetricsByWpsIdList(selectedList);
      setTableData(metricTableDto);
    };
    fetchData();
  }, [selectedList]);

  const dispatchCycleSubspans = NamespacedHooks.useDispatch(
    EntityClassMap.cycleSubspan,
    KEY_TYPES.MASTER_LIST
  );

  useEffectSyncWithDispatch(tableData.columnList, dispatchCycleSubspans);

  return (
    <>
      <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
        <FinderTableButton workProjectSeries={workProjectSeries} />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.cycleSubspan}
          dtoList={EmptyArray}
        />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.workProjectSeriesMetric}
          dtoList={Object.values(tableData.cellIdCellContentMap)}
        />
        <WorkProjectSeriesMetricTable tableData={tableData} />
      </div>
    </>
  );
}

export type WorkProjectSeriesLeanDto = Omit<
  WorkProjectSeriesDto,
  'workTaskSeries'
>;

const emptyTable: GenericTableDto<any, any, any, any> = {
  rowList: [],
  columnList: [],
  cellIdCellContentMap: {},
  rowColumnCellReferenceMap: {}
};