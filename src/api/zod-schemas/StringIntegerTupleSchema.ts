import { z } from 'zod';
export const StringIntegerTupleSchema = z.object({
  name: z.string(),
  value: z.number()
});
