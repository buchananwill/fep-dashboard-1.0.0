import { FeasibilityReportTreeItemPayload } from '@/components/feasibility-report/types';
import { TaskTypeClassificationSummary } from '@/components/feasibility-report/BandwidthFeasibilityLayerTreeItem';
import { NodeAssignmentSummary } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import { AccordionTreeItemProps } from '@/components/generic/accordionTree';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { LazyDtoUiWrapper } from 'dto-stores';
import { WorkSchemaNodeLabel } from '@/components/feasibility-report/WorkSchemaNodeLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { NamedEntityLabelWrapper } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { taskTypeClassification } from '@/components/feasibility-report/FeasibilityReport';
import { getBgColor, getColor } from '@/functions/getCommonTreeItemProps';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Loading } from '@/components/feasibility-report/Loading';

export type FeasibilityReportTreeItemProps = {
  payload: FeasibilityReportTreeItemPayload;
};

function getContentTitle(payload: FeasibilityReportTreeItemPayload) {
  const { itemType } = payload;

  const TitleIcon = payload.passes ? CheckCircleIcon : XCircleIcon;

  switch (itemType) {
    case 'feasibilityFullReport': {
      return {
        title: (
          <div className={'flex justify-between'}>
            <TitleIcon className={'h-6 w-6'} />
            Feasibility Report<div className={'w-1'}></div>
          </div>
        )
      };
    }
    case 'workSchemaNodeFeasibilitySummary':
    case 'assignmentFeasibilitySummary':
    case 'PartyFeasibilities':
    case 'AssetFeasibilities': {
      return {
        title: (
          <div className={'flex justify-between'}>
            <TitleIcon className={'h-6 w-6'} />
            <div>{startCase(getDomainAlias(payload.itemType))}</div>
            <div>allocation | residual</div>
          </div>
        )
      };
    }
    case 'workSchemaNodeFeasibility': {
      return {
        title: (
          <div className={'flex justify-between'}>
            <LazyDtoUiWrapper
              renderAs={WorkSchemaNodeLabel}
              entityId={payload.workSchemaNodeId}
              entityClass={EntityClassMap.workSchemaNode}
              whileLoading={() => '...loading'}
            />
            <div>{`${payload.cycleSubspanRequirement}`}</div>
          </div>
        )
      };
    }
    case 'assignmentFeasibility': {
      return {
        title: (
          <div className={'flex justify-between'}>
            <LazyDtoUiWrapper
              entityId={payload.workSchemaNodeAssignmentId}
              entityClass={EntityClassMap.workSchemaNodeAssignment}
              renderAs={NodeAssignmentSummary}
              whileLoading={Loading}
            />
            <div className={'grow'}></div>
            <div>
              {`${payload.cycleSubspanRequirement} | ${payload.residual}`}
            </div>
          </div>
        )
      };
    }
    case 'taskTypeFeasibility': {
      return {
        title: (
          <NamedEntityLabelWrapper
            entityId={payload.rootTaskTypeClassification.id}
            entityClass={taskTypeClassification}
          />
        )
      };
    }
    case 'bandwidthFeasibilityLayer': {
      return {
        title: (
          <div className={'flex justify-between'}>
            <div>Bandwidth feasibility layer</div>
            <div>Residual: {payload.residual}</div>
          </div>
        )
      };
    }
  }
}

function getContentMain(payload: FeasibilityReportTreeItemPayload) {
  if (payload.itemType === 'bandwidthFeasibilityLayer')
    return {
      contentMain: payload.bandwidthFeasibilityLayerItems.map((item) => (
        <LazyDtoUiWrapper
          key={`layerItem:${item.bandwidthFeasibilityLayerId}`}
          renderAs={TaskTypeClassificationSummary}
          entityId={item.taskTypeClassificationId}
          entityClass={'TaskTypeClassification'}
          whileLoading={() => '...loading'}
        />
      ))
    };
  else return undefined;
}

export default function TransformToTreeItemProps({
  payload
}: FeasibilityReportTreeItemProps): AccordionTreeItemProps {
  const { itemType, passes } = payload;

  let contentChildren = undefined;
  switch (itemType) {
    case 'feasibilityFullReport':
    case 'workSchemaNodeFeasibility':
    case 'assignmentFeasibilitySummary':
    case 'AssetFeasibilities':
    case 'PartyFeasibilities':
    case 'workSchemaNodeFeasibilitySummary':
    case 'taskTypeFeasibility': {
      const { children } = payload;
      contentChildren = children.map((childItem) => {
        return TransformToTreeItemProps({ payload: childItem });
      });
    }
  }

  let mainResponse: AccordionTreeItemProps = {
    contentChildren,
    style: { ...getColor(payload), ...getBgColor(payload) },
    classNames: { base: 'text-inherit', title: 'text-inherit bg-inherit' }
  };
  const contentTitle = getContentTitle(payload);
  return { ...mainResponse, ...contentTitle, ...getContentMain(payload) };
}
