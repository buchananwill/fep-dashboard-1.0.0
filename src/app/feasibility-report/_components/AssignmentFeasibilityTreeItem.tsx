import { TaskTypeItem } from '@/app/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { NodeAssignmentFeasibilityDto } from '@/api/dtos/NodeAssignmentFeasibilityDtoSchema';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeAssignmentDto } from '@/api/dtos/WorkSchemaNodeAssignmentDtoSchema';
import { NamedEntityLabel } from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';

export function Loading() {
  return '...loading';
}

export default function AssignmentFeasibilityTreeItem({
  children,
  payload,
  ...props
}: { payload: NodeAssignmentFeasibilityDto } & StyledTreeItemProps) {
  return (
    <CustomTreeItem
      {...props}
      label={
        <LazyDtoUiWrapper
          entityId={payload.workSchemaNodeAssignmentId}
          entityClass={EntityClassMap.workSchemaNodeAssignment}
          renderAs={NodeAssignmentSummary}
          whileLoading={Loading}
        />
      }
      labelInfo={`${payload.cycleSubspanRequirement} | ${payload.residual}`}
    >
      {children}
    </CustomTreeItem>
  );
}

function NodeAssignmentSummary({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeAssignmentDto>) {
  return (
    <>
      <LazyDtoUiWrapper
        renderAs={NamedEntityLabel}
        entityId={entity.workSchemaNodeId}
        entityClass={EntityClassMap.workSchemaNode}
        whileLoading={Loading}
      />
      <span className={'mx-2 inline-block italic'}>assigned to</span>
      <LazyDtoUiWrapper
        renderAs={NamedEntityLabel}
        entityId={entity.organizationId}
        entityClass={EntityClassMap.organization}
        whileLoading={Loading}
      />
    </>
  );
}
