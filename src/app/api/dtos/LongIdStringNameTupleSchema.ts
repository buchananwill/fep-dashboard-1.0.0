import { z } from 'zod';
export const LongIdStringNameTupleSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type LongIdStringNameTuple = z.infer<typeof LongIdStringNameTupleSchema>;