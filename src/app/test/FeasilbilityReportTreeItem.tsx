import { HasId } from '@/api/types';
import { NodeCycleFeasibilityDto } from '@/api/dtos/NodeCycleFeasibilityDtoSchema';
import { NodeAssignmentFeasibilityDto } from '@/api/dtos/NodeAssignmentFeasibilityDtoSchema';
import { CustomTreeItem, StyledTreeItemProps } from '@/app/test/CustomTreeItem';
import { PropsWithChildren, useMemo } from 'react';
import { getCommonTreeItemProps } from '@/app/test/GetCommonTreeItemProps';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export default function FeasibilityReportTreeItem({
  children,
  ...props
}: FeasibilityReportTreeItemProps & PropsWithChildren) {
  const commonTreeItemProps = getCommonTreeItemProps(props);
  const { itemType } = props;
  switch (itemType) {
    case 'cycleFeasibility': {
      return <NodeCycleFeasibilityItem {...props} {...commonTreeItemProps} />;
    }
    default:
      return null;
  }
}

function NodeCycleFeasibilityItem({
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

function WorkSchemaNodeLabel({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  if (entity.name) return entity.name;
  else if (entity.workProjectSeriesSchemaId)
    return (
      <LazyDtoUiWrapper
        renderAs={WorkProjectSeriesSchemaLabel}
        entityId={entity.workProjectSeriesSchemaId}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        whileLoading={() => '...loading'}
      />
    );
  else if (entity.carouselId) return 'Carousel';
  else if (entity.carouselGroupId) return 'Carousel Group';
  else return 'Open Node';
}

function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}

interface FeasibilityReportTreeItemBaseProps<T extends HasId> {
  itemType: string;
  payload: T;
}

type WorkSchemaNodeItem =
  FeasibilityReportTreeItemBaseProps<NodeCycleFeasibilityDto> & {
    itemType: 'cycleFeasibility';
  };
type AssignmentItem =
  FeasibilityReportTreeItemBaseProps<NodeAssignmentFeasibilityDto> & {
    itemType: 'assignmentFeasibility';
  };

export type FeasibilityReportTreeItemProps =
  | WorkSchemaNodeItem
  | AssignmentItem;
