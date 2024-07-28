import { z } from 'zod';
export const TaskTypeFeasibilitySummaryDtoSchema = z.object({
  passes: z.boolean(),
  id: z.number()
});
export type TaskTypeFeasibilitySummaryDto = z.infer<
  typeof TaskTypeFeasibilitySummaryDtoSchema
>;
