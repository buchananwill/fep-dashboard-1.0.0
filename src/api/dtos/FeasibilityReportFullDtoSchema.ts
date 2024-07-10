import { TaskTypeClassificationDtoSchema } from '../generated-dtos/TaskTypeClassificationDtoSchema';
import { NodeCycleFeasibilityDtoSchema } from '../generated-dtos/NodeCycleFeasibilityDtoSchema';
import { CycleSubspanGroupSnapshotDtoSchema } from '../generated-dtos/CycleSubspanGroupSnapshotDtoSchema';
import { TaskTypeClassificationFeasibilityDtoSchema } from './TaskTypeClassificationFeasibilityDtoSchema';
import { NodeAssignmentFeasibilityDtoSchema } from './NodeAssignmentFeasibilityDtoSchema';
import { z } from 'zod';
export const FeasibilityReportFullDtoSchema = z.object({
  creationTime: z.date(),
  id: z.number(),
  nodeAssignmentFeasibilities: z.array(NodeAssignmentFeasibilityDtoSchema),
  nodeCycleFeasibilities: z.array(NodeCycleFeasibilityDtoSchema),
  cycleId: z.number(),
  cycleSubspanCountSnapshot: z.number(),
  taskTypeClassificationFeasibilities: z.array(
    TaskTypeClassificationFeasibilityDtoSchema
  ),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  taskTypeClassifications: z.array(TaskTypeClassificationDtoSchema),
  passes: z.boolean()
});
export type FeasibilityReportFullDto = z.infer<
  typeof FeasibilityReportFullDtoSchema
>;
