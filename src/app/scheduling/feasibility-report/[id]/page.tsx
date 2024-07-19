import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import FeasibilityReport, {
  taskTypeClassification
} from '@/app/scheduling/feasibility-report/_components/FeasibilityReport';

import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { FullReport } from '@/app/scheduling/feasibility-report/_components/types';
import { Link } from '@nextui-org/link';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const feasibilityReportFullDto: FullReport = await getWithoutBody(
    constructUrl(`/api/v2/schedule/feasibilityReport/${id}`)
  );

  if (feasibilityReportFullDto.reportStatus === 'PENDING') {
    return <Link href={`/scheduling/feasibility-report/${id}`}>Pending</Link>;
  }

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
