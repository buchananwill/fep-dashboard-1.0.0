import { z } from 'zod';
export const LessonAllocationInitSchema = z.object({
  totalPeriods: z.number(),
  doubleLessons: z.number(),
});
export type LessonAllocationInit = z.infer<typeof LessonAllocationInitSchema>;