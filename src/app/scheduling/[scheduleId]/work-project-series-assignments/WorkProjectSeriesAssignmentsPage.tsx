import { Api } from '@/api/clientApi_';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import AssignmentTable from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentTable';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getMatchString } from '@/app/core/navigation/ResolveNavTree';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import SchedulingHome from '@/app/scheduling/SchedulingHome';
import FinderTableButton from '@/components/tables/FinderTableButton';

async function WorkProjectSeriesAssignmentsForSchedule({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const workProjectSeriesAssignmentTableDto: WorkProjectSeriesAssignmentTableDto =
    await getWithoutBody(
      constructUrl([
        '/api/v2/workProjectSeries/assignments/schedule',
        scheduleId
      ])
    );

  const strings: string[] = [
    ...Object.values(workProjectSeriesAssignmentTableDto.assignmentIdToDtoMap)
      .map(
        (assignment) => assignment.workProjectSeries.workProjectSeriesSchemaId
      )
      .reduce((prev, curr) => prev.add(curr), new Set<string>())
      .values()
  ];

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8 pt-16'}>
      <FinderTableButton
        organizations={workProjectSeriesAssignmentTableDto.organizationList}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={workProjectSeriesAssignmentTableDto.organizationList}
        entityClass={EntityClassMap.organization}
      />
      <DataFetchingEditDtoControllerArray
        idList={strings}
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />

      <AssignmentTable tableData={workProjectSeriesAssignmentTableDto} />
    </div>
  );
}

export const WorkProjectSeriesAssignmentsPage = getPathVariableSplitComponent(
  SchedulingHome,
  WorkProjectSeriesAssignmentsForSchedule
);
