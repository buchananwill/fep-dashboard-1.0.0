import { CycleSubspanGroupSnapshotDtoSchema } from './CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
export const NodeAssignmentFeasibilityDtoSchema = z.object({
  id: z.number(),
  cycleSubspanRequirement: z.number(),
  residual: z.number(),
  feasibilityReportId: z.number(),
  workSchemaNodeAssignmentId: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  passes: z.boolean(),
  serialVersionUID: z.number(),
});
export type NodeAssignmentFeasibilityDto = z.infer<typeof NodeAssignmentFeasibilityDtoSchema>;