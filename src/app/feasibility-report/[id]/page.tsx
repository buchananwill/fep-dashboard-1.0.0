import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import FeasibilityReport, {
  taskTypeClassification
} from '@/app/feasibility-report/_components/FeasibilityReport';

import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { FullReportDto } from '@/api/dtos/FullReportDtoSchema';
import { FullReport } from '@/app/feasibility-report/_components/types';
import { Card, CardBody } from '@nextui-org/card';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const feasibilityReportFullDto: FullReport = await getWithoutBody(
    constructUrl(`/api/v2/resourceMetrics/feasibilityReport/${id}`)
  );

  console.log(feasibilityReportFullDto);

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
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.Organization.getDtoListByBodyList}
        entityClass={EntityClassMap.organization}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkSchemaNodeAssignment.getDtoListByBodyList}
        entityClass={EntityClassMap.workSchemaNodeAssignment}
      />
      <div className={'p-4'}>
        <FeasibilityReport report={feasibilityReportFullDto} />
      </div>
    </>
  );
}
