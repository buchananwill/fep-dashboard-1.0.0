import { zDayOfWeek } from '../zod-mods';
import { z } from 'zod';
export const CycleDtoSchema = z.object({
  id: z.number(),
  cycleLengthInDays: z.number(),
  cycleDayZero: zDayOfWeek,
});
export type CycleDto = z.infer<typeof CycleDtoSchema>;