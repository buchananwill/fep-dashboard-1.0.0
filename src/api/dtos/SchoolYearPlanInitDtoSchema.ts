import { z } from 'zod';
import { LessonAllocationInitSchema } from '@/api/dtos/LessonAllocationInitSchema';
export const SchoolYearPlanInitDtoSchema = z.object({
  yearLessonAllocationPlans: z.record(z.number(), LessonAllocationInitSchema),
  periodsInReferenceCycle: z.number(),
  targetCycleId: z.number()
});
export type SchoolYearPlanInitDto = z.infer<typeof SchoolYearPlanInitDtoSchema>;
