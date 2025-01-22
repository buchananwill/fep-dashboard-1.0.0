import { getLastNVariables } from '@/functions/getLastNVariables';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectWithSchemaLabelsDto } from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkProjectTableDataFetcher from '@/components/work-project-metrics/WorkProjectTableDataFetcher';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export async function WorkProjectMetricsPage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const workProject = await getWithoutBody<WorkProjectWithSchemaLabelsDto[]>(
    constructUrl(['/api/v2/workProject/byBuildMetricId', buildMetricId])
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProject}
        dtoList={workProject}
      />
      {/*<DataFetchingEditDtoControllerArray*/}
      {/*  entityClass={EntityClassMap.workSchema}*/}
      {/*  idList={[...workSchemaIds.values()]}*/}
      {/*  getServerAction={Api.WorkSchema.getDtoListByBodyList}*/}
      {/*/>*/}
      <WorkProjectTableDataFetcher workProject={workProject} />
    </>
  );
}
