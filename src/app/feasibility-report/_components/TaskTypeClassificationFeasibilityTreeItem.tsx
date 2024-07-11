import {
  BandwidthFeasibilityLayer,
  TaskTypeItem
} from '@/app/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import BandwidthFeasibilityLayerTreeItem from '@/app/feasibility-report/_components/BandwidthFeasibilityLayerTreeItem';
import { NamedEntityLabelWrapper } from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { taskTypeClassification } from '@/app/feasibility-report/_components/FeasibilityReport';

export default function TaskTypeClassificationFeasibilityTreeItem({
  children,
  payload,
  ...props
}: { payload: TaskTypeItem } & StyledTreeItemProps) {
  return (
    <CustomTreeItem
      {...props}
      label={
        <NamedEntityLabelWrapper
          entityId={payload.rootTaskTypeClassification.id}
          entityClass={taskTypeClassification}
        />
      }
    >
      {children}
    </CustomTreeItem>
  );
}
