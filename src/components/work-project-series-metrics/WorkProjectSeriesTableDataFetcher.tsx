import FinderTableButton from '@/components/tables/FinderTableButton';
import React from 'react';
import {
  WorkProjectSeriesDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';

export default function WorkProjectSeriesTableDataFetcher({
  workProjectSeries
}: {
  workProjectSeries: WorkProjectSeriesWithSchemaLabelsDto[];
}) {
  return (
    <>
      <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
        <FinderTableButton workProjectSeries={workProjectSeries} />
        {/*<EditAddDeleteDtoControllerArray*/}
        {/*  entityClass={EntityClassMap.cycleSubspan}*/}
        {/*  dtoList={metricTableDto.columnList}*/}
        {/*/>*/}
        {/*<EditAddDeleteDtoControllerArray*/}
        {/*  entityClass={EntityClassMap.workProjectSeriesMetric}*/}
        {/*  dtoList={Object.values(metricTableDto.cellIdCellContentMap)}*/}
        {/*/>*/}
        {/*<WorkProjectSeriesMetricTable tableData={metricTableDto} />*/}
      </div>
    </>
  );
}

export type WorkProjectSeriesLeanDto = Omit<
  WorkProjectSeriesDto,
  'workTaskSeries'
>;
