import { z } from 'zod';
export const LongIdStringNameTupleSchema = z.object({
  id: z.number({ required_error: 'Id required for tuple.' }),
  name: z.string()
});
export type LongIdStringNameTuple = z.infer<typeof LongIdStringNameTupleSchema>;
