import { z } from 'zod';
import { CycleSubspanGroupSnapshotDtoSchema } from '@/api/generated-dtos/CycleSubspanGroupSnapshotDtoSchema';

const BaseWorkSchemaNodeFeasibilityDtoSchema = z.object({
  serialVersionUID: z.number(),
  id: z.number(),
  workSchemaNodeId: z.number(),
  feasibilityReportId: z.number(),
  cycleSubspanRequirement: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  residual: z.number(),
  passes: z.boolean()
});

export type WorkSchemaNodeFeasibilityDto = z.infer<
  typeof BaseWorkSchemaNodeFeasibilityDtoSchema
>;
export const WorkSchemaNodeFeasibilityDtoSchema: z.ZodType<WorkSchemaNodeFeasibilityDto> =
  BaseWorkSchemaNodeFeasibilityDtoSchema.extend({
    children: z.lazy(() => WorkSchemaNodeFeasibilityDtoSchema.array())
  });
