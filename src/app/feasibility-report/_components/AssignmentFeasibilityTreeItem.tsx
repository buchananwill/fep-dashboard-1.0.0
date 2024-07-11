import { TaskTypeItem } from '@/app/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { NodeAssignmentFeasibilityDto } from '@/api/generated-dtos/NodeAssignmentFeasibilityDtoSchema';

export default function AssignmentFeasibilityTreeItem({
  children,
  payload,
  ...props
}: { payload: NodeAssignmentFeasibilityDto } & StyledTreeItemProps) {
  return <CustomTreeItem {...props}>{children}</CustomTreeItem>;
}
