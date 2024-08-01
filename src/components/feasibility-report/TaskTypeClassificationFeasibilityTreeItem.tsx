import { TaskTypeItem } from '@/components/feasibility-report/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { NamedEntityLabelWrapper } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { taskTypeClassification } from '@/components/feasibility-report/FeasibilityReport';

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
