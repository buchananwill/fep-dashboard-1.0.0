import { TimeSpanDtoSchema } from './TimeSpanDtoSchema';
import { z } from 'zod';
export const CycleSubspanDtoSchema = z.object({
  id: z.number(),
  timeSpanDto: TimeSpanDtoSchema,
  parentCycleId: z.number(),
  name: z.string(),
  zeroIndexedCycleDay: z.number(),
  dayOrdinal: z.number(),
});
export type CycleSubspanDto = z.infer<typeof CycleSubspanDtoSchema>;