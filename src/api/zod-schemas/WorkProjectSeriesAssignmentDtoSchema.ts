import { WorkProjectSeriesDtoSchema } from './WorkProjectSeriesDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesAssignmentDtoSchema = z.object({
  id: z.number(),
  sourceNodeId: z.number(),
  workProjectSeries: WorkProjectSeriesDtoSchema,
  organizationId: z.number(),
});
export type WorkProjectSeriesAssignmentDto = z.infer<typeof WorkProjectSeriesAssignmentDtoSchema>;