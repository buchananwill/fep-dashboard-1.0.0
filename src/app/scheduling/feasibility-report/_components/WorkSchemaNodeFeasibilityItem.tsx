import { WorkSchemaNodeItem } from '@/app/scheduling/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { useMemo } from 'react';
import { LazyDtoUiWrapper } from 'dto-stores';
import { WorkSchemaNodeLabel } from '@/app/scheduling/feasibility-report/_components/WorkSchemaNodeLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import FeasibilityReportTreeItem from '@/app/scheduling/feasibility-report/_components/FeasilbilityReportTreeItem';

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
