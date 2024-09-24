import { z } from 'zod';
export const CycleSubspanJoinDtoSchema = z.object({
  id: z.number(),
  cycleSubspanGroupId: z.number(),
  cycleSubspanGroupSize: z.number(),
  joinOrdinal: z.number(),
  cycleSubspanId: z.number(),
  cycleSubspanDescription: z.string(),
});
export type CycleSubspanJoinDto = z.infer<typeof CycleSubspanJoinDtoSchema>;