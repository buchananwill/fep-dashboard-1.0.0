import { WorkTaskSeriesUnitDtoSchema } from './WorkTaskSeriesUnitDtoSchema';
import { z } from 'zod';
export const WorkTaskSeriesDtoSchema = z.object({
  id: z.number(),
  workTaskTypeId: z.number(),
  cycleSubSpanGroupSize: z.number(),
  cycleSubspanGroupId: z.number(),
  workTaskSeriesUnits: z.array(WorkTaskSeriesUnitDtoSchema),
});
export type WorkTaskSeriesDto = z.infer<typeof WorkTaskSeriesDtoSchema>;