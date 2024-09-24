import { z } from 'zod';
export const CycleSubspanJoinNestedDtoSchema = z.object({
  id: z.number(),
  cycleSubspanId: z.number(),
  cycleSubspanGroupSize: z.number(),
  cycleSubspanGroupId: z.number(),
  joinOrdinal: z.number(),
});
export type CycleSubspanJoinNestedDto = z.infer<typeof CycleSubspanJoinNestedDtoSchema>;