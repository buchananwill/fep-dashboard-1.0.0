import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import FeasibilityReport, {
  taskTypeClassification
} from '@/app/feasibility-report/_components/FeasibilityReport';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import GmailTreeView from '@/app/test/GmailClone';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const feasibilityReportFullDto: FeasibilityReportFullDto =
    await getWithoutBody(
      constructUrl(`/api/v2/resourceMetrics/feasibilityReport/${id}`)
    );

  return (
    <>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkTaskType.getDtoListByBodyList}
        entityClass={EntityClassMap.workTaskType}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkSchemaNode.getDtoListByBodyList}
        entityClass={EntityClassMap.workSchemaNode}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={feasibilityReportFullDto.taskTypeClassifications}
        entityClass={taskTypeClassification}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
      <FeasibilityReport report={feasibilityReportFullDto} />
    </>
  );
}
