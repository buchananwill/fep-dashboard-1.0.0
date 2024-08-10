import { WorkTaskSeriesDtoSchema } from './WorkTaskSeriesDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesDtoSchema = z.object({
  id: z.string().uuid(),
  scheduleId: z.number(),
  workTaskSeries: z.array(WorkTaskSeriesDtoSchema),
  workProjectSeriesSchemaId: z.string().uuid(),
  completedStatus: z.boolean(),
});
export type WorkProjectSeriesDto = z.infer<typeof WorkProjectSeriesDtoSchema>;