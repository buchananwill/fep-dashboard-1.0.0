import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import FeasibilityReport, {
  taskTypeClassification
} from '@/components/feasibility-report/FeasibilityReport';

import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { Api } from '@/api/clientApi_';
import { EntityClassMap } from '@/api/entity-class-map';
import { FullReport } from '@/components/feasibility-report/types';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { LinkButton } from '@/components/navigation/LinkButton';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getLastNVariables } from '@/functions/getLastNVariables';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

export default async function ViewFeasibilityReportPage({
  pathVariables
}: LeafComponentProps) {
  const [id] = getLastNVariables(pathVariables, 1);
  const feasibilityReportFullDto: FullReport = await getWithoutBody(
    constructUrl(`/api/v2/schedule/feasibilityReport/${id}/fullReport`)
  );
  const layoutId = getRootCardLayoutId(pathVariables);

  if (feasibilityReportFullDto.reportStatus === 'PENDING') {
    return (
      <RootCard
        layoutId={layoutId}
        displayHeader={
          <LinkButton
            href={`/core/feasibility/view/${id}`}
            className={'flex gap-1'}
          >
            Pending <ClockIcon className={'h-6'} />
          </LinkButton>
        }
      >
        This report is currently being generate and will be available shortly.
      </RootCard>
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
        <RootCard layoutId={layoutId}>
          <FeasibilityReport report={feasibilityReportFullDto} />
        </RootCard>
      </div>
    </>
  );
}
