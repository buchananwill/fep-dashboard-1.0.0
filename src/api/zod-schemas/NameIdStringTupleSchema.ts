import { z } from 'zod';
export const NameIdStringTupleSchema = z.object({
  name: z.string(),
  id: z.string(),
});
export type NameIdStringTuple = z.infer<typeof NameIdStringTupleSchema>;