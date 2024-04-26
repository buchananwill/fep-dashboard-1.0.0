import { TimeSpanDtoSchema } from './TimeSpanDtoSchema';
import { z } from 'zod';
export const CycleSubspanDtoSchema = z.object({
  id: z.number(),
  timeSpanDto: TimeSpanDtoSchema,
  parentCycleId: z.number(),
  description: z.string(),
  zeroIndexedCycleDay: z.number(),
});
export type CycleSubspanDto = z.infer<typeof CycleSubspanDtoSchema>;