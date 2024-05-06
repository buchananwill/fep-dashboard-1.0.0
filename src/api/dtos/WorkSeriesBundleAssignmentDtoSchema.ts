import { WorkSeriesSchemaBundleDtoSchema } from './WorkSeriesSchemaBundleDtoSchema';
import { z } from 'zod';
export const WorkSeriesBundleAssignmentDtoSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  workSeriesSchemaBundle: WorkSeriesSchemaBundleDtoSchema,
});
export type WorkSeriesBundleAssignmentDto = z.infer<typeof WorkSeriesBundleAssignmentDtoSchema>;