import { zDayOfWeek } from '../zod-mods';
import { z } from 'zod';
export const CycleDtoSchema = z.object({
  id: z.number(),
  cycleLengthInDays: z.number(),
  cycleDayZero: zDayOfWeek,
  maxGroupSize: z.number(),
  cycleLengthInWeeks: z.number(),
});
export type CycleDto = z.infer<typeof CycleDtoSchema>;