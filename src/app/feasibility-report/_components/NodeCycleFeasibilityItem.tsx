import { WorkSchemaNodeItem } from '@/app/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { useMemo } from 'react';
import { LazyDtoUiWrapper } from 'dto-stores';
import { WorkSchemaNodeLabel } from '@/app/feasibility-report/_components/WorkSchemaNodeLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import FeasibilityReportTreeItem from '@/app/feasibility-report/_components/FeasilbilityReportTreeItem';

export function NodeCycleFeasibilityItem({
  itemType,
  payload,
  children,
  ...props
}: WorkSchemaNodeItem & StyledTreeItemProps) {
  const payloadChildren = useMemo(() => {
    if (itemType === 'cycleFeasibility') {
      const { children: childrenPayload } = payload;
      return childrenPayload.map((child) => (
        <FeasibilityReportTreeItem
          key={`${child.id}`}
          itemType={'cycleFeasibility'}
          payload={child}
        />
      ));
    } else return [];
  }, [payload, itemType]);
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
      {...payloadChildren}
      {children}
    </CustomTreeItem>
  );
}
