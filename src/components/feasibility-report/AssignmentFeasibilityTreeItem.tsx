import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/mui/CustomTreeItem';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeAssignmentDto } from '@/api/generated-types/generated-types';
import { NamedEntityLabel } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { NodeAssignmentFeasibilityDto } from '@/api/zod-schemas/NodeAssignmentFeasibilityDtoSchema';

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

export function NodeAssignmentSummary({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeAssignmentDto>) {
  if (entity.workSchemaNodeId === undefined) return null;
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
