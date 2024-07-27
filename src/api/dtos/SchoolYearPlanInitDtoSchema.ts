import { LessonAllocationInitSchema } from './LessonAllocationInitSchema';
import { z } from 'zod';
export const SchoolYearPlanInitDtoSchema = z.object({
  yearLessonAllocationPlans: z.record(z.string(), LessonAllocationInitSchema),
  periodsInReferenceCycle: z.number(),
  targetCycleId: z.number(),
});
export type SchoolYearPlanInitDto = z.infer<typeof SchoolYearPlanInitDtoSchema>;