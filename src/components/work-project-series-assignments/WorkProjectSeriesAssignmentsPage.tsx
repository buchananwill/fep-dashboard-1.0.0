import { Api } from '@/api/clientApi_';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesAssignmentTableDto } from '@/api/dtos/WorkProjectSeriesAssignmentTableDtoSchema_';
import AssignmentTable, {
  AssignmentTableRowClassName
} from '@/components/work-project-series-assignments/AssignmentTable';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import SchedulingHome from '@/app/core/scheduling/SchedulingHome';
import FinderTableButton from '@/components/tables/FinderTableButton';
import {
  AssignmentTableRow,
  GenericTableDto,
  OrganizationRow
} from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto
} from '@/api/generated-types/generated-types_';

async function WorkProjectSeriesAssignmentsForSchedule({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const workProjectSeriesAssignmentTableDto: GenericTableDto<
    AssignmentTableRow,
    CycleSubspanDto,
    WorkProjectSeriesAssignmentDto,
    number
  > = await getWithoutBody(
    constructUrl(['/api/v2/workProjectSeries/assignments/schedule', scheduleId])
  );

  const strings: string[] = [
    ...Object.values(workProjectSeriesAssignmentTableDto.cellIdCellContentMap)
      .map(
        (assignment) => assignment.workProjectSeries.workProjectSeriesSchemaId
      )
      .reduce((prev, curr) => prev.add(curr), new Set<string>())
      .values()
  ];

  const organizationList = workProjectSeriesAssignmentTableDto.rowList
    .filter((row) => row.entityClass === 'Organization')
    .map((row) => row.data as OrganizationDto);

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8 pt-16'}>
      <EditAddDeleteDtoControllerArray
        dtoList={workProjectSeriesAssignmentTableDto.rowList}
        entityClass={AssignmentTableRowClassName}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={organizationList}
        entityClass={EntityClassMap.organization}
      />
      <DataFetchingEditDtoControllerArray
        idList={strings}
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />

      <AssignmentTable
        tableData={workProjectSeriesAssignmentTableDto}
        organizations={organizationList}
      />
    </div>
  );
}

export const WorkProjectSeriesAssignmentsPage = getPathVariableSplitComponent(
  SchedulingHome,
  WorkProjectSeriesAssignmentsForSchedule
);
