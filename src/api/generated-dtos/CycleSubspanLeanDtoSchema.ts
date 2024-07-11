import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
export const CycleSubspanLeanDtoSchema = z.object({
  id: z.number(),
  start: zTimeOnly,
  end: zTimeOnly,
  zeroIndexedCycleDay: z.number(),
  timeSpanId: z.number(),
  parentCycleId: z.number(),
  name: z.string(),
});
export type CycleSubspanLeanDto = z.infer<typeof CycleSubspanLeanDtoSchema>;