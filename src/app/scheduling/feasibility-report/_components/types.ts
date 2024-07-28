import { HasNumberId } from '@/api/types';
import { NodeAssignmentFeasibilityDto } from '@/api/dtos/NodeAssignmentFeasibilityDtoSchema';
import { TaskTypeFeasibilityDto } from '@/api/dtos/TaskTypeFeasibilityDtoSchema_';
import { BandwidthFeasibilityLayerDto } from '@/api/dtos/BandwidthFeasibilityLayerDtoSchema';
import { FullReportDto } from '@/api/dtos/FullReportDtoSchema_';
import { PropsWithChildren } from 'react';
import { WorkSchemaNodeFeasibilityDto } from '@/api/dtos/WorkSchemaNodeFeasibilityDtoSchema_';
import { WorkSchemaNodeFeasibilitySummaryDto } from '@/api/dtos/WorkSchemaNodeFeasibilitySummaryDtoSchema_';
import { NodeAssignmentFeasibilitySummaryDto } from '@/api/dtos/NodeAssignmentFeasibilitySummaryDtoSchema_';
import { TaskTypeFeasibilitySummaryDto } from '@/api/dtos/TaskTypeFeasibilitySummaryDtoSchema_';

type FeasibilityReportTreeItemBase = HasNumberId & {
  // itemType: string;
  passes: boolean;
};

type NestedItem<T> = {
  children: T[];
};

export type WorkSchemaNodeItem = WorkSchemaNodeFeasibilityDto & {
  itemType: 'workSchemaNodeFeasibility';
  children: WorkSchemaNodeItem[];
};
export type AssignmentItem = NodeAssignmentFeasibilityDto & {
  itemType: 'assignmentFeasibility';
};

export type TaskTypeItem = TaskTypeFeasibilityDto &
  NestedItem<BandwidthFeasibilityLayer> & {
    itemType: 'taskTypeFeasibility';
  };
export type WorkSchemaNodeSummary = NestedItem<WorkSchemaNodeItem> &
  WorkSchemaNodeFeasibilitySummaryDto & {
    itemType: 'workSchemaNodeFeasibilitySummary';
  };
export type AssignmentSummary = NestedItem<AssignmentItem> &
  NodeAssignmentFeasibilitySummaryDto & {
    itemType: 'assignmentFeasibilitySummary';
  };

export type AssetTaskTypeSummary = NestedItem<TaskTypeItem> &
  TaskTypeFeasibilitySummaryDto & {
    itemType: 'AssetFeasibilities';
  };
export type PartyTaskTypeSummary = NestedItem<TaskTypeItem> &
  TaskTypeFeasibilitySummaryDto & {
    itemType: 'PartyFeasibilities';
  };

export type BandwidthFeasibilityLayer = BandwidthFeasibilityLayerDto & {
  itemType: 'bandwidthFeasibilityLayer';
};

export type FullReport = FullReportDto &
  NestedItem<
    | WorkSchemaNodeSummary
    | AssignmentSummary
    | AssetTaskTypeSummary
    | PartyTaskTypeSummary
  > & {
    itemType: 'feasibilityFullReport';
  };

export const NestedItemTypes = [
  'taskTypeFeasibilitySummary',
  'assignmentFeasibilitySummary',
  'taskTypeFeasibilitySummary',
  'feasibilityFullReport',
  'workSchemaNodeFeasibility',
  'workSchemaNodeFeasibilitySummary'
];

export type FeasibilityReportTreeItemPayload =
  | FullReport
  | WorkSchemaNodeItem
  | AssignmentItem
  | TaskTypeItem
  | BandwidthFeasibilityLayer
  | WorkSchemaNodeSummary
  | AssignmentSummary
  | AssetTaskTypeSummary
  | PartyTaskTypeSummary;

export type FeasibilityReportTreeItemProps = {
  payload: FeasibilityReportTreeItemPayload;
} & PropsWithChildren;
