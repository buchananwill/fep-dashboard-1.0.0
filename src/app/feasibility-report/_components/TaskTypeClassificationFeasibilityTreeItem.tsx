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
  payload,
  children,
  itemType,
  ...props
}: TaskTypeItem & StyledTreeItemProps) {
  return (
    <CustomTreeItem
      {...props}
      forceIconColor={true}
      label={'Bandwidth feasibility layer'}
    >
      {children}
    </CustomTreeItem>
  );
}
