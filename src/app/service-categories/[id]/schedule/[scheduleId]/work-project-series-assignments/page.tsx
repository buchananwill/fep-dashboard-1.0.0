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
  const exampleAssignment: PartialDeep<WorkProjectSeriesAssignmentDto> = {
    workProjectSeries: { scheduleId: parseInt(scheduleId) }
  };

  const workProjectSeriesAssignmentTableDto: WorkProjectSeriesAssignmentTableDto =
    await getWithoutBody(
      constructUrl([
        '/api/v2/workProjectSeries/assignments/schedule',
        scheduleId
      ])
    );

  const data: WorkProjectSeriesAssignmentDto[] =
    await Api.WorkProjectSeriesAssignment.getAll();

  const groupByOrgId = data.reduce(
    (prev, curr) => {
      const next = { ...prev };
      const currKey = String(curr.organizationId);
      if (Object.hasOwn(next, curr.organizationId)) {
        const prevList = next[currKey];
        next[currKey] = [...prevList, curr];
      } else {
        next[currKey] = [curr];
      }
      return next;
    },
    {} as Record<string, WorkProjectSeriesAssignmentDto[]>
  );

  return (
    <div className={'h-[75vh] w-[75vw]'}>
      {/*<div className={'h-full min-h-fit w-full drop-shadow-md '}>*/}
      {/*  <DataFetchingEditDtoControllerArray*/}
      {/*    idList={EmptyArray}*/}
      {/*    getServerAction={Api.Organization.getDtoListByBodyList}*/}
      {/*    entityClass={EntityClassMap.organization}*/}
      {/*  />*/}
      {/*  {workProjectSeriesAssignmentTableDto && (*/}
      {/*    <JsonTree data={workProjectSeriesAssignmentTableDto} />*/}
      {/*  )}*/}
      {/*</div>*/}
      <CycleSubspanQueryManager
        tableData={workProjectSeriesAssignmentTableDto}
      />
      <AssignmentTable tableData={workProjectSeriesAssignmentTableDto} />
    </div>
  );
}
