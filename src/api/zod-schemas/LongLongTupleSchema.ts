import { z } from 'zod';
export const LongLongTupleSchema = z.object({
  longOne: z.number(),
  longTwo: z.number()
});
