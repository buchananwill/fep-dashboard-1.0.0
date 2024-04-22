import { z } from 'zod';
export const CycleSubspanDtoSchema = z.object({
  id: z.number(),
  timeSpanDto: z.date(),
  parentCycleId: z.number(),
  description: z.string(),
  zeroIndexedCycleDay: z.number(),
});
export type CycleSubspanDto = z.infer<typeof CycleSubspanDtoSchema>;