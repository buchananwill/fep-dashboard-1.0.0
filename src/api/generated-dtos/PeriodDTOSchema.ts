import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
export const PeriodDTOSchema = z.object({
  id: z.number(),
  description: z.string(),
  startTime: zTimeOnly,
  endTime: zTimeOnly,
  dayOfWeek: z.string(),
  dayOfCycle: z.number(),
  cycleLengthInDays: z.number(),
  cycleId: z.string(),
});
export type PeriodDTO = z.infer<typeof PeriodDTOSchema>;