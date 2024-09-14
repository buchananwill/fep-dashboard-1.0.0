import { TaskTypeFeasibilityDtoSchema } from './TaskTypeFeasibilityDtoSchema';
import { z } from 'zod';
export const TaskTypeFeasibilitySummaryDtoSchema = z.object({
  passes: z.boolean(),
  children: z.array(TaskTypeFeasibilityDtoSchema),
  itemType: z.string(),
  serialVersionUID: z.number(),
});
export type TaskTypeFeasibilitySummaryDto = z.infer<typeof TaskTypeFeasibilitySummaryDtoSchema>;