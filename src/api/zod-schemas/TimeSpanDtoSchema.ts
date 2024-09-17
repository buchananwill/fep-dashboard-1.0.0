import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
export const TimeSpanDtoSchema = z.object({
  startTimeDivisionInstant: zTimeOnly,
  endTimeDivisionInstant: zTimeOnly,
  id: z.number(),
  startTimeDivisionId: z.number(),
  endTimeDivisionId: z.number(),
  name: z.string()
});
