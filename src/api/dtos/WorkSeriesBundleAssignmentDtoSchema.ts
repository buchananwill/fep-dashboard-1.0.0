import { z } from 'zod';
export const WorkSeriesBundleAssignmentDtoSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  workSeriesSchemaBundleId: z.string().uuid().optional()
});
export type WorkSeriesBundleAssignmentDto = z.infer<
  typeof WorkSeriesBundleAssignmentDtoSchema
>;
