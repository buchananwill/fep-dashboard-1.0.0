import { MapSchema } from './MapSchema';
import { z } from 'zod';
export const SchoolYearPlanInitDtoSchema = z.object({
  yearLessonAllocationPlans: MapSchema,
  periodsInReferenceCycle: z.number(),
  targetCycleId: z.number(),
});
export type SchoolYearPlanInitDto = z.infer<typeof SchoolYearPlanInitDtoSchema>;