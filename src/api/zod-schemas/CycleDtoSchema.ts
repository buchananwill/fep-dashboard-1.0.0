import { zDayOfWeek } from '../zod-mods';
import { z } from 'zod';
export const CycleDtoSchema = z.object({
  id: z.number(),
  cycleLengthInDays: z.number(),
  maxGroupSize: z.number(),
  cycleSubspanGroupSizes: z.array(z.number()),
  cycleDayZero: zDayOfWeek,
  cycleLengthInWeeks: z.number(),
});
export type CycleDto = z.infer<typeof CycleDtoSchema>;