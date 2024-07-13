import JsonTree from '@/components/generic/JsonTree';
import { Api } from '@/api/clientApi';
import { WorkProjectSeriesAssignmentDto } from '@/api/dtos/WorkProjectSeriesAssignmentDtoSchema';
import { DataFetchingEditDtoControllerArray, EmptyArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { PartialDeep } from 'type-fest';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import CycleSubspanQueryManager from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CycleSubspanQueryManager';
import AssignmentTable from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentTable';

export default async function page({
  params: { scheduleId }
}: {
  params: { id: string; scheduleId: string };
}) {
  const workProjectSeriesAssignmentTableDto: WorkProjectSeriesAssignmentTableDto =
    await getWithoutBody(
      constructUrl([
        '/api/v2/workProjectSeries/assignments/schedule',
        scheduleId
      ])
    );

  const idList = Object.keys(
    workProjectSeriesAssignmentTableDto.organizationToCycleSubspanIdToAssignmentId
  ).map((orgId) => parseInt(orgId));

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8'}>
      <DataFetchingEditDtoControllerArray
        idList={idList}
        getServerAction={Api.Organization.getDtoListByBodyList}
        entityClass={EntityClassMap.organization}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
      <CycleSubspanQueryManager
        tableData={workProjectSeriesAssignmentTableDto}
      />
      <AssignmentTable tableData={workProjectSeriesAssignmentTableDto} />
    </div>
  );
}
