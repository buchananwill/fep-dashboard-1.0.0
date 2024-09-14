import { WorkSchemaNodeItem } from '@/components/feasibility-report/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/mui/CustomTreeItem';
import { LazyDtoUiWrapper } from 'dto-stores';
import { WorkSchemaNodeLabel } from '@/components/feasibility-report/WorkSchemaNodeLabel';
import { EntityClassMap } from '@/api/entity-class-map';

export function WorkSchemaNodeFeasibilityItem({
  payload,
  children,
  ...props
}: { payload: WorkSchemaNodeItem } & StyledTreeItemProps) {
  return (
    <CustomTreeItem
      {...props}
      forceIconColor={true}
      label={
        <LazyDtoUiWrapper
          renderAs={WorkSchemaNodeLabel}
          entityId={payload.workSchemaNodeId}
          entityClass={EntityClassMap.workSchemaNode}
          whileLoading={() => '...loading'}
        />
      }
      labelInfo={`${payload.cycleSubspanRequirement}`}
    >
      {children}
    </CustomTreeItem>
  );
}
