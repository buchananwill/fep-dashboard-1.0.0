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
import { Api } from '@/api/clientApi_';
import { EntityClassMap } from '@/api/entity-class-map';
import { FullReport } from '@/app/scheduling/feasibility-report/_components/types';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/WorkProjectSeriesSchemaLevelTable';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

export default async function ViewFeasibilityReportPage({
  pathVariables
}: LeafComponentProps) {
  const [id] = getLastNVariables(pathVariables, 1);
  const feasibilityReportFullDto: FullReport = await getWithoutBody(
    constructUrl(`/api/v2/schedule/feasibilityReport/${id}/fullReport`)
  );

  if (feasibilityReportFullDto.reportStatus === 'PENDING') {
    return (
      <Card>
        <CardHeader>
          <LinkButton
            href={`/core/feasibility/view/${id}`}
            className={'flex gap-1'}
          >
            Pending <ClockIcon className={'h-6'} />
          </LinkButton>
        </CardHeader>
        <CardBody>
          This report is currently being generate and will be available shortly.
        </CardBody>
      </Card>
    );
  }

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
