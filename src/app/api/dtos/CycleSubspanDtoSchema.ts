import { z } from 'zod';
export const CycleSubspanDtoSchema = z.object({
  id: z.number(),
  timeSpan: z.date(),
  parentCycleId: z.number(),
  description: z.string(),
  zeroIndexedCycleDay: z.number(),
});
export type CycleSubspanDto = z.infer<typeof CycleSubspanDtoSchema>;