import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import AssignmentTable, {
  AssignmentTableRowClassName
} from '@/components/work-project-series-assignments/table-view/AssignmentTable';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkProjectSeriesAssignmentTableView from '@/components/work-project-series-assignments/table-view/WorkProjectSeriesAssignmentTableView';
import { AssignmentTableRow, GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectSeriesAssignmentDto
} from '@/api/generated-types/generated-types_';
import React from 'react';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

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
  const idSet = new Set<number>();
  const organizationList: OrganizationDto[] = [];

  workProjectSeriesAssignmentTableDto.rowList
    .filter((row) => row.entityClass === 'Organization')
    .map((row) => row.data as OrganizationDto)
    .forEach((orgDto) => {
      if (!idSet.has(orgDto.id)) {
        organizationList.push(orgDto);
        idSet.add(orgDto.id);
      }
    });

  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={'h-[90vh] w-[90vw]'}>
          <EditAddDeleteDtoControllerArray
            dtoList={workProjectSeriesAssignmentTableDto.rowList}
            entityClass={AssignmentTableRowClassName}
          />
          <EditAddDeleteDtoControllerArray
            dtoList={organizationList}
            entityClass={EntityClassMap.organization}
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
      </RootCard>
    </div>
  );
}

export const WorkProjectSeriesAssignmentsPage = getPathVariableSplitComponent(
  WorkProjectSeriesAssignmentTableView,
  WorkProjectSeriesAssignmentsForSchedule
);
