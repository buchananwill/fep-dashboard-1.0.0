import { CycleSubspanGroupSnapshotDtoSchema } from '../generated-dtos/CycleSubspanGroupSnapshotDtoSchema';
import { z } from 'zod';
const baseNodeCycleFeasibilityDtoSchema = z.object({
  id: z.number(),
  workSchemaNodeId: z.number(),
  feasibilityReportId: z.number(),
  cycleSubspanRequirement: z.number(),
  cycleSubspanGroupSnapshotDtoList: z.array(CycleSubspanGroupSnapshotDtoSchema),
  residual: z.number(),
  passes: z.boolean()
});
export type NodeCycleFeasibilityDto = z.infer<
  typeof baseNodeCycleFeasibilityDtoSchema
> & {
  children: NodeCycleFeasibilityDto[];
};

export const NodeCycleFeasibilityDtoSchema: z.ZodType<NodeCycleFeasibilityDto> =
  baseNodeCycleFeasibilityDtoSchema.extend({
    children: z.lazy(() => NodeCycleFeasibilityDtoSchema.array())
  });
