import { HasNumberId } from '@/api/types';

import { PropsWithChildren } from 'react';
import { WorkSchemaNodeFeasibilityDto } from '@/api/old-zod-schemas/WorkSchemaNodeFeasibilityDtoSchema_';
import { NodeAssignmentFeasibilityDto } from '@/api/old-zod-schemas/NodeAssignmentFeasibilityDtoSchema';
import { TaskTypeFeasibilityDto } from '@/api/old-zod-schemas/TaskTypeFeasibilityDtoSchema_';
import { WorkSchemaNodeFeasibilitySummaryDto } from '@/api/old-zod-schemas/WorkSchemaNodeFeasibilitySummaryDtoSchema_';
import { NodeAssignmentFeasibilitySummaryDto } from '@/api/old-zod-schemas/NodeAssignmentFeasibilitySummaryDtoSchema_';
import { TaskTypeFeasibilitySummaryDto } from '@/api/old-zod-schemas/TaskTypeFeasibilitySummaryDtoSchema_';
import { BandwidthFeasibilityLayerDto } from '@/api/old-zod-schemas/BandwidthFeasibilityLayerDtoSchema';
import { FullReportDto } from '@/api/old-zod-schemas/FullReportDtoSchema_';

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
