import { WorkTaskSeriesDtoSchema } from './WorkTaskSeriesDtoSchema';
import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesDtoSchema = z.object({
  id: z.string().uuid(),
  scheduleId: z.number(),
  workTaskSeries: z.array(WorkTaskSeriesDtoSchema),
  workProjectSeriesSchemaId: z.number(),
  completedStatus: z.boolean(),
  workTaskType: WorkTaskTypeDtoSchema
});
