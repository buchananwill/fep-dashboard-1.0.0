import { z } from 'zod';
export const StringLongTupleSchema = z.object({
  string: z.string(),
  aLong: z.number()
});
