import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
export const TimeSpanDtoSchema = z.object({
  id: z.number(),
  startTimeDivisionId: z.number(),
  startTimeDivisionInstant: zTimeOnly,
  endTimeDivisionId: z.number(),
  endTimeDivisionInstant: zTimeOnly,
  name: z.string(),
});
export type TimeSpanDto = z.infer<typeof TimeSpanDtoSchema>;