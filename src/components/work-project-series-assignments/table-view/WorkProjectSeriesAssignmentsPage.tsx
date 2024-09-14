import { Api } from '@/api/clientApi_';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import AssignmentTable, {
  AssignmentTableRowClassName
} from '@/components/work-project-series-assignments/table-view/AssignmentTable';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkProjectSeriesAssignmentTableView from '@/components/work-project-series-assignments/table-view/WorkProjectSeriesAssignmentTableView';
import { AssignmentTableRow, GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto
} from '@/api/generated-types/generated-types';
import React from 'react';

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

  const strings: number[] = [
    ...Object.values(workProjectSeriesAssignmentTableDto.cellIdCellContentMap)
      .map(
        (assignment) => assignment.workProjectSeries.workProjectSeriesSchemaId
      )
      .reduce((prev, curr) => prev.add(curr), new Set<number>())
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
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={workProjectSeriesAssignmentTableDto.columnList}
      />
      <AssignmentTable
        tableData={workProjectSeriesAssignmentTableDto}
        organizations={organizationList}
      />
    </div>
  );
}

export const WorkProjectSeriesAssignmentsPage = getPathVariableSplitComponent(
  WorkProjectSeriesAssignmentTableView,
  WorkProjectSeriesAssignmentsForSchedule
);
