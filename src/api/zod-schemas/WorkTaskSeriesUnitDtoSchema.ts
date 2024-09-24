import { z } from 'zod';
export const WorkTaskSeriesUnitDtoSchema = z.object({
  id: z.number(),
  scheduleId: z.number(),
  cycleSubspanId: z.number(),
});
export type WorkTaskSeriesUnitDto = z.infer<typeof WorkTaskSeriesUnitDtoSchema>;