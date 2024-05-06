import { TimeSpanDtoSchema } from './TimeSpanDtoSchema';
import { z } from 'zod';
export const CycleSubspanGroupEditDtoSchema = z.object({
  id: z.number(),
  timeSpanDto: TimeSpanDtoSchema,
  parentCycleId: z.number(),
  description: z.string(),
  zeroIndexedCycleDay: z.number(),
  sizesStartingAtCycleSubspanId: z.array(z.number()),
  maxGroupSize: z.number(),
});
export type CycleSubspanGroupEditDto = z.infer<typeof CycleSubspanGroupEditDtoSchema>;