import {
  BandwidthFeasibilityLayer,
  TaskTypeItem
} from '@/app/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import BandwidthFeasibilityLayerTreeItem from '@/app/feasibility-report/_components/BandwidthFeasibilityLayerTreeItem';

export default function TaskTypeClassificationFeasibilityTreeItem({
  children,
  payload,
  ...props
}: { payload: TaskTypeItem } & StyledTreeItemProps) {
  return <CustomTreeItem {...props}>{children}</CustomTreeItem>;
}
