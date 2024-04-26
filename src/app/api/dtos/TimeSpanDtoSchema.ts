import { z } from 'zod';
import { zTimeOnly } from '@/app/api/zod-mods';
export const TimeSpanDtoSchema = z.object({
  startTimeDivisionInstant: zTimeOnly,
  endTimeDivisionInstant: zTimeOnly,
  id: z.number(),
  startTimeDivisionId: z.number(),
  endTimeDivisionId: z.number(),
  name: z.string()
});
export type TimeSpanDto = z.infer<typeof TimeSpanDtoSchema>;
