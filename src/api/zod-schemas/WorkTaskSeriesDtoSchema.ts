import { WorkTaskSeriesUnitDtoSchema } from './WorkTaskSeriesUnitDtoSchema';
import { z } from 'zod';
export const WorkTaskSeriesDtoSchema = z.object({
  id: z.number(),
  workTaskTypeId: z.number(),
  cycleSubSpanGroupSize: z.number(),
  cycleSubSpanGroupId: z.string().uuid(),
  workTaskSeriesUnits: z.array(WorkTaskSeriesUnitDtoSchema)
});
