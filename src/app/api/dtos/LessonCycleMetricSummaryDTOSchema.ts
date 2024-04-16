import { LessonCycleMetricDTOSchema } from './LessonCycleMetricDTOSchema';
import { z } from 'zod';
export const LessonCycleMetricSummaryDTOSchema = z.object({
  id: z.string(),
  lessonCycleMetrics: z.array(LessonCycleMetricDTOSchema),
  lessonCycleSummary: z.string(),
});
export type LessonCycleMetricSummaryDTO = z.infer<typeof LessonCycleMetricSummaryDTOSchema>;