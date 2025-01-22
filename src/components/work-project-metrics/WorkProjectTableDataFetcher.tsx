'use client';
import FinderTableButton from '@/components/tables/FinderTableButton';
import React, { useEffect, useState } from 'react';
import {
  WorkProjectDto,
  WorkProjectWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { GenericTableDto } from '@/api/types';
import WorkProjectMetricTable from '@/components/work-project-metrics/WorkProjectMetricTable';
import {
  EditAddDeleteDtoControllerArray,
  KEY_TYPES,
  NamespacedHooks,
  useEffectSyncWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/client-literals';
import { getWorkProjectMetricsByWpsIdList } from '@/components/work-project-metrics/getWorkProjectMetricsByWpsIdList';

export default function WorkProjectTableDataFetcher({
  workProject
}: {
  workProject: WorkProjectWithSchemaLabelsDto[];
}) {
  const [tableData, setTableData] = useState(emptyTable);
  const { currentState: selectedList } = NamespacedHooks.useListen<string[]>(
    EntityClassMap.workProject,
    KEY_TYPES.SELECTED,
    'heatMapDataFetcher',
    EmptyArray
  );

  useEffect(() => {
    const fetchData = async () => {
      const metricTableDto = await getWorkProjectMetricsByWpsIdList(
        selectedList ?? []
      );
      setTableData(metricTableDto);
    };
    fetchData();
  }, [selectedList]);

  const dispatchCycleSubspans = NamespacedHooks.useDispatch(
    EntityClassMap.cycleSubspan,
    KEY_TYPES.MASTER_LIST
  );
  const dispatchMetrics = NamespacedHooks.useDispatch(
    EntityClassMap.workProjectMetric,
    KEY_TYPES.MASTER_LIST
  );

  useEffectSyncWithDispatch(tableData.columnList, dispatchCycleSubspans);
  useEffectSyncWithDispatch(
    Object.values(tableData.cellIdCellContentMap),
    dispatchMetrics
  );

  return (
    <>
      <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
        <FinderTableButton
          workProject={workProject as unknown as WorkProjectDto[]}
        />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.cycleSubspan}
          dtoList={EmptyArray}
        />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.workProjectMetric}
          dtoList={EmptyArray}
        />
        <WorkProjectMetricTable tableData={tableData} />
      </div>
    </>
  );
}

const emptyTable: GenericTableDto<any, any, any, any> = {
  rowList: [],
  columnList: [],
  cellIdCellContentMap: {},
  rowColumnCellReferenceMap: {}
};
