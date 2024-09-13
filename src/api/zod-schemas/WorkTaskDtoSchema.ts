import { WorkTaskTypeDtoSchema } from './WorkTaskTypeDtoSchema';
import { z } from 'zod';
export const WorkTaskDtoSchema = z.object({
  id: z.number(),
  dueDate: z.date(),
  serviceProductSeriesSchemaId: z.number(),
  workProjectSeriesSchemaName: z.string(),
  workTaskTypeDto: WorkTaskTypeDtoSchema,
  taskLength: z.number(),
  completedDate: z.date(),
  notes: z.string(),
});
export type WorkTaskDto = z.infer<typeof WorkTaskDtoSchema>;