import { z } from 'zod';
export const CycleSubspanJoinDtoSchema = z.object({
  id: z.number(),
  cycleSubspanGroupId: z.string().uuid(),
  cycleSubspanGroupSize: z.number(),
  joinOrdinal: z.number(),
  cycleSubspanId: z.number(),
  cycleSubspanDescription: z.string()
});
