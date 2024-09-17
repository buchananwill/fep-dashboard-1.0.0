import { LongIdStringNameTupleSchema } from './LongIdStringNameTupleSchema';
import { z } from 'zod';
export const NewProviderRoleDtoSchema = z.object({
  knowledgeDomain: LongIdStringNameTupleSchema,
  firstName: z.string(),
  lastName: z.string(),
  partyId: z.number()
});
