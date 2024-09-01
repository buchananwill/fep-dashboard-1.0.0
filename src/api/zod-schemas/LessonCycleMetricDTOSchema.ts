import { z } from 'zod';
export const LessonCycleMetricDTOSchema = z.object({
  id: z.number(),
  lessonCycleId: z.string(),
  periodIdList: z.array(z.number()),
  infinityCostCount: z.number(),
  finiteCostCount: z.number(),
});
export type LessonCycleMetricDTO = z.infer<typeof LessonCycleMetricDTOSchema>;