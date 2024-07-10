import { HasId } from '@/api/types';
import { NodeAssignmentFeasibilityDto } from '@/api/dtos/NodeAssignmentFeasibilityDtoSchema';
import { NodeCycleFeasibilityDto } from '@/api/dtos/NodeCycleFeasibilityDtoSchema';
import { TaskTypeClassificationFeasibilityDto } from '@/api/dtos/TaskTypeClassificationFeasibilityDtoSchema';
import { TaskTypeClassificationDto } from '@/api/dtos/TaskTypeClassificationDtoSchema';
import { BandwidthFeasibilityLayerDto } from '@/api/dtos/BandwidthFeasibilityLayerDtoSchema';
import { BandwidthFeasibilityLayerItemDto } from '@/api/dtos/BandwidthFeasibilityLayerItemDtoSchema';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';

interface FeasibilityReportTreeItemBaseProps<T extends HasId> {
  itemType: string;
  payload: T;
}

export type WorkSchemaNodeItem =
  FeasibilityReportTreeItemBaseProps<NodeCycleFeasibilityDto> & {
    itemType: 'cycleFeasibility';
  };
export type AssignmentItem =
  FeasibilityReportTreeItemBaseProps<NodeAssignmentFeasibilityDto> & {
    itemType: 'assignmentFeasibility';
  };

export type TaskTypeItem =
  FeasibilityReportTreeItemBaseProps<TaskTypeClassificationFeasibilityDto> & {
    itemType: 'taskTypeClassificationFeasibility';
  };

type TaskTypeClassification =
  FeasibilityReportTreeItemBaseProps<TaskTypeClassificationDto> & {
    itemType: 'taskTypeClassification';
  };
export type BandwidthFeasibilityLayer =
  FeasibilityReportTreeItemBaseProps<BandwidthFeasibilityLayerDto> & {
    itemType: 'bandwidthFeasibilityLayer';
  };

export type BandwidthLayerItem =
  FeasibilityReportTreeItemBaseProps<BandwidthFeasibilityLayerItemDto> & {
    itemType: 'bandwidthFeasibilityLayerItem';
  };
export type FullReport =
  FeasibilityReportTreeItemBaseProps<FeasibilityReportFullDto> & {
    itemType: 'feasibilityFullReport';
  };

export type FeasibilityReportTreeItemProps =
  | FullReport
  | WorkSchemaNodeItem
  | AssignmentItem
  | TaskTypeItem
  // | TaskTypeClassification
  | BandwidthFeasibilityLayer;
// | BandwidthLayerItem;
