import { z } from 'zod';
export const WorkSeriesBundleAssignmentDtoSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  workSeriesSchemaBundleId: z.string().uuid(),
});
export type WorkSeriesBundleAssignmentDto = z.infer<typeof WorkSeriesBundleAssignmentDtoSchema>;