import { getCommonTreeItemProps } from '@/functions/getCommonTreeItemProps';
import { FeasibilityReportTreeItemProps } from '@/components/feasibility-report/types';
import { WorkSchemaNodeFeasibilityItem } from '@/components/feasibility-report/WorkSchemaNodeFeasibilityItem';
import TaskTypeClassificationFeasibilityTreeItem from '@/components/feasibility-report/TaskTypeClassificationFeasibilityTreeItem';
import { CustomTreeItem } from '@/components/CustomTreeItem';
import { useMemo } from 'react';
import BandwidthFeasibilityLayerTreeItem from '@/components/feasibility-report/BandwidthFeasibilityLayerTreeItem';
import AssignmentFeasibilityTreeItem from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';

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
      case 'AssetFeasibilities':
      case 'PartyFeasibilities':
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
    case 'PartyFeasibilities':
    case 'AssetFeasibilities': {
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
