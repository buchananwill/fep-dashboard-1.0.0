import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import WorkProjectSeriesMetricTable from '@/components/work-project-series-metrics/WorkProjectSeriesMetricTable';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { Api } from '@/api/clientApi_';
import WorkProjectSeriesTableDataFetcher, {
  WorkProjectSeriesLeanDto
} from '@/components/work-project-series-metrics/WorkProjectSeriesTableDataFetcher';

export async function WorkProjectSeriesMetricsPage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const workProjectSeries = await getWithoutBody<
    WorkProjectSeriesWithSchemaLabelsDto[]
  >(constructUrl(['/api/v2/workProjectSeries/byBuildMetricId', buildMetricId]));

  // const metricTableDto = await getWithoutBody<
  //   GenericTableDto<
  //     WorkProjectSeriesDto,
  //     CycleSubspanWithJoinsListDto,
  //     WorkProjectSeriesMetricDto,
  //     number[]
  //   >
  // >(
  //   constructUrl([
  //     '/api/v2/workProjectSeries/metrics/heatMapTable',
  //     buildMetricId
  //   ])
  // );

  // const workProjectSeriesSchemaIds = workProjectSeries.reduce(
  //   (prev, curr) => prev.add(curr.workProjectSeriesSchemaId),
  //   new Set<string>()
  // );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeries}
        dtoList={workProjectSeries}
      />
      {/*<DataFetchingEditDtoControllerArray*/}
      {/*  entityClass={EntityClassMap.workProjectSeriesSchema}*/}
      {/*  idList={[...workProjectSeriesSchemaIds.values()]}*/}
      {/*  getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}*/}
      {/*/>*/}
      <WorkProjectSeriesTableDataFetcher
        workProjectSeries={workProjectSeries}
      />
    </>
  );
}
