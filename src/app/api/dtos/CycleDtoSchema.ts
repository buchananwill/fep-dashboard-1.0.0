import { zDayOfWeek } from '../zod-mods';
import { z } from 'zod';
export const CycleDtoSchema = z.object({
  id: z.number(),
  cycleLengthInDays: z.number(),
  cycleDayZero: zDayOfWeek,
  cycleSubspanGroupSizes: z.number()
});
export type CycleDto = z.infer<typeof CycleDtoSchema>;
