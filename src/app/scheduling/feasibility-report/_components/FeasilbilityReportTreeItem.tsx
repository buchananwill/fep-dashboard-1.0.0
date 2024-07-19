import { getCommonTreeItemProps } from '@/app/scheduling/feasibility-report/_components/getCommonTreeItemProps';
import { FeasibilityReportTreeItemProps } from '@/app/scheduling/feasibility-report/_components/types';
import { WorkSchemaNodeFeasibilityItem } from '@/app/scheduling/feasibility-report/_components/WorkSchemaNodeFeasibilityItem';
import TaskTypeClassificationFeasibilityTreeItem from '@/app/scheduling/feasibility-report/_components/TaskTypeClassificationFeasibilityTreeItem';
import { CustomTreeItem } from '@/components/CustomTreeItem';
import { useMemo } from 'react';
import BandwidthFeasibilityLayerTreeItem from '@/app/scheduling/feasibility-report/_components/BandwidthFeasibilityLayerTreeItem';
import AssignmentFeasibilityTreeItem from '@/app/scheduling/feasibility-report/_components/AssignmentFeasibilityTreeItem';

export default function FeasibilityReportTreeItem({
  children,
  payload
}: FeasibilityReportTreeItemProps) {
  const { itemType } = payload;

  const childrenPayload = useMemo(() => {
    switch (payload.itemType) {
      case 'feasibilityFullReport':
      case 'workSchemaNodeFeasibility':
      case 'assignmentFeasibilitySummary':
      case 'taskTypeFeasibilitySummary':
      case 'workSchemaNodeFeasibilitySummary':
      case 'taskTypeFeasibility': {
        return payload.children.map((childPayload) => (
          <FeasibilityReportTreeItem
            payload={childPayload}
            key={`${childPayload.itemType}:${childPayload.id}`}
          />
        ));
      }
      default:
        return [];
    }
  }, [payload]);

  const commonTreeItemProps = {
    ...getCommonTreeItemProps(payload),
    children: [children, ...childrenPayload]
  };

  switch (itemType) {
    case 'feasibilityFullReport': {
      return (
        <CustomTreeItem {...commonTreeItemProps} label={'Feasibility Report'} />
      );
    }
    case 'workSchemaNodeFeasibilitySummary':
    case 'assignmentFeasibilitySummary':
    case 'taskTypeFeasibilitySummary': {
      return (
        <CustomTreeItem
          {...commonTreeItemProps}
          label={`${payload.itemType}`}
          labelInfo={'allocation | residual'}
        />
      );
    }
    case 'workSchemaNodeFeasibility': {
      return (
        <WorkSchemaNodeFeasibilityItem
          payload={payload}
          {...commonTreeItemProps}
        />
      );
    }
    case 'assignmentFeasibility': {
      return (
        <AssignmentFeasibilityTreeItem
          payload={payload}
          {...commonTreeItemProps}
        />
      );
    }
    case 'taskTypeFeasibility': {
      return (
        <TaskTypeClassificationFeasibilityTreeItem
          {...commonTreeItemProps}
          payload={payload}
        />
      );
    }
    case 'bandwidthFeasibilityLayer': {
      return (
        <BandwidthFeasibilityLayerTreeItem
          {...commonTreeItemProps}
          payload={payload}
        />
      );
    }
    default:
      return null;
  }
}
