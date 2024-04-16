import { z } from 'zod';
export const LongLongTupleSchema = z.object({
  longOne: z.number(),
  longTwo: z.number(),
});
export type LongLongTuple = z.infer<typeof LongLongTupleSchema>;