import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto
} from '@/api/generated-types/generated-types';
import WorkProjectSeriesMetricTable from '@/app/scheduling/[scheduleId]/work-project-series-metrics/WorkProjectSeriesMetricTable';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { Api } from '@/api/clientApi_';

export async function WorkProjectSeriesMetricsPage({
  pathVariables
}: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const metricTableDto = await getWithoutBody<
    GenericTableDto<
      WorkProjectSeriesDto,
      CycleSubspanWithJoinsListDto,
      WorkProjectSeriesMetricDto,
      number[]
    >
  >(
    constructUrl([
      '/api/v2/workProjectSeries/metrics',
      'scheduleId',
      scheduleId
    ])
  );

  const workProjectSeriesSchemaIds = metricTableDto.rowList.reduce(
    (prev, curr) => prev.add(curr.workProjectSeriesSchemaId),
    new Set<string>()
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeries}
        dtoList={metricTableDto.rowList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={metricTableDto.columnList}
      />
      <DataFetchingEditDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        idList={[...workProjectSeriesSchemaIds.values()]}
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesMetric}
        dtoList={Object.values(metricTableDto.cellIdCellContentMap)}
      />
      <WorkProjectSeriesMetricTable tableData={metricTableDto} />
    </>
  );
}
