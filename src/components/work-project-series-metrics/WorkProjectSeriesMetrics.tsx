import { getLastNVariables } from '@/functions/getLastNVariables';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesWithSchemaLabelsDto } from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkProjectSeriesTableDataFetcher from '@/components/work-project-series-metrics/WorkProjectSeriesTableDataFetcher';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export async function WorkProjectSeriesMetricsPage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const workProjectSeries = await getWithoutBody<
    WorkProjectSeriesWithSchemaLabelsDto[]
  >(constructUrl(['/api/v2/workProjectSeries/byBuildMetricId', buildMetricId]));

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeries}
        dtoList={workProjectSeries}
      />
      {/*<DataFetchingEditDtoControllerArray*/}
      {/*  entityClass={EntityClassMap.workSchema}*/}
      {/*  idList={[...workSchemaIds.values()]}*/}
      {/*  getServerAction={Api.WorkSchema.getDtoListByBodyList}*/}
      {/*/>*/}
      <WorkProjectSeriesTableDataFetcher
        workProjectSeries={workProjectSeries}
      />
    </>
  );
}
