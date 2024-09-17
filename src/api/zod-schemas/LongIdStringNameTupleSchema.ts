import { z } from 'zod';
export const LongIdStringNameTupleSchema = z.object({
  id: z.number(),
  name: z.string()
});
