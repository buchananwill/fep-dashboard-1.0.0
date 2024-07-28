import { TaskTypeClassificationDtoSchema } from './TaskTypeClassificationDtoSchema';
import { z } from 'zod';
export const TaskTypeFeasibilityDtoSchema = z.object({
  id: z.number(),
  feasibilityReportId: z.number(),
  rootTaskTypeClassification: TaskTypeClassificationDtoSchema,
  passes: z.boolean(),
  serialVersionUID: z.number()
});
export type TaskTypeFeasibilityDto = z.infer<
  typeof TaskTypeFeasibilityDtoSchema
>;
