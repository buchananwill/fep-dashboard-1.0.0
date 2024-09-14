import { WorkSchemaNodeFeasibilityDtoSchema } from './WorkSchemaNodeFeasibilityDtoSchema';
import { CycleSubspanGroupSnapshotDtoSchema } from './CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
export const WorkSchemaNodeFeasibilityDtoSchema = z.object({
  id: z.number(),
  workSchemaNodeId: z.number(),
  feasibilityReportId: z.number(),
  cycleSubspanRequirement: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  residual: z.number(),
  passes: z.boolean(),
  children: z.array(WorkSchemaNodeFeasibilityDtoSchema),
  serialVersionUID: z.number(),
});
export type WorkSchemaNodeFeasibilityDto = z.infer<typeof WorkSchemaNodeFeasibilityDtoSchema>;