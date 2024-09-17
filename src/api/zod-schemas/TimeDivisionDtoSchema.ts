import { zTimeOnly } from '../zod-mods';
import { z } from 'zod';
export const TimeDivisionDtoSchema = z.object({
  id: z.number(),
  instant: zTimeOnly
});
