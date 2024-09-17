import { LongIdStringNameTupleSchema } from './LongIdStringNameTupleSchema-Validation';
import { z } from 'zod';
export const NewProviderRoleDtoSchema = z.object({
  knowledgeDomain: LongIdStringNameTupleSchema,
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  partyId: z.number({ required_error: 'Transient id required' })
});
