import { PropsWithChildren } from 'react';
import { getCommonTreeItemProps } from '@/app/feasibility-report/_components/getCommonTreeItemProps';
import { FeasibilityReportTreeItemProps } from '@/app/feasibility-report/_components/types';
import { NodeCycleFeasibilityItem } from '@/app/feasibility-report/_components/NodeCycleFeasibilityItem';
import BandwidthFeasibilityLayerTreeItem from '@/app/feasibility-report/_components/BandwidthFeasibilityLayerTreeItem';
import TaskTypeClassificationFeasibilityTreeItem from '@/app/feasibility-report/_components/TaskTypeClassificationFeasibilityTreeItem';

export default function FeasibilityReportTreeItem({
  children,
  ...props
}: FeasibilityReportTreeItemProps & PropsWithChildren) {
  const commonTreeItemProps = getCommonTreeItemProps(props);
  const { itemType } = props;
  switch (itemType) {
    case 'cycleFeasibility': {
      return <NodeCycleFeasibilityItem {...props} {...commonTreeItemProps} />;
    }
    case 'assignmentFeasibility': {
      return;
    }
    case 'taskTypeClassificationFeasibility': {
      return (
        <TaskTypeClassificationFeasibilityTreeItem
          {...props}
          {...commonTreeItemProps}
        >
          {props.payload.bandwidthFeasibilityLayers.map(
            (bandwidthFeasibilityLayer) => {
              const moreProps: FeasibilityReportTreeItemProps = {
                itemType: 'bandwidthFeasibilityLayer',
                payload: bandwidthFeasibilityLayer
              };
              const moreCommonProps = getCommonTreeItemProps(moreProps);
              return (
                <BandwidthFeasibilityLayerTreeItem
                  {...moreCommonProps}
                  {...moreProps}
                  key={moreCommonProps.itemId}
                ></BandwidthFeasibilityLayerTreeItem>
              );
            }
          )}
        </TaskTypeClassificationFeasibilityTreeItem>
      );
    }
    default:
      return null;
  }
}
